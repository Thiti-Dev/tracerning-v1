interface IFinalizeObject {
    [key: string]: any;
}

export default (rawField:Object, allowed_field: string[]) => {
	const filtered_obj:IFinalizeObject = {};
	for (let [ key, value ] of Object.entries(rawField)) {
		if (allowed_field.includes(key)) {
			filtered_obj[key] = value;
		}
	}
	return filtered_obj;
};