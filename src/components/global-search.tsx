import { Search } from 'lucide-react';
import { Button } from 'src/components/ui';

export default function GlobalSearch() {
    return (
        <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
        </Button>
    );
}
