import jwt from 'jsonwebtoken';
import { authMe } from '../services/userService.js';

export const protectedRoute = (req, res, next) => {
	try {
		// token form header
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Không có quyền truy cập' });
		}

		// verify token
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
			if (err) {
				console.error(err);
				return res.status(403).json({ message: 'Bị cấm' });
			}
			const user = await authMe(decodedUser.userId);

			if (!user) {
				return res.status(404).json({ message: 'Không tìm thấy người dùng' });
			}
			req.user = user;
			next();
		});
	} catch (error) {
		console.error('Protected route error:', error);
		return res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
	}
};
