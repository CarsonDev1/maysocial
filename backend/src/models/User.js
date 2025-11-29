import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		displayName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatarPublicId: {
			type: String,
		},
		avatarUrl: {
			type: String,
		},
		bio: {
			type: String,
			maxLength: 500,
		},
		phone: {
			type: String,
			sparse: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;
