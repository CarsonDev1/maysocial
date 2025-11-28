import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			uppercase: true,
			default: 'USER',
		},
	},
	{
		timestamps: true,
	}
);

const Role = mongoose.model('Role', roleSchema);

export default Role;
