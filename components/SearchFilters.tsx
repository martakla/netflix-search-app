import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SearchFiltersProps = {
    search: string;
    selectedType: string;
    onSearchChange: (value: string) => void;
    onTypeChange: (value: string) => void;
};

export function SearchFilters({
                                  search,
                                  selectedType,
                                  onSearchChange,
                                  onTypeChange,
                              }: SearchFiltersProps) {
    return (
        <section className="mb-8 rounded-3xl border border-neutral-800 bg-neutral-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by title, actor, genre..."
                    className="h-12 border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-500 focus-visible:ring-red-600"
                />

                <Select value={selectedType} onValueChange={onTypeChange}>
                    <SelectTrigger className="h-12 border-neutral-700 bg-neutral-900 text-white">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Movie">Movies</SelectItem>
                        <SelectItem value="TV Show">TV Shows</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>
    );
}