import 'dotenv/config';
import convict from 'convict';

const config = convict({
	env: {
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	host: {
		format: 'ipaddress',
		default: '127.0.0.1',
		env: 'HOST',
		arg: 'host'
	},
	port: {
		format: 'port',
		default: 7600,
		env: 'PORT',
		arg: 'port'
	},
	saltRounds: {
		format: 'nat',
		default: 10,
		env: 'BCRYPT_SALT_ROUNDS',
		arg: 'saltRounds'
	},
	mongodb: {
		uri: {
			format: 'url',
			default: 'mongodb://frank:frank123@ds117101.mlab.com:17101/mhub',
			env: 'MONGODB_URI',
			arg: 'db'
		}
	},
	jwt: {
		secret: {
			format: String,
			default: 'S3cr3t!',
			env: 'JWT_SECRET',
			arg: 'secret'
		},
		issuer: {
			format: String,
			default: 'medhub',
			env: 'JWT_ISSUER',
			arg: 'issuer'
		},
		expiresIn: {
			format: String,
			default: '2h',
			env: 'JWT_EXP',
			arg: 'exp'
		}
	}
});

export default config.get();
