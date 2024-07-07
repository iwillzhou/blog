import { Link } from 'src/navigation';

export default function ArticleList({ posts }: { posts: any[] }) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link
                        href={`/post/${post.slug}`}
                        className="mb-6 flex w-full flex-col transition-opacity md:flex-row md:items-center md:gap-2"
                    >
                        <span className="op-70 flex-shrink-0 font-mono text-sm">{post.publishTime}</span>
                        <span className="hidden md:inline">·</span>
                        <span className="text-lg">{post.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
