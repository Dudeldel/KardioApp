CREATE DATABASE cardio;

CREATE TABLE cardio.people (name VARCHAR(50));
INSERT INTO cardio.people VALUES ('rob'), ('tracy'), ('sam'), ('duke');

CREATE TABLE cardio.users (
    id serial PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    password VARCHAR(12) NOT NULL
);

-- CREATE TABLE cardio.records (
--     id serial PRIMARY KEY,
--     user_id BIGINT NOT NULL,
--     date DATE NOT NULL,
--     knn_prognosis
--     knn_predict_proba
--     mlp_prognosis
--     mlp_predict_proba
--     nb_prognosis
--     nb_predict_proba
--     svc_prognosis
--     svc_predict_proba 
-- );