CREATE DATABASE cardio;

CREATE TABLE cardio.users (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    birth_date DATE NOT NULL,
    sex INTEGER NOT NULL,
    password VARCHAR(12) NOT NULL
);

--     age, < można wyliczyc z birth date
--     sex, < iest w userze
CREATE TABLE cardio.survey_data (
     id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
     user_id BIGINT NOT NULL,
     date DATETIME NOT NULL,
     chest_pain_type INTEGER NOT NULL,
     rest_blood_pressure FLOAT NOT NULL,
     serum_cholestoral FLOAT NOT NULL,
     fasting_blood_sugar INTEGER NOT NULL,
     res_electrocardiographic INTEGER NOT NULL,
     max_heart_rate FLOAT NOT NULL,
     exercise_induced INTEGER NOT NULL,
     oldpeak FLOAT NOT NULL,
     slope INTEGER NOT NULL,
     major_vessels INTEGER NOT NULL,
     thal INTEGER NOT NULL
 );

 CREATE TABLE cardio.results (
     id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
     survey_data_id BIGINT NOT NULL,
     model_name VARCHAR(10) NOT NULL,
     predict_proba FLOAT NOT NULL,
     prognosis INTEGER NOT NULL
 );