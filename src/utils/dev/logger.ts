import 'colors';

export function information(log_txt: string): void {
	console.log(`[DEGUG]:`.black.bgGreen + ` ${log_txt}`.white.bgCyan);
}

export function informationCustom(header: string, log_txt: string) {
	console.log(`[${header}]:`.black.bgGreen + ` ${log_txt}`.white.bgCyan);
}

export function debug(log_txt: string): void {
	console.log(`[DEBUG]:`.black.bgWhite + ` ${log_txt}`.white.bgMagenta);
}
