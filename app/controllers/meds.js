import Meds from '../models/meds.js';

export const addit = function (req, res, next) {
	const { manufacturer, comercialName, name, dosage, units, expiration, owner } = req.body;
	console.log('request :', req.body);
	Meds.create({
		manufacturer,
		comercialName,
		name,
		dosage,
		units,
		expiration,
		owner
	}, (err, med) => {
		if (err) {
			console.log('Error creating an User: ', err);
			res.status(400).send(next);
		} else {
			return res.status(201).send(med);
		}
	});
};

export const list = (req, res, next) => 
	Meds.list()
		.then(meds => res.send(meds))
		.catch(next);

// export const show = (req, res, next) => res.send(req.med);

export const destroyMed = (req, res, next) =>
	req.med.remove()
		.then(() => res.send('Done Destroying the Med'))
		.catch(next);
