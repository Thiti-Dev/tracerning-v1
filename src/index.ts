import { resolve } from 'path';
import express from 'express';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: resolve(__dirname, './config/.env.config') });

//@Importing Utils
import * as logger from './utils/dev/logger';

//@Global declaration
(global as any).logger = logger;

//@database
import connectDatabase from './db/index';

const app = express();

const run_server = (async () => {
	await connectDatabase(); //connect to the database

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
