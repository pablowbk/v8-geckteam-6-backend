import User from '../models/user';
import APIError from '../helpers/APIError';

export const register = function (req, res, next) {
	const { email, name, password, terms } = req.body;
	console.log('request from controller: ', req.body);
  if (!name || !email || !password || !terms) {
    return res.status(400).json('invalid data submitted');	
  }
  User.create({
				name,
				email,
				password,
				terms
			}, (err, user) => {
		if (err) {
			console.log('Error creating an User: ', err);
			res.status(400).send(err);
		} else {
			return res.status(201).send(user);
		}
	});
 };
	// User.create({
	// 	name: req.body.name,
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	terms: req.body.terms
	// }, (err, user) => {
	// 	if (err) {
	// 		console.log('Error creating an User: ', err);
	// 		res.status(400);
	// 	} else {
	// 		res.status(201);
	// 	}
	// });

export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next);

export const load = (req, res, next, id) =>
	User.get(id)
					.then(user => {
						if (!user) {
							throw new APIError('User does not exist', 404);
						}
						req.user = user;
						next();
					})
					.catch(next);
 
export const exist = (req, res) =>
	res.sendStatus(req.user ? 200 : 404);

export const show = (req, res) =>
res.send(req.user);
