import User from '../models/user';

export const register = (req, res, next) =>
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		terms: req.body.terms
	}, (err, user) => {
		if (err) {
			console.log('Error creating an User: ', err);
			res.status(400);
		} else {
			res.status(201).send(user);
		}
	});

export const list = (req, res, next) =>
  User.list()
    .then(users => res.send(users))
    .catch(next);

// export const load = (req, res, next, id) =>
// 	User.get(id)
// 					.then(user => {
// 						if (!user) {
// 							throw new APIError('User does not exist', 404);
// 						}
// 						req.user = user;
// 						next();
// 					})
// 					.catch(next);
 
export const exist = (req, res) =>
	res.sendStatus(req.user ? 200 : 404);

export const show = (req, res) =>
res.send(req.user);
