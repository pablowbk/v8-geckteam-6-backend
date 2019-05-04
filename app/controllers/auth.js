import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import APIError from '../helpers/APIError';
import config from '../config';

export const login = (req, res, next) =>
		User.get(req.body.email)
					.then(user => {
						if (!user) {
							throw new APIError('Login Failed', 400);
						}
						return user.comparePassword(req.body.password)
																	.then(match => {
																		if (!match) {
																			throw new APIError('Login Failed', 400);
																		}
																		const token = jwt.sign({
																			email: user.email
																		}, config.jwt.secret, {
																			issuer: config.jwt.issuer,
																			expiresIn: config.jwt.expiresIn,
																			subject: user.id
																		});
																		const id = user.id;
																		console.log('user id', id);
																	return	res.status(201).send({ token, id });
																	})
																	.catch(next);
					})
					.catch(next);
