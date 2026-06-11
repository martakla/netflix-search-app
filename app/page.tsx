"use client";

import { useMemo, useState } from "react";
import moviesData from "../data/netflix_clean.json";
import { Hero } from "@/components/Hero";
import { SearchFilters } from "@/components/SearchFilters";
import { MoviesGrid } from "@/components/MoviesGrid";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

const movies = moviesData as Movie[];
const INITIAL_VISIBLE_COUNT = 60;
const LOAD_MORE_COUNT = 60;

export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    function handleSearchChange(value: string) {
        setSearch(value);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }

    function handleTypeChange(value: string) {
        setSelectedType(value);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const searchText = search.toLowerCase().trim();

            const searchableText = [
                movie.title,
                movie.description,
                movie.genres.join(" "),
                movie.cast_list.join(" "),
                movie.directors.join(" "),
                movie.countries.join(" "),
                movie.release_year.toString(),
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                searchText === "" || searchableText.includes(searchText);

            const matchesType =
                selectedType === "All" || movie.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [search, selectedType]);

    const visibleMovies = filteredMovies.slice(0, visibleCount);
    const hasMoreMovies = visibleCount < filteredMovies.length;

    return (
        <main className="min-h-screen bg-neutral-950 px-6 py-10 font-sans text-white">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(185,28,28,0.35),transparent_35%),radial-gradient(circle_at_top_right,rgba(127,29,29,0.25),transparent_30%)]" />

            <div className="mx-auto max-w-7xl">
                <Hero />

                <SearchFilters
                    search={search}
                    selectedType={selectedType}
                    onSearchChange={handleSearchChange}
                    onTypeChange={handleTypeChange}
                />

                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-neutral-400">
                        Found:{" "}
                        <span className="font-bold text-white">
              {filteredMovies.length}
            </span>
                    </p>

                    <p className="text-sm text-neutral-500">
                        Showing {visibleMovies.length} of {filteredMovies.length} results
                    </p>
                </div>

                <MoviesGrid movies={visibleMovies} />

                {hasMoreMovies && (
                    <div className="mt-10 flex justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setVisibleCount((current) => current + LOAD_MORE_COUNT)
                            }
                            className="border-neutral-700 bg-neutral-900 px-8 text-white hover:bg-neutral-800 hover:text-white"
                        >
                            Load more
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}