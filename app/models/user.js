import mongoose, { Schema, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import config from '../config'

const schema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
  match: /^[a-zA-Z0-9]+$/,
  minlength: 3,
  maxLength: 20,
  unique: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		match: /\S+@\S+\.\S+/,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	Terms: {
		type: Boolean,
		required: true
	},
}, {
	toObject: {
		transform(doc, ret) {
			delete ret.password;
		}
	}
});

schema.plugin(uniqueValidator);

schema.pre('save', (next) => {
	const user = this;
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.getSalt(config.saltRounds, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

schema.methods = {
	comparePassword(candidate) {
		const user = this;
		return new Promise((resolve, reject) => {
			bcrypt.compare(candidate, user.password, (err, match) => {
				if (err) return reject(err);
				resolve(match);
			});
		});
	}
};
schema.statics = {
	get(id) {
		const $or = [{ name: id }, { email: id }];
		if (Types.ObjectId.isValid(id)) {
			$or.push({ _id: id });
		}
		return this.findOne({ $or }).exec();
	},
	list() {
		const criteria = {};
		return this.find(criteria).exec();
	}
};

export default mongoose.model('User', schema);
