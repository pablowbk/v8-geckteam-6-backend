import { Router } from 'express';

import usersRouter from './users';

const router = Router();


// const route = require('./route');
// const search = require('./search');
// 
// module.exports = (app, db) => {
// 	route(app, db);
// 	search(app, db);
// };

// import authRouter from './auth'


// router.use('/auth', authRouter)
router.use('/users', usersRouter);

export default router;
