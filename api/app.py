from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Co mówi ksiądz po ślubie informatyka?</p> \
            <p>Pobieranie zakończone!<p>"