import { Request, Response, NextFunction } from 'express'
import response from '../utils/response'
import AWS from 'aws-sdk'
import fs from 'fs'

const S3Upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    try {
      const s3 = new AWS.S3({ accessKeyId: '', secretAccessKey: '' })
      const fileContent = fs.readFileSync(req.body.file)
      const param = {
        Bucket: 'bucket_name',
        Key: 'image',
        Body: fileContent
      }
      s3.upload(param, async (err: any, data: any) => {
        if (err) { throw err }
        console.log(`File uploaded successfully. ${data.Location}`)
      })
    } catch (err) {
      response(res, err)
    }
  } catch (e) {
    next(e)
  }
}

export { S3Upload }
