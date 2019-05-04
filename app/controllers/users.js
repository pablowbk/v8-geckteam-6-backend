import User from '../models/user';
import APIError from '../helpers/APIError';

export const register = function (req, res, next) {
	const { email, name, password, confirmPassword, terms } = req.body;
	console.log('request from controller: ', req.body);
  if (!name || !email || !password || !terms) {
    return res.status(400).json('invalid data submitted');	
  }
  User.create({
				name,
				email,
				password,
				confirmPassword,
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
export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next);

export const load = (req, res, next) =>
	User.get(req.params.uid)
					.then(user => {
						if (!user) {
							throw new APIError('User does not exist', 404);
						}
      req.user.name = user;
      res.send(user);		
      console.log('user loaded: ', user);
					})
					.catch(next);
 
export const exist = (req, res) =>
	res.sendStatus(req.user ? 200 : 404);

export const show = (req, res) =>
res.send(req.user);
