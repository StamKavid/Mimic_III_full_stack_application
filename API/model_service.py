import pandas as pd
import os
from sklearn.model_selection import KFold, cross_val_score
from scipy import stats
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import confusion_matrix, classification_report
import joblib
from sklearn.ensemble import GradientBoostingClassifier


def main():
    best = modeling()
    return best

def modeling():

    cleaned_data = pd.read_csv(os.getcwd() + "/repo/cleaned.csv")
    features = cleaned_data.drop(["hospitalization"], axis=1)
    target = cleaned_data["hospitalization"]
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.3)
    parameters = {"learning_rate": [0.01, 0.1, 0.2], "max_depth": [3, 5, 8]}
    clf = GridSearchCV(GradientBoostingClassifier(), parameters, cv=5)
    clf.fit(X_train, y_train)
    return joblib.dump(clf, "pred.model")

def save(patient):

    required_patients_keys = {
        "age",
        "gender",
        "admission_type",
        "admission_origin",
        "insurance",
        "num_callouts",
        "num_diagnoses",
        "num_procedures",
        "num_cptevents",
        "num_inputevents",
        "num_labevents",
        "num_microbiologyevents",
        "num_noteevents",
        "num_outputevents",
        "num_procedureevents",
        "num_transfers",
        "num_chartevents",
        "expired",
    }
    if not all(key in patient for key in required_patients_keys):
        return None

    new_patient = {
        "age": find_next_age(),
        "gender": patient['gender'],
        "admission_type": patient['gender'],
        "admission_origin": patient['admission_origin'],
        "insurance": patient['insurance'],
        "num_callouts": patient['num_callouts'],
        "num_diagnoses": patient['num_diagnoses'],
        "num_procedures": patient['num_procedures'],
        "num_cptevents": patient['num_cptevents'],
        "num_inputevents": patient['num_inputevents'],
        "num_labevents": patient['num_labevents'],
        "num_microbiologyevents": patient['num_microbiologyevents'],
        "num_noteevents": patient['num_noteevents'],
        "num_outputevents": patient['num_outputevents'],
        "num_procedureevents": patient['num_procedureevents'],
        "num_transfers": patient['num_transfers'],
        "num_chartevents": patient['num_chartevents'],
        "expired": patient['expired'], 
        }

    return new_patient

def find_next_age():
    pfizer_df = pd.read_csv(os.getcwd() + "/repo/cleaned.csv")
    return int(pfizer_df["age"].max()) + 1

if __name__ == "__main__":
    main()
