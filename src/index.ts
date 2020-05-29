import express from 'express';

const app = express();

//
// ─── SERVER LISTENER ────────────────────────────────────────────────────────────
//

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`The server is currently running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// ────────────────────────────────────────────────────────────────────────────────
