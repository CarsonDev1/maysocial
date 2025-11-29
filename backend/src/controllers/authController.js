import * as authService from '../services/authService.js';

const REFRESH_TOKEN_EXPIRATION = 14 * 24 * 60 * 60 * 1000; // 14 days

export const registerController = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const user = await authService.register({ email, password, firstName, lastName });
		res.status(201).json({ message: 'Đăng ký thành công', user });
	} catch (error) {
		console.error('Register error:', error);
		res.status(500).json({ message: error.message });
	}
};

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { accessToken, refreshToken } = await authService.login({ email, password });
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			maxAge: REFRESH_TOKEN_EXPIRATION,
			secure: true,
		});
		res.status(200).json({ message: 'Đăng nhập thành công', accessToken });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: error.message });
	}
};

export const logoutController = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;
		await authService.logout({ refreshToken });
		res.clearCookie('refreshToken');
		res.status(200).json({ message: 'Đăng xuất thành công' });
	} catch (error) {
		console.error('Logout error:', error);
		res.status(500).json({ message: error.message });
	}
};
