import express, { Request, Response, NextFunction } from 'express';
import conn from '../../customConn/connect'
import select from 'dotenv';
select.config()

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const trx = await conn.query()?.transaction();
    
    try{
        const users = await trx?.select('*').from('users');

        res.status(200).json({
            message: 'done',
            users
        })

        await trx?.commit()
    }catch(err){
        await trx?.rollback();
        throw err;
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const trx = await conn.query()?.transaction();
    const { name, surname } = req.body;

    try{
        const user = await trx?.insert({
            name, surname
        })
        .into('users')
        .returning('*');

        res
        .status(200)
        .json({
            message: 'user created',
            user
        });

        await trx?.commit();
    }catch(err){
        await trx?.rollback();
        throw err;
    }
})

export default router;