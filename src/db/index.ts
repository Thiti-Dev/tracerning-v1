import mongoose from 'mongoose';

//@importing
import { mongoose_conf } from './config.json';

export default async function connectDatabase() {
	const connection = await mongoose.connect(process.env.MONGO_URI!, mongoose_conf);
	global.logger.informationCustom(
		'DATABASE',
		`MongoDB Connected: ${connection.connection.host} => ${connection.connection.name}`
	);
}
