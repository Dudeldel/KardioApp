from flask import Flask, request, redirect, url_for, jsonify
import requests

import classifiers

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Co mówi ksiądz po ślubie informatyka?</p> \
            <p>Pobieranie zakończone!<p>"


@app.route("/classify", methods=['POST'])
def classify():
    if request.method == 'POST':
        data = request.get_json()
        out = dict()
        for cls in classifiers.classifiers_pkl:
            out[cls] = classifiers.classify(cls, data)

        return jsonify(out)
