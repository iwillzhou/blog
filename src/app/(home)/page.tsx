import Link from 'next/link';
import { getPosts } from 'src/utils/notion';

export default async function Home() {
    const { results: posts } = await getPosts();

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link href={`/post/${post.slug}`}>
                        {post.publishTime} | {post.title} | {post.tags.join()}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
