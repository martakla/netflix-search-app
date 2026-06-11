"use client";

import { useState } from "react";
import type { Movie } from "@/types/movie";
import type { OmdbMovieDetails } from "@/types/omdb";
import { getAgeLabel } from "@/lib/ratings";
import { ExternalMovieDetails } from "@/components/ExternalMovieDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type MovieCardProps = {
    movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
    const [details, setDetails] = useState<OmdbMovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const typeLabel = movie.type === "Movie" ? "Movie" : "TV Show";
    const ageLabel = getAgeLabel(movie.rating);

    async function handleLoadDetails() {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const params = new URLSearchParams({
                title: movie.title,
                year: movie.release_year.toString(),
                type: movie.type,
            });

            const response = await fetch(`/api/omdb?${params.toString()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not load movie details.");
            }

            setDetails(data);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Could not load movie details.";

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleHideDetails() {
        setDetails(null);
        setErrorMessage("");
    }

    return (
        <Card className="flex min-h-[280px] flex-col overflow-hidden border-neutral-800 bg-neutral-900/90 text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-red-500/60 hover:bg-neutral-900">
            <CardHeader className="pb-3">
                <div className="mb-3 flex items-center justify-between gap-4">
                    <Badge className="bg-red-600 text-white hover:bg-red-600">
                        {typeLabel}
                    </Badge>

                    <span className="text-sm font-semibold text-neutral-400">
            {movie.release_year}
          </span>
                </div>

                <CardTitle className="line-clamp-2 text-2xl leading-tight text-white">
                    {movie.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 pb-5">
                <p className="mb-5 line-clamp-3 text-sm leading-6 text-neutral-400">
                    {movie.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-2">
                    {movie.genres.slice(0, 3).map((genre) => (
                        <Badge
                            key={genre}
                            variant="secondary"
                            className="bg-neutral-800 text-neutral-300 hover:bg-neutral-800"
                        >
                            {genre}
                        </Badge>
                    ))}
                </div>

                {isLoading && (
                    <Card className="mt-5 border-neutral-800 bg-neutral-950/80">
                        <CardContent className="grid gap-4 p-4 sm:grid-cols-[120px_1fr]">
                            <Skeleton className="h-[180px] w-[120px] rounded-xl bg-neutral-800" />

                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20 bg-neutral-800" />
                                    <Skeleton className="h-6 w-16 bg-neutral-800" />
                                    <Skeleton className="h-6 w-20 bg-neutral-800" />
                                </div>

                                <Skeleton className="h-4 w-full bg-neutral-800" />
                                <Skeleton className="h-4 w-11/12 bg-neutral-800" />
                                <Skeleton className="h-4 w-9/12 bg-neutral-800" />
                                <Skeleton className="h-4 w-8/12 bg-neutral-800" />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {details && <ExternalMovieDetails details={details} />}

                {errorMessage && (
                    <Alert className="mt-5 border-red-900/70 bg-red-950/40 text-red-200">
                        <AlertTitle>Details not found</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </CardContent>

            <CardFooter className="mt-auto flex flex-col items-start gap-4 border-t border-neutral-800 bg-neutral-950/70 px-6 py-4">
                <div className="flex flex-wrap gap-2">
                    {movie.rating && (
                        <Badge
                            variant="outline"
                            className="border-neutral-700 bg-neutral-900 text-neutral-300"
                            title={`Original maturity rating: ${movie.rating}`}
                        >
                            {ageLabel}
                        </Badge>
                    )}

                    {movie.duration && (
                        <Badge
                            variant="outline"
                            className="border-neutral-700 bg-neutral-900 text-neutral-300"
                        >
                            {movie.duration}
                        </Badge>
                    )}
                </div>

                <div className="flex gap-2">
                    {!details && (
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleLoadDetails}
                            disabled={isLoading}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {isLoading ? "Loading..." : "View details"}
                        </Button>
                    )}

                    {details && (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleHideDetails}
                            className="border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:text-white"
                        >
                            Hide details
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}