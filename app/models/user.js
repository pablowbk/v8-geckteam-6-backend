import mongoose, { Schema, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import config from '../config';

const UserSchema = new Schema({
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
	terms: {
		type: Boolean,
		required: true
	},
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', (next) => {
	bcrypt.getSalt(config.saltRounds, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(this.password, salt, (error, hash) => {
			if (error) return next(error);
			this.password = hash;
			next();
		});
	});
});

UserSchema.methods = {
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
UserSchema.statics = {
	get(id) {
		const $or = [{ name: id }, { email: id }];
		console.log('$or', $or);
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

export default mongoose.model('User', UserSchema);
