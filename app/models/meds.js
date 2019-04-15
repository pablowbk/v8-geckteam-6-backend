import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
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
		required: true,
		match: /^[a-zA-Z0-9]+$/,
	},
	image: {
		type: String,
		required: false,
	},
	contact: {
		type: String,
		required: true,
		match: /^[a-zA-Z0-9]+$/,
	},
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: true
	}
	});

export default mongoose.model('Meds', schema);

