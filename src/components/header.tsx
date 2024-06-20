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
    SheetTrigger
} from 'src/components/ui';

const NAV_LIST = [
    {
        key: 'home',
        label: '首页',
        href: '/'
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

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    WZ
                </div>
                <div className="ml-4">Tech notes</div>
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
                        <SheetHeader>
                            <SheetTitle>目录</SheetTitle>
                        </SheetHeader>
                        {NAV_LIST.map(i => (
                            <Link key={i.key} href={i.href} onClick={() => setOpen(false)}>
                                {i.label}
                            </Link>
                        ))}
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
