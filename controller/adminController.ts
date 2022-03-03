import { Request, Response } from 'express'

export const getAdmin = async (req: Request, res: Response) => {
  const config = {
    page: 'admin',
    keywords: 'keywords',
    descriptions: '',
    title: 'Admin'
  }
  return res.render('index', { _config: config })
}