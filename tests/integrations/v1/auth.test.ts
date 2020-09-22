import request from "supertest";
import randomString from "random-string";
import jwt from "jsonwebtoken";
import models from "../../../models";
import UserRepo from "../../../repositories/user.repository";

require("dotenv").config();

const app = require("../../../app");
let userRepo;

// eslint-disable-next-line no-undef
beforeAll(() => {
  userRepo = new UserRepo();
});

// eslint-disable-next-line no-undef
afterAll(() => models.sequelize.close());

// eslint-disable-next-line no-undef
describe("로그인 테스트", () => {
  let userData;
  let token;

  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    userData = {
      email: randomString() + "@test.com",
      password: randomString(),
    };

    // 테스트용 사용자 생성
    await userRepo.store(userData);
  });

  // eslint-disable-next-line no-undef
  test("실제 로그인 테스트. | 200", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
    // eslint-disable-next-line no-undef
    expect(response.body.data.token).toBeTruthy();

    const payload = jwt.verify(
      response.body.data.token,
      process.env.JWT_SECRET
    );
    // eslint-disable-next-line no-undef
    expect(userData.email).toBe(payload.email);

    const user = await userRepo.find(payload.uuid);
    // eslint-disable-next-line no-undef
    expect(userData.email).toBe(user.email);

    token = response.body.data.token;
  });

  // eslint-disable-next-line no-undef
  test("없는 사용자로 로그인. | 404", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      email: "notFound@email.com",
      password: "somePassword",
    });

    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(404);
    // eslint-disable-next-line no-undef
    expect(response.body.data.message).toBe("사용자를 찾을 수 없습니다.");
  });

  // eslint-disable-next-line no-undef
  test("잘못된 비밀번호로 로그인. | 404", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      email: userData.email,
      password: "wrongPassword",
    });

    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(422);
    // eslint-disable-next-line no-undef
    expect(response.body.data.message).toBe("비밀번호를 확인 해주세요.");
  });

  // eslint-disable-next-line no-undef
  test("token 으로 사용자 조회. | 200", async () => {
    const response = await request(app)
      .get("/v1/auth/tokenTest")
      .set("Authorization", `Bearer ${token}`);

    // eslint-disable-next-line no-undef
    expect(response.body.data.email).toBe(userData.email);
  });
});
