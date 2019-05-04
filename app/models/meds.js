import mongoose, { Schema } from 'mongoose';


const MedSchema = new Schema({
	manufacturer: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[a-zA-Z0-9]+$/,
		minlength: 3,
		maxLength: 24,
	},
	comercialName: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[a-zA-Z0-9]+$/,
		minlength: 3,
		maxLength: 24,
	},
	name: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[a-zA-Z0-9]+$/,
		minlength: 5,
		maxLength: 15,
	},
	dosage: {
		type: Number,
		required: true,
		match: /^[mg0-9]+$/,
		minlength: 0,
		maxLength: 2,
	},
	units: {
		type: Number,
		required: true,
		match: /^[0-9]+$/,
	},
	expiration: {
		type: Date,
		default: Date.now,
		match: /^[a-zA-Z0-9]+$/,
	},
	image: {
		type: String,
		required: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	});

MedSchema.pre('save', (next) => {
	console.log('Inputing New Med');
	return next();
});
MedSchema.post('save', function (next) {
	console.log('Med Saved');
	const med = this;
	console.log('Med:', med.name);
	return next;
});

MedSchema.statics = {
	get(id) {
		return this.findOne(id)
			.populate('user')
			.exec();
	},
	list() {
		const criteria = {};
		return this.find(criteria).exec();
	}
};

export default mongoose.model('Meds', MedSchema);

