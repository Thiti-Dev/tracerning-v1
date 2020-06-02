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

//@Session
import session from 'express-session'

//@Declare&Import persist session by connecting to mongoose
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: 'cachedSessions'
  });

//@routes-importing
import authorization from './routes/authorization';
import blogs from './routes/blogs';

//@middleware-importing
import errHandler from './middleware/errorHandler'

//@Cross origin
import cors from 'cors'

const app = express();

const run_server = (async () => {

	//
	// ─── CORS ───────────────────────────────────────────────────────────────────────
	//
	app.use(cors({
		//preflightContinue: true,
		credentials: true,
		origin:'http://localhost:4200'
	}))
	// ────────────────────────────────────────────────────────────────────────────────



	await connectDatabase(); //connect to the database

	//
	// ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
	//
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	app.use(express.json()); //embedded parser

	app.use(session({ 
		secret: 'super secret', 
		resave: false, 
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
		  },
		  store: store,
	   })
	  )

	// ────────────────────────────────────────────────────────────────────────────────

	//
	// ─── SET UP ROUTE ───────────────────────────────────────────────────────────────
	//
	app.use('/api/authorization', authorization);
	app.use('/api/blogs', blogs);
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
