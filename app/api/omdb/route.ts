import { NextResponse } from "next/server";

type OmdbResponse = {
    Response: "True" | "False";
    Error?: string;
    imdbID?: string;
    Title?: string;
    Year?: string;
    Type?: string;
};

type OmdbSearchResponse = {
    Response: "True" | "False";
    Error?: string;
    Search?: {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
    }[];
};

function getOmdbType(type: string | null) {
    if (type === "TV Show") {
        return "series";
    }

    if (type === "Movie") {
        return "movie";
    }

    return "";
}

async function fetchOmdbByTitle({
                                    apiKey,
                                    title,
                                    year,
                                    type,
                                }: {
    apiKey: string;
    title: string;
    year?: string | null;
    type?: string;
}) {
    const params = new URLSearchParams({
        apikey: apiKey,
        t: title,
        plot: "full",
    });

    if (year) {
        params.set("y", year);
    }

    if (type) {
        params.set("type", type);
    }

    const response = await fetch(`https://www.omdbapi.com/?${params.toString()}`);
    return response.json() as Promise<OmdbResponse>;
}

async function fetchOmdbById({
                                 apiKey,
                                 imdbId,
                             }: {
    apiKey: string;
    imdbId: string;
}) {
    const params = new URLSearchParams({
        apikey: apiKey,
        i: imdbId,
        plot: "full",
    });

    const response = await fetch(`https://www.omdbapi.com/?${params.toString()}`);
    return response.json() as Promise<OmdbResponse>;
}

async function searchOmdb({
                              apiKey,
                              title,
                              type,
                          }: {
    apiKey: string;
    title: string;
    type?: string;
}) {
    const params = new URLSearchParams({
        apikey: apiKey,
        s: title,
    });

    if (type) {
        params.set("type", type);
    }

    const response = await fetch(`https://www.omdbapi.com/?${params.toString()}`);
    return response.json() as Promise<OmdbSearchResponse>;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title");
    const year = searchParams.get("year");
    const type = searchParams.get("type");

    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "Missing OMDB_API_KEY in .env.local" },
            { status: 500 }
        );
    }

    if (!title) {
        return NextResponse.json(
            { error: "Missing title parameter" },
            { status: 400 }
        );
    }

    const omdbType = getOmdbType(type);

    // 1. Najdokładniejsze wyszukiwanie: title + year + type
    const exactWithYear = await fetchOmdbByTitle({
        apiKey,
        title,
        year,
        type: omdbType,
    });

    if (exactWithYear.Response === "True") {
        return NextResponse.json(exactWithYear);
    }

    // 2. Fallback: title + type, bez roku
    const exactWithoutYear = await fetchOmdbByTitle({
        apiKey,
        title,
        type: omdbType,
    });

    if (exactWithoutYear.Response === "True") {
        return NextResponse.json(exactWithoutYear);
    }

    // 3. Fallback: search po tytule
    const searchResult = await searchOmdb({
        apiKey,
        title,
        type: omdbType,
    });

    const firstMatch = searchResult.Search?.[0];

    if (searchResult.Response === "True" && firstMatch?.imdbID) {
        const details = await fetchOmdbById({
            apiKey,
            imdbId: firstMatch.imdbID,
        });

        if (details.Response === "True") {
            return NextResponse.json(details);
        }
    }

    return NextResponse.json(
        {
            error: "Details not found in OMDb.",
            searched: {
                title,
                year,
                type: omdbType || "any",
            },
            omdbError:
                exactWithYear.Error ||
                exactWithoutYear.Error ||
                searchResult.Error ||
                "No matching result.",
        },
        { status: 404 }
    );
}