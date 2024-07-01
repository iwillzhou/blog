'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import ModeToggle from 'src/components/mode-toggle';
import {
    Button,
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Separator
} from 'src/components/ui';

const NAV_LIST = [
    {
        key: 'home',
        label: '首页',
        href: '/'
    },
    {
        key: 'posts',
        label: '文章',
        href: '/post'
    },
    {
        key: 'tags',
        label: '标签',
        href: '/tags'
    },
    {
        key: 'about',
        label: '关于',
        href: '/about'
    }
];

const Logo = () => {
    return (
        <div className="flex items-center">
            <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/172381913?v=4&size=64" alt="@Will" />
                <AvatarFallback>WZ</AvatarFallback>
            </Avatar>
            <div className="ml-4 mt-1 font-sans">Will&apos;s notes</div>
        </div>
    );
};

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <Logo />
                <NavigationMenu className="ml-8 hidden lg:block">
                    <NavigationMenuList>
                        {NAV_LIST.map(i => (
                            <NavigationMenuItem key={i.key}>
                                <Link href={i.href} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {i.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center">
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
                <ModeToggle />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="lg:hidden" asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="flex w-64 flex-col">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="flex items-center">
                                <Logo />
                            </SheetTitle>
                        </SheetHeader>
                        {NAV_LIST.map(i => (
                            <div key={i.key}>
                                <Link href={i.href} onClick={() => setOpen(false)} className="my-3 flex justify-center">
                                    {i.label.split('').join('   ')}
                                </Link>
                                <Separator />
                            </div>
                        ))}
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
