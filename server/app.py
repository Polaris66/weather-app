import os
import requests
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-type"


@app.post("/weather")
@cross_origin()
def weather():
    json = request.json
    location = json["location"]

    api_key = os.environ["API_KEY"]
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={location}"
    r = requests.get(url=url)
    return r.json()


@app.post("/autocomplete")
@cross_origin()
def autocomplete():
    json = request.json
    location = json["location"]

    api_key = os.environ["API_KEY"]
    url = f"http://api.weatherapi.com/v1/search.json?key={api_key}&q={location}"
    r = requests.get(url=url)
    return r.json()


if __name__ == "__main__":
    app.run(debug=True)
