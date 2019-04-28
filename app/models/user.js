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
	confirmPassword: {
		type: String,
		required: true
	},
	terms: {
		type: Boolean,
		required: true
	}
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('init', (next) => {
	console.log('Open the gate, im Initializing the DB');
});

UserSchema.pre('save', (next) => {
	console.log('Inputing New User');
	return next();
});

UserSchema.pre('save', function (next) {
 const user = this;
	if (!this.isModified('password')) {
  return next();
 }
 bcrypt.genSalt(config.saltRounds, function (err, salt) {
  if (err) return next(err);
  bcrypt.hash(user.password, salt, function (error, hash) {
   if (error) return next(error);
   user.password = hash;
  });
 });

 // Unica manera de ser confidencial con las PW que inputeamos
 // esta modalidad no realiza el mismo hash para cada string 
 // retornando un Hash individual. No se si se pueden comparar.

 bcrypt.genSalt(config.saltRounds, function (errw, salt) {
 	if (errw) return next(errw);
  bcrypt.hash(user.confirmPassword, salt, (errors, hashs) => {
  	if (errors) return next(errors);
 		user.confirmPassword = hashs;
 		next();
  });
	});
});
UserSchema.post('save', function (next) {
	console.log('User Saved');
	const user = this;
	console.log('user:', user.name);
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
			$or.push({ id });
		}
		return this.findOne({ $or }).exec();
	},
	list() {
		const criteria = {};
		return this.find(criteria).exec();
	}
};

export default mongoose.model('User', UserSchema);
