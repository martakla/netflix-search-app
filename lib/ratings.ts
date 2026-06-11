export function getAgeLabel(rating: string) {
    const labels: Record<string, string> = {
        G: "All ages",
        "TV-G": "All ages",
        PG: "PG",
        "TV-PG": "PG",
        "PG-13": "13+",
        "TV-14": "14+",
        R: "17+",
        "NC-17": "18+",
        "TV-MA": "Adults",
        "TV-Y": "Kids",
        "TV-Y7": "7+",
        NR: "Unrated",
        UR: "Unrated",
    };

    return labels[rating] ?? rating;
}