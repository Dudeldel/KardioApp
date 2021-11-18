CREATE DATABASE cardio;

CREATE TABLE cardio.people (name VARCHAR(50));
INSERT INTO cardio.people VALUES ('rob'), ('tracy'), ('sam'), ('duke');

CREATE TABLE cardio.users (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    birth_date DATE NOT NULL,
    sex INTEGER NOT NULL,
    password VARCHAR(12) NOT NULL
);

INSERT INTO cardio.users VALUES (1, 'robe', 'mm' , 'dd', '2020-11-11', 0, 'milka'), (2, 'ebb', 'mn' , 'aa', '2020-10-11', 0, 'oko');

-- CREATE TABLE cardio.survey_data (
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     user_id BIGINT NOT NULL,
--     date DATE NOT NULL,
--     age,
--     sex,
--     chest_pain_type,
--     rest_blood_pressure,
--     serum_cholestoral,
--     fasting_blood_sugar,
--     res_electrocardiographic,
--     max_heart_rate,
--     exercise_induced,
--     oldpeak,
--     slope,
--     major_vessels,
--     thal
-- );

-- CREATE TABLE cardio.results (
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     survay_data_id BIGINT NOT NULL,
--     model_name VARCHAR(10) NOT NULL,
--     predict_proba
--     prognosis
-- );