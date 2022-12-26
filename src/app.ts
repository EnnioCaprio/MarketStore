import express from 'express';
import users from './router/users/users';

const app = express();

app.use(express.json())
   .use('/users', users)

export default app;