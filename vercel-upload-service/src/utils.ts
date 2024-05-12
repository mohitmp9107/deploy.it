const MAX_LENGTH = 5;

export const generate = ()=>{
	const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
	let id = "";
	for (let i = 0; i < MAX_LENGTH; i++) {
		id += subset[Math.floor(Math.random() * subset.length)];
	}
	return id;
}