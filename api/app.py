from flask import Flask, request, redirect, jsonify, url_for, make_response
from flask_cors import CORS, cross_origin
import db_repository
import requests
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
            ), 400

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
                response[f] = user[f]

        response = db_repository.edit_user(user)
        
        return make_response(response, 200)


# @app.route('/api/records', methods=['POST', 'GET'])
# @cross_origin()
# def record():
#     if request.method == "POST":
#         response = request.get_json(force=True)

#         return jsonify(
#             status=True,
#             message='User ' + user['username'] + ' edited successfully!'
#         ), 200

#     if request.method == "GET":
#         response = request.args.get('userId')
        
#         return jsonify(
#             status=True,
#             message='User ' + user['username'] + ' edited successfully!'
#         ), 200


# route to return all people
# @app.route('/api/people', methods=['GET'])
# def index():
#    # connection for MariaDB
#    conn = mariadb.connect(**db_config)
#    # create a connection cursor
#    cur = conn.cursor()
#    # execute a SQL statement
#    cur.execute("select * from people")

#    # serialize results into JSON
#    row_headers=[x[0] for x in cur.description]
#    rv = cur.fetchall()
#    json_data=[]
#    for result in rv:
#         json_data.append(dict(zip(row_headers,result)))

#    # return the results!
#    return json.dumps(json_data)

@app.route("/classify", methods=['POST'])
def classify():
    if request.method == 'POST':
        data = request.get_json()
        out = dict()
        for cls in classifiers.classifiers_pkl:
            out[cls] = classifiers.classify(cls, data)

        return jsonify(out)
