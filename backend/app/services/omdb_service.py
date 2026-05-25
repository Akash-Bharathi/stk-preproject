import os
import requests

from dotenv import load_dotenv

load_dotenv()


API_KEY = os.getenv("OMDB_API_KEY")

BASE_URL = "http://www.omdbapi.com/"


# Reusable OMDb request
def fetch_from_omdb(params: dict):

    try:

        response = requests.get(
            BASE_URL,
            params=params
        )

        data = response.json()

        if data.get("Response") == "False":
            return None

        return data

    except Exception as e:

        print("OMDb API Error:", e)

        return None


# Search movies
def search_movies(title: str):

    return fetch_from_omdb({
        "apikey": API_KEY,
        "s": title
    })


# Get movie details
def get_movie(imdb_id: str):

    return fetch_from_omdb({
        "apikey": API_KEY,
        "i": imdb_id
    })