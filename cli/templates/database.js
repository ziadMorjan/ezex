exports.dbTemplate = `import mongoose from 'mongoose';

export const dbConnect = async (uri) => {
	try {
		await mongoose.connect(uri);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed:', error.message);
		process.exit(1);
	}
};
`