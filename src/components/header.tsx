'use client';

import { useState } from 'react';
import { name } from 'src/config';
import { Menu } from 'lucide-react';
import { Link } from 'src/navigation';
import { useTranslations } from 'next-intl';
import ModeToggle from 'src/components/mode-toggle';
import LocaleToggle from 'src/components/locale-toggle';
import GlobalSearch from 'src/components/global-search';
import {
    Button,
    NavigationMenu,
    NavigationMenuItem,
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
} from 'src/lib/ui';

const Logo = () => {
    return (
        <div className="flex items-center">
            <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/172381913?v=4&size=64" alt="@Will" />
                <AvatarFallback>WZ</AvatarFallback>
            </Avatar>
            <div className="ml-4 font-sans">{name}</div>
        </div>
    );
};

const Header = () => {
    const t = useTranslations('header');
    const [open, setOpen] = useState(false);

    const navData = [
        {
            key: 'home',
            href: '/'
        },
        {
            key: 'post',
            href: '/post'
        },
        {
            key: 'tag',
            href: '/tag'
        },
        {
            key: 'about',
            href: '/about'
        }
    ].map(item => ({ ...item, label: t(item.key) }));

    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <Logo />
                <NavigationMenu className="ml-8 hidden md:block">
                    <NavigationMenuList>
                        {navData.map(i => (
                            <NavigationMenuItem key={i.key}>
                                <Link href={i.href} className={navigationMenuTriggerStyle()}>
                                    {i.label}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-1">
                <GlobalSearch />
                <ModeToggle />
                <LocaleToggle />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="md:hidden" asChild>
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
                        {navData.map(i => (
                            <div key={i.key}>
                                <Link href={i.href} className="my-3 flex justify-center" onClick={() => setOpen(false)}>
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
