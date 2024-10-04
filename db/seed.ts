import { getCollection } from 'astro:content';
import { db, Clients, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Clients).values([
		{ name: 'John Doe', age: 30, isActive: true },
		{ name: 'Jane Doe', age: 25, isActive: false },
		{ name: 'Alice', age: 35, isActive: true },
		{ name: 'Bob', age: 40, isActive: false },
	]);

	const posts = await getCollection('blog');
	const ps = posts.map(p => ({
		id: p.id,
		title: p.data.title,
		likes: Math.round(Math.random() * 100)
	}
	));
	
	await db.insert(Posts).values(ps);
	console.log('Seeding database...');
}
