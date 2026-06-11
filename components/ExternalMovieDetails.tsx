import type { OmdbMovieDetails } from "@/types/omdb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ExternalMovieDetailsProps = {
    details: OmdbMovieDetails;
};

function isAvailable(value?: string) {
    return value && value !== "N/A";
}

export function ExternalMovieDetails({ details }: ExternalMovieDetailsProps) {
    const hasPoster = isAvailable(details.Poster);

    return (
        <Card className="mt-5 border-neutral-800 bg-neutral-950/80 text-white">
            <CardContent className="p-4">
                <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                    {hasPoster && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={details.Poster}
                            alt={`${details.Title} poster`}
                            className="h-[180px] w-[120px] rounded-xl object-cover"
                        />
                    )}

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {isAvailable(details.imdbRating) && (
                                <Badge
                                    variant="outline"
                                    className="border-yellow-600/60 bg-yellow-950/30 text-yellow-300"
                                    title="IMDb rating"
                                >
                                    Rating {details.imdbRating}/10
                                </Badge>
                            )}
                        </div>

                        {isAvailable(details.Plot) && (
                            <p className="text-sm leading-6 text-neutral-300">
                                {details.Plot}
                            </p>
                        )}

                        <div className="grid gap-2 text-sm text-neutral-400">
                            {isAvailable(details.Released) && (
                                <p>
                                    <span className="text-neutral-500">Released:</span>{" "}
                                    {details.Released}
                                </p>
                            )}

                            {isAvailable(details.Genre) && (
                                <p>
                                    <span className="text-neutral-500">Genre:</span>{" "}
                                    {details.Genre}
                                </p>
                            )}

                            {isAvailable(details.Country) && (
                                <p>
                                    <span className="text-neutral-500">Country:</span>{" "}
                                    {details.Country}
                                </p>
                            )}

                            {isAvailable(details.Language) && (
                                <p>
                                    <span className="text-neutral-500">Language:</span>{" "}
                                    {details.Language}
                                </p>
                            )}

                            {isAvailable(details.Director) && (
                                <p>
                                    <span className="text-neutral-500">Director:</span>{" "}
                                    {details.Director}
                                </p>
                            )}

                            {isAvailable(details.Writer) && (
                                <p>
                                    <span className="text-neutral-500">Writer:</span>{" "}
                                    {details.Writer}
                                </p>
                            )}

                            {isAvailable(details.Actors) && (
                                <p>
                                    <span className="text-neutral-500">Actors:</span>{" "}
                                    {details.Actors}
                                </p>
                            )}

                            {isAvailable(details.Awards) && (
                                <p>
                                    <span className="text-neutral-500">Awards:</span>{" "}
                                    {details.Awards}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}