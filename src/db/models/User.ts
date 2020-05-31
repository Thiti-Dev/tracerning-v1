import bcrypt from 'bcryptjs'
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

//@Based schema
interface IUserSchema extends Document {
	email: string;
	role: string;
	username: string;
	password: string;
	photo: string;
	createdAt: Date;

}

//@Declaring all instance methods
interface IUserModel extends IUserSchema{
	matchPassword(enteredPassword:string): Promise<boolean>
}



//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
//

UserSchema.pre<IUserModel>('save',async function(next): Promise<void>{
	if(!this.isModified('password')){
		next();
	}
	const salt : string = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
})

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── INSTANCE METHODS ───────────────────────────────────────────────────────────
//
UserSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
	return await bcrypt.compare(enteredPassword, this.password);
};

// ────────────────────────────────────────────────────────────────────────────────


var UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default UserModel;