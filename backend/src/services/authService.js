import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Session from '../models/Session.js';

const ACCESS_TOKEN_EXPIRATION = '30m';
const REFRESH_TOKEN_EXPIRATION = 14 * 24 * 60 * 60 * 1000; // 14 days

export const register = async ({ email, password, firstName, lastName }) => {
	if (!email || !password || !firstName || !lastName) {
		throw new Error('Không thể thiếu thông tin tài khoản');
	}

	const existingUser = await User.findOne({ $or: [{ email }] });
	if (existingUser) {
		throw new Error('Email đã tồn tại');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	let finalDisplayName = `${firstName || ''} ${lastName || ''}`.trim();

	const user = await User.create({ email, password: hashedPassword, displayName: finalDisplayName });

	return user;
};

export const login = async ({ email, password }) => {
	const user = await User.findOne({ $or: [{ email }] });
	if (!user) {
		throw new Error('Không tìm thấy người dùng');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error('Mật khẩu không đúng');
	}

	const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRATION,
	});

	const refreshToken = crypto.randomBytes(64).toString('hex');

	await Session.create({
		userId: user._id,
		refreshToken,
		expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION),
	});

	return { accessToken, refreshToken };
};

export const logout = async ({ refreshToken }) => {
	await Session.findOneAndDelete({ refreshToken });
};
