declare namespace NodeJS {
	interface Global {
		logger: {
			informationCustom(header: string, log_txt: string): void;
			information(log_txt: string): void;
			debug(log_txt: string): void;
		};
	}
}
