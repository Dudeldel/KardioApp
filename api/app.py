from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from datetime import date
import db_repository
import classifiers

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Co mówi ksiądz po ślubie informatyka?</p> \
            <p>Pobieranie zakończone!<p>"

@app.route('/api/user/register', methods=['POST'])
@cross_origin()
def register():
    if request.method == "POST":
        response = request.get_json(force=True)

        fields = ['username', 'firstName', 'lastName', 'sex', 'birthDate', 'password']

        incorrectly = [k for k in fields if k not in response.keys()]

        if incorrectly:
            return jsonify(
                status = True,
                message = 'Incorrect fileds: ' + ', '.join(incorrectly)
            ), 400
              
        user = {
            'username': response['username'],
            'first_name': response['firstName'],
            'last_name': response['lastName'],
            'sex': response['sex'],
            'birth_date': response['birthDate'],
            'password': response['password']
        }

        if db_repository.username_exist(user['username']):
            return jsonify(
                status=True,
                message='Username \'' + user['username'] + '\' exist'
            ), 400

        response = db_repository.add_user(user)

        if not response:
            return make_response('uss', 201)

        return make_response(response, 201)


@app.route('/api/user/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == "POST":
        response = request.get_json(force=True)

        fields = ['username', 'password']

        incorrectly = [k for k in fields if k not in response]

        if incorrectly:
            return jsonify(
                status = True,
                message = 'Incorrect fileds: ' + ', '.join(incorrectly)
            ), 400

        if not db_repository.correct_password(response["username"], response["password"]):
            return jsonify(
                status = True,
                message = 'Incorrect username or password'
            ), 401

        response = db_repository.get_user(response["username"])

        return make_response(response, 200)


@app.route('/api/user/edit', methods=['PATCH'])
@cross_origin()
def user_edit():
    if request.method == "PATCH":
        response = request.get_json(force=True)

        if 'username' not in response:
            return jsonify(
                status = True,
                message = 'Incorrect username'
            ), 400

        user = db_repository.get_user(response['username'])

        if not user:
            return jsonify(
                status=True,
                message='Username \'' + user['username'] + '\' not exist'
            ), 400

        fields = ['firstName', 'lastName', 'sex', 'birthDate']

        for f in fields:
            if f not in response:
                response[f] = "Kupa"
            else:
                user[f] = response[f]

        response = db_repository.edit_user(user)
        
        return make_response(response, 200)


@app.route("/api/classify", methods=['POST', 'GET'])
@cross_origin()
def classify():
    if request.method == 'POST':
        body = request.get_json(force=True)

        if 'username' not in body or 'data' not in body:
            return jsonify(
                status = True,
                message = 'Incorrect datas'
            ), 400

        data = body["data"]

        user = db_repository.get_user(body["username"])

        data["sex"] = user["sex"]
        data["age"] = calculate_age(user["birth_date"])

        out = dict()
        for cls in classifiers.classifiers_pkl:
            try:
                out[cls] = classifiers.classify(cls, data)
            except ValueError:
                return jsonify(
                    status = True,
                    message = 'Value error in data'
                ), 400

        new_data = db_repository.new_survey_data(user["username"], data)
        
        for k in out:
            out[k]["prognosis"] = int(out[k]["prognosis"])
            db_repository.new_result({
                "model_name": k,
                "predict_proba": out[k]["predict_proba"],
                "prognosis": out[k]["prognosis"],
                "survey_data_id": new_data["id"]
            })

        out["id"]=new_data["id"]
        return make_response(out, 200)

    if request.method == 'GET':
        query = request.args
        
        if 'username' not in query:
            return jsonify(
                status = True,
                message = 'Incorrect query'
            ), 400

        user = db_repository.get_user(query["username"])
        datas = db_repository.get_all_survey_data(query["username"])

        for d in datas:
            datas[d]["age"] = calculate_age(user["birth_date"], datas[d]["date"])
            datas[d]["sex"] = user["sex"]
            datas[d]["results"] = db_repository.get_result_of_survey_data(datas[d]["id"])

        return make_response(datas, 200)


@app.route("/api/survey/data", methods=['GET'])
@cross_origin()
def get_survey_data():
    if request.method == 'GET':
        query = request.args
        
        if 'username' not in query:
            return jsonify(
                status = True,
                message = 'Incorrect query'
            ), 400

        user = db_repository.get_user(query["username"])
        datas = db_repository.get_all_survey_data(query["username"])

        for d in datas:
            datas[d]["age"] = calculate_age(user["birth_date"], datas[d]["date"])
            datas[d]["sex"] = user["sex"]

        return make_response(datas, 200)


@app.route("/api/survey/result", methods=['GET'])
@cross_origin()
def get_survey_result():
    if request.method == 'GET':
        query = request.args
        
        if 'id' not in query:
            return jsonify(
                status = True,
                message = 'Incorrect query'
            ), 400
        
        results = db_repository.get_survey_data_by_id(query["id"])

        return make_response(results, 200)


def calculate_age(born, day=date.today()):
    return day.year - born.year - ((day.month, day.day) < (born.month, born.day))
