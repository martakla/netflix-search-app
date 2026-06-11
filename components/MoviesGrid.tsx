import type { Movie } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";
import { EmptyState } from "@/components/EmptyState";

type MoviesGridProps = {
    movies: Movie[];
};

export function MoviesGrid({ movies }: MoviesGridProps) {
    if (movies.length === 0) {
        return <EmptyState />;
    }

    return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {movies.map((movie) => (
                <MovieCard key={movie.show_id} movie={movie} />
            ))}
        </section>
    );
}