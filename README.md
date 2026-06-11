# Netflix Search App

A simple movie and TV show search app built with Next.js.

The app uses a cleaned Netflix dataset from Kaggle. Users can search titles, filter results, and load extra movie details from the OMDb API.

## Live Demo

https://netflix-search-app.vercel.app/

## Features

- Search movies and TV shows
- Search by title, description, genre, cast, director, country, or year
- Filter by content type: Movie or TV Show
- Load more results
- Show basic Netflix dataset information
- Fetch extra details from OMDb API
- Show poster, rating, plot, actors, director, country, language, and awards
- Responsive UI built with Tailwind CSS and shadcn/ui

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Python
- Pandas
- OMDb API
- Vitest

## Data

The original dataset comes from Kaggle.

I cleaned the CSV file with Python and Pandas.  
The cleaning script fixes text encoding issues, removes unnecessary columns, prepares arrays for fields like genres and cast, and exports the data to JSON.

The Next.js app uses this cleaned JSON file as the local Netflix catalog.

OMDb API is used only for extra details.  
The Kaggle dataset is the base data source, and OMDb adds more movie information when the user clicks "View details".

## Testing

This project includes a simple unit test for the rating label helper.

## Environment Variables

Create a `.env.local` file in the root folder:

```env
OMDB_API_KEY=your_api_key_here