import Link from 'next/link';
import { Separator } from 'src/components/ui';

const START_YEAR = 2024;

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-4 text-sm text-primary">
            <div className="flex items-center justify-center space-x-2 leading-4">
                <Link className="hover:underline" target="_blank" href="https://github.com/iwillzhou">
                    Github
                </Link>
                <Separator orientation="vertical" className="h-3" />
                <Link className="hover:underline" target="_blank" href="https://x.com/iWillZhou">
                    Twitter
                </Link>
                <Separator orientation="vertical" className="h-3" />
                <Link className="hover:underline" target="_blank" href="https://juejin.cn/user/2452351553638538">
                    掘金
                </Link>
                <Separator orientation="vertical" className="h-3" />
                <Link className="hover:underline" href="mailto:iwillzhou@outlook.com">
                    email
                </Link>
            </div>
            <div className="mt-2 flex items-center justify-center space-x-2 leading-4">
                © {currentYear === START_YEAR ? START_YEAR : `${START_YEAR}-${currentYear}`}
            </div>
        </footer>
    );
};

export default Footer;
