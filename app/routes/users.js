import { Router } from 'express';

import * as user from '../controllers/users';

const router = Router();

router
	.route('/users')
	.post(user.register)
	.get(user.list);

router
	.param('userId', user.load);

router
	.route('/:userId')
		.head(user.exist)
		.get(user.show);

		export default router;
		