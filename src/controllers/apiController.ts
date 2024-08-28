import { Request, Response } from 'express';

const getTeste = (req: Request, res: Response) => {
  res.json({ message: 'Exemplo route' });
};

export default { getTeste };
