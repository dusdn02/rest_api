import uuid4 from 'uuid4'

const uuid = () => {
  const tokens = uuid4().split('-')
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
}

<<<<<<< HEAD
export {
  uuid
}
=======
export { uuid }
>>>>>>> 46b4a754e74cbe95dea570a4a6fe187e269439f7
