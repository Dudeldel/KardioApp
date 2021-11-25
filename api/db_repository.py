import datetime

from db_connector import cursor

import os

db_config = {
    'host': os.environ['DB_HOSTNAME'],
    'port': 3306,
    'user': os.environ['DB_USERNAME'],
    'password': os.environ['DB_PASSWORD'],
    'database': os.environ['DB_NAME']
}


def username_exist(username):
    with cursor(**db_config) as c:
        statement = "SELECT username FROM users WHERE username=%s"
        data = (username,)
        c.execute(statement, data)
        return len(c.fetchall()) > 0


def get_user(username):
    if username_exist(username):
        with cursor(**db_config) as c:
            c.execute("select * from users where username = %s", (username,))

            row_headers = [x[0] for x in c.description]
            rv = c.fetchall()

        return dict(zip(row_headers, rv[0]))
    else:
        return None


def correct_password(username, password):
    if username_exist(username):
        with cursor(**db_config) as c:

            statement = "SELECT username, password FROM users WHERE username=%s"
            data = (username,)
            c.execute(statement, data)
            res = c.fetchone()
            return res[1] == password

    else:
        return False


def add_user(user):
    with cursor(**db_config) as c:
        statement = "INSERT INTO users (username, first_name, last_name, birth_date, sex,  password) VALUES (%s, %s, " \
                    "%s, %s, %s, %s) "
        data = (
            user['username'], user['first_name'], user['last_name'], user['birth_date'], user['sex'], user['password'])
        c.execute(statement, data)

    return get_user(user['username'])


def edit_user(user):
    if not username_exist(user['username']):
        raise ValueError("Username doesn't exist in database!")

    with cursor(**db_config) as c:
        statement = "update users " \
                    "set username=%s, first_name=%s, last_name=%s, birth_date=%s, sex=%s,  password=%s " \
                    "where username=%s"
        data = (user['username'], user['firstName'], user['lastName'], user['birthDate'],
                user['sex'], user['password'], user['username'])
        c.execute(statement, data)

    return get_user(user['username'])


def new_result(data):
    statement_data = (
        data['survey_data_id'],
        data['model_name'],
        data['predict_proba'],
        data['prognosis'],
    )

    with cursor(**db_config) as c:
        statement = "INSERT INTO results (survey_data_id, model_name, predict_proba, prognosis) " \
                    "VALUES (%s,%s,%s,%s)"
        c.execute(statement, statement_data)
    return get_result_of_survey_data(data['survey_data_id'])


def get_all_results(username):
    user = get_user(username)

    with cursor(**db_config) as c:
        c.execute("select * from results where user_id = %s", (user['id'],))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

    out_dict = {}
    for res_id, res in enumerate(rv):
        out_dict[res_id] = dict(zip(row_headers, res))

    return out_dict


def get_latest_result(username):
    survey = get_latest_survey_data(username)

    with cursor(**db_config) as c:
        c.execute("select * from results where survey_data_id = %s", (survey['id'],))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

    return dict(zip(row_headers, rv[0]))


def get_result_of_survey_data(survey_data_id):
    with cursor(**db_config) as c:
        c.execute("select * from results where survey_data_id = %s", (survey_data_id,))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

        out_dict = {}
        for res_id, res in enumerate(rv):
            out_dict[res_id] = dict(zip(row_headers, res))

    return out_dict

def get_survey_data_by_id(survey_data_id):
    with cursor(**db_config) as c:
        c.execute("""
            select 
            user_id, date, chest_pain_type, rest_blood_pressure,
            serum_cholestoral, fasting_blood_sugar, res_electrocardiographic, max_heart_rate,
            exercise_induced, oldpeak, slope, major_vessels, thal,
            (SELECT GROUP_CONCAT(model_name) from results where survey_data_id = survey_data.id) as model_name,
            (SELECT GROUP_CONCAT(predict_proba) from results where survey_data_id = survey_data.id) as predict_proba,
            (SELECT GROUP_CONCAT(prognosis) from results where survey_data_id = survey_data.id) as prognosis
            from survey_data 
            where id = %s
        """, (survey_data_id,))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

        out_dict = {}
        for res_id, res in enumerate(rv):
            out_dict[res_id] = dict(zip(row_headers, res))

    return out_dict

def new_survey_data(username, data):
    if not username_exist(username):
        raise ValueError("Username doesn't exist in database!")

    user = get_user(username)

    statement_data = (
        user['id'],
        datetime.datetime.now(),
        data['chest_pain_type'],
        data['rest_blood_pressure'],
        data['serum_cholestoral'],
        data['fasting_blood_sugar'],
        data['res_electrocardiographic'],
        data['max_heart_rate'],
        data['exercise_induced'],
        data['oldpeak'],
        data['slope'],
        data['major_vessels'],
        data['thal']
    )

    with cursor(**db_config) as c:
        statement = "INSERT INTO survey_data (user_id, date, chest_pain_type, rest_blood_pressure, " \
                    "serum_cholestoral, fasting_blood_sugar, res_electrocardiographic, max_heart_rate, " \
                    "exercise_induced, oldpeak, slope, major_vessels, thal) " \
                    "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        c.execute(statement, statement_data)
    return get_latest_survey_data(username)


def get_all_survey_data(username):
    if not username_exist(username):
        raise ValueError("Username doesn't exist in database!")

    with cursor(**db_config) as c:
        c.execute(
            """select 
            survey_data.id, 
            survey_data.date, 
            survey_data.rest_blood_pressure, 
            survey_data.serum_cholestoral, 
            survey_data.max_heart_rate, 
            survey_data.major_vessels,
            CAST((select avg(prognosis) from results where survey_data_id = survey_data.id group by prognosis limit 1) as INT) as 'wynik'
            from survey_data
            where user_id = (select id from users where username = %s) 
            order by date desc""",
            (username,))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

    out_dict = {}
    for res_id, res in enumerate(rv):
        out_dict[res_id] = dict(zip(row_headers, res))

    return out_dict


def get_latest_survey_data(username):
    if not username_exist(username):
        raise ValueError("Username doesn't exist in database!")

    with cursor(**db_config) as c:
        c.execute(
            "select * from survey_data where user_id = (select id from users where username = %s) order by date desc",
            (username,))

        rv = c.fetchall()
        row_headers = [x[0] for x in c.description]

    return dict(zip(row_headers, rv[0]))
