import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';

import routes from './api/routes/index.js';
import initDatabase from './api/config/MongoDb.js';

dotenv.config();
const app = express();


initDatabase(mongoose);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/api/v1', routes);

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

server.listen(process.env.PORT, () =>
	console.log(`listening on port: ${PORT}`)
);
