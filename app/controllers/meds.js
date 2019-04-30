import Meds from '../models/meds.js';

export const addit = (req, res, next) => {
	console.log('request :', req.body);
	Meds.create({
	...req.body,
		owner: req.body._id
	}, (err, med) => {
		if (err) {
			console.log('Error creating the MED: ', err);
			res.status(400).send(next);
		} else {
			return res.status(201).send(med);
		}
	});
};

export const list = async (req, res, next) => (
	await Meds.list(req, res, (err, listu) => {
		if (err) {
			console.log('Error bringing the List: ', err);
			res.status(400).send(next);
	} else {
		return res.status(200).send(listu);
	}
	}).catch(next)
);
// export const show = (req, res, next) => res.send(req.med);

export const destroyMed = (req, res, next) =>
	req.med.remove()
		.then(() => res.send('Done Destroying the Med'))
		.catch(next);
