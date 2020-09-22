import request from 'supertest'
import randomString from 'random-string'
import models from '../../../models'
import UserRepo from '../../../repositories/user.repository'
import { uuid } from '../../../utils/uuid'

const app = require('../../../app')

let userRepo
let user

// eslint-disable-next-line no-undef
beforeAll(async () => {
  userRepo = new UserRepo()
  // 사용자 2명 생성
  await userRepo.store({
    email: randomString() + '@test.com',
    password: randomString()
  })

  user = await userRepo.store({
    email: randomString() + '@test.com',
    password: randomString()
  })
})

// eslint-disable-next-line no-undef
afterAll(() => models.sequelize.close())

// eslint-disable-next-line no-undef
describe('GET: /v1/users', () => {
  // eslint-disable-next-line no-undef
  test('전체 사용자 조회. | 200', async () => {
    const response = await request(app).get('/v1/users')

    // eslint-disable-next-line no-undef
    expect(response.body.length).toBeGreaterThan(1)
  })

  // eslint-disable-next-line no-undef
  test('uuid 로 사용자 조회. | 200', async () => {
    const response = await request(app).get(`/v1/users/${user.uuid}`)

    // eslint-disable-next-line no-undef
    expect(response.body.email).toBe(user.email)
  })

  // eslint-disable-next-line no-undef
  test('잘못된 uuid 로 사용자 조회. | 404', async () => {
    const response = await request(app).get(`/v1/users/${uuid()}`)

    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(404)
  })
})
