import { resolve } from 'path';
import express from 'express';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: resolve(__dirname, './config/.env.config') });

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
		console.log(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`);
	});

	// ────────────────────────────────────────────────────────────────────────────────
})(); // Immediately invoked
