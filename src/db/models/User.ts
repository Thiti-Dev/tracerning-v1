import mongoose, { Document, Schema, model, Model } from 'mongoose';

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: [ true, 'Please add an email' ],
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	role: {
		// No enum becacuse only 2 role [user,admin] => set admin directly from compass or any dbms
		type: String,
		default: 'user'
	},
	username: {
		type: String,
		required: [ true, 'Please add a username' ]
	},
	password: {
		type: String,
		required: [ true, 'Please add a password' ],
		minlength: 6,
		select: false // not returning the password [HIDING]
	},
	photo: {
		type: String,
		default: 'unknown-user.jpg'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

interface IUser extends Document {
	email: string;
	role: string;
	username: string;
	password: string;
	photo: string;
	createdAt: Date;
}

var UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export default UserModel;
