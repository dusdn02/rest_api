import randomString from 'random-string'
<<<<<<< HEAD
import {
  uuid
} from '../../utils/uuid'
import {
  models
} from '../../models'

afterAll(() => models.sequelize.close())


=======
import { uuid } from '../../utils/uuid'
import models from '../../models'

// eslint-disable-next-line no-undef
afterAll(() => {
  models.sequelize.close()
})

// eslint-disable-next-line no-undef
test('ordered UUID 가 출력되어야 합니다.', () => {
  const orderedUuid = uuid()

  // eslint-disable-next-line no-undef
  expect(orderedUuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

// eslint-disable-next-line no-undef
test('사용자를 생성하면 uuid 가 정상 생성되어야 합니다', async () => {
  const user = await models.User.create({
    email: `${randomString()}@test.com`,
    password: randomString()
  })

  // eslint-disable-next-line no-undef
  expect(user.uuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})
>>>>>>> 46b4a754e74cbe95dea570a4a6fe187e269439f7
