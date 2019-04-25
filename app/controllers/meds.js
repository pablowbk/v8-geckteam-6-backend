import Meds from '../models/meds.js';

export const addit = function (request, response, next) {
	console.log('request :', request);
	response.send('Oh yea babe');
	// Meds.create({
	// })
};