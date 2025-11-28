import User from '../models/User.js';

export const authMe = async (userId) => {
	const user = await User.findById(userId).select('-password');
	return user;
};
