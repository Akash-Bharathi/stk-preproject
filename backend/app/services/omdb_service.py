import requests

API_KEY = "5977fb05"

BASE_URL = "http://www.omdbapi.com/"

def search_movies(title: str):

    response = requests.get(
        BASE_URL,
        params={
            "apikey": API_KEY,
            "s": title
        }
    )

    return response.json()

def get_movie(imdb_id: str):

    response = requests.get(
        BASE_URL,
        params={
            "apikey": API_KEY,
            "i": imdb_id
        }
    )

    return response.json()