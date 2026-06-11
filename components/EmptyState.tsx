import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
    return (
        <Card className="border-neutral-800 bg-neutral-900/80 text-white">
            <CardContent className="p-10 text-center">
                <h2 className="mb-2 text-2xl font-bold">No results found</h2>

                <p className="text-neutral-400">
                    Try searching for another title, actor, or genre.
                </p>
            </CardContent>
        </Card>
    );
}