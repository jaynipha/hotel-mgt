import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'first name is required'],
		},
        lastName: {
			type: String,
			required: [true, 'last name is required'],
		},
		email: {
			type: String,
			required: [true, 'email is required'],
		},
		password: {
			type: String,
			required: [true, 'password is required'],
		},
        role: {
			type: String,
			required: [true, 'role is required'],
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model('users', UserSchema);
