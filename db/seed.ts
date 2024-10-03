import { db,Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Clients).values([
		{ name: 'John Doe', age: 30, isActive: true },
		{ name: 'Jane Doe', age: 25, isActive: false },
		{ name: 'Alice', age: 35, isActive: true },
		{ name: 'Bob', age: 40, isActive: false },
	]);
	console.log('Seeding database...');
}
