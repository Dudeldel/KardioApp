import pickle

import numpy as np

prognosis_labels = {
    1: 'Negatywna',
    2: 'Pozytywna'
}

classifiers_pkl = {
    'KNN': 'models/heart_KNN.pkl',
    'MLP': 'models/heart_MLP.pkl',
    'NB': 'models/heart_NB.pkl',
    'SVC': 'models/heart_SVC.pkl',
}

data_conditions = {
    'age': lambda x: x > 0,
    'sex': lambda x: x in [0, 1],
    'chest_pain_type': lambda x: x in [1, 2, 3, 4],
    'rest_blood_pressure': lambda x: 94 <= x <= 200,
    'serum_cholestoral': lambda x: 126 <= x <= 564,
    'fasting_blood_sugar': lambda x: x in [0, 1],
    'res_electrocardiographic': lambda x: x in [0, 1, 2],
    'max_heart_rate': lambda x: 71 <= x <= 201,
    'exercise_induced': lambda x: x in [0, 1],
    'oldpeak': lambda x: 0 <= x <= 62,
    'slope': lambda x: x in [1, 2, 3],
    'major_vessels': lambda x: x in [0, 1, 2, 3],
    'thal': lambda x: x in [3, 4, 5, 6, 7]
}


def classify(model: str, data: dict):
    _check_data(data)

    data = _data_to_list(data)

    out = dict()

    model = pickle.load(open(classifiers_pkl[model], 'rb'))
    prognosis = model.predict(data)[0]

    out['prognosis'] = prognosis
    out['predict_proba'] = np.max(model.predict_proba(data)) * 100

    return out


def _check_data(data: dict):
    for label in data_conditions:
        if label not in data:
            raise ValueError(f'Label {label} not passed.')
        if not data_conditions[label](data[label]):
            raise ValueError(f'Value of {label} is not right.')


def _data_to_list(data: dict) -> list[list]:
    out = list()
    for label in data_conditions:
        out.append(data[label])

    return [out]
