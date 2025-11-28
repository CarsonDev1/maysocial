export const me = async (req, res) => {
	try {
		const user = req.user;
		res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
