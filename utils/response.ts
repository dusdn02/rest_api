const httpStatus = require('http-status')

export default (res: any, data :any[], code = httpStatus.OK) => {
  let result = {
    success: true
  }
  if (code > 399) {
    result.success = false
  }
  if (data) {
    result = Object.assign(
      result,
      {
        data
      }
    )
  }

  return res.status(code).json(result)
}
