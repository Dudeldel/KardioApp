from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
import mariadb
import os

db_config = {
    'host': os.environ['DB_HOSTNAME'],
    'port': 3306,
    'user': os.environ['DB_USERNAME'],
    'password': os.environ['DB_PASSWORD'],
    'database': os.environ['DB_NAME']
}

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
        
        
        user = response
        
        # user = {
        #     'username': response['username'],
        #     'first_name': response['firstName'],
        #     'last_name': response['lastName'],
        #     'age': response['age'],
        #     'password': response['password']
        # }

    return jsonify(
        status=True,
        message='User ' + user['username'] + ' registered successfully!'
    ), 201


@app.route('/api/user/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == "POST":
        response = request.get_json(force=True)
        user = {
            'username': response['username'], 
            'password': response['password']
        }
    return jsonify(
        status=True,
        message='User ' + user['username'] + ' login successfully!'
    ), 200


@app.route('/api/user/edit', methods=['PUT'])
@cross_origin()
def user_edit():
    if request.method == "PUT":
        response = request.get_json(force=True)
        user = {
            'username': response['username'],
            'first_name': response['firstName'],
            'last_name': response['lastName'],
            'age': response['age'],
            'password': response['password']
        }
    return jsonify(
        status=True,
        message='User ' + user['username'] + ' edited successfully!'
    ), 200


@app.route('/api/record', methods=['POST', 'GET'])
@cross_origin()
def record():
    if request.method == "POST":
        response = request.get_json(force=True)

        return jsonify(
            status=True,
            message='User ' + user['username'] + ' edited successfully!'
        ), 200

    if request.method == "GET":
        response = request.args.get('userId')
        
        return jsonify(
            status=True,
            message='User ' + user['username'] + ' edited successfully!'
        ), 200


# route to return all people
@app.route('/api/people', methods=['GET'])
def index():
   # connection for MariaDB
   conn = mariadb.connect(**db_config)
   # create a connection cursor
   cur = conn.cursor()
   # execute a SQL statement
   cur.execute("select * from people")

   # serialize results into JSON
   row_headers=[x[0] for x in cur.description]
   rv = cur.fetchall()
   json_data=[]
   for result in rv:
        json_data.append(dict(zip(row_headers,result)))

   # return the results!
   return json.dumps(json_data)