import mariadb
from flask import Flask, request, jsonify, make_response
import os

db_config = {
    'host': os.environ['DB_HOSTNAME'],
    'port': 3306,
    'user': os.environ['DB_USERNAME'],
    'password': os.environ['DB_PASSWORD'],
    'database': os.environ['DB_NAME']
}

def username_exist(username):
    conn = mariadb.connect(**db_config)
    cursor = conn.cursor()

    statement = "SELECT username FROM users WHERE username='%s'"
    data = (username)
    cursor.execute(statement, data)
    return len(cursor.fetchall()) > 0


def get_user(username):
    conn = mariadb.connect(**db_config)
    cur = conn.cursor()
    cur.execute("select * from users where username = '%s'", (username))

    row_headers=[ x[0] for x in cur.description ]
    rv = cur.fetchall()

    return dict(zip(row_headers, rv[0]))


def correct_password(username, password):
    conn = mariadb.connect(**db_config)
    cursor = conn.cursor()

    statement = "SELECT username, password FROM users WHERE username=%s"
    data = (username)
    cursor.execute(statement, data)
    row_headers = [ x[0] for x in cursor.description ]
    user = zip(row_headers, cursor.fetchall()[0])

    return user["password"] == password


def add_user(user):
    conn = mariadb.connect(**db_config)
    cursor = conn.cursor()
    statement = "INSERT INTO users (username, first_name, last_name, birth_date, sex,  password) VALUES (%s, %s, %s, %s, %s, %s)"
    data = (user['username'], user['first_name'], user['last_name'], user['birth_date'], user['sex'],  user['password'])
    cursor.execute(statement, data)

    conn.commit() 

    return get_user(user['username'])

def edit_user(user):
    pass

def new_record(data, records):
    pass

def get_all_record(username):
    pass

