const index = (_req: any, res: any, _next: any) =>
  res.json({
    message: 'Hello Aha!'
  })

export { index }
