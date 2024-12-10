import clientPromise from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Funko } from '../../types/funko';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newFunko: Funko = req.body;
    try {
      await (await clientPromise).db('funko-showcase').collection('funkos').insertOne(newFunko);
      res.status(201).send(newFunko);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
