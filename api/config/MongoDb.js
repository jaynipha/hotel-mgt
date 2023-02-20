'use strict';

import dotenv from 'dotenv';
dotenv.config();


const initDatabase = (mongoose) => {
	mongoose
		.connect(process.env.MONGODB_URL, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongoDb'))
		.catch((err) => console.log(err.message));
};

export default initDatabase;
