import { resolve } from 'path';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: resolve(__dirname, './config/.env.config') });

//@Importing Utils
import * as logger from './utils/dev/logger';

//@Global declaration
(global as any).logger = logger;

//@database
import connectDatabase from './db/index';

//@routes-importing
import authorization from './routes/authorization';

//@middleware-importing
import errHandler from './middleware/errorHandler'

const app = express();

const run_server = (async () => {
	await connectDatabase(); //connect to the database

	//
	// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
	//
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	app.use(express.json()); //embedded parser

	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── SET UP ROUTE ───────────────────────────────────────────────────────────────
	//
	app.use('/api/authorization', authorization);
	// ────────────────────────────────────────────────────────────────────────────────

	//@Error-Handler
	app.use(errHandler)

	//
	// ─── SERVER LISTENER ────────────────────────────────────────────────────────────
	//

	const PORT = process.env.PORT || 5000;

	const server = app.listen(PORT, () => {
		logger.informationCustom(
			'SERVER',
			`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`
		);
	});

	// ────────────────────────────────────────────────────────────────────────────────
})(); // Immediately invoked
