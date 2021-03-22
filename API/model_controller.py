import numpy as np
from flask import Blueprint, jsonify, abort, request
import model_service
import joblib
import pandas as pd

api = Blueprint(
    name="models_controller",
    import_name="models_controller",
    url_prefix="/Mimic/model/",
)


@api.route("/", methods=["POST"])
def models():
    new_patient = request.get_json()
    age = new_patient["age"]
    if age < 1:
        age_new = 1
    elif age >= 1 and age < 35:
        age_new = 2
    elif age >= 35 and age < 65:
        age_new = 3
    else:
        age_new = 4
        
    gender = new_patient["gender"]
    if gender == "MALE":
        gender_new = 0
    else:
        gender_new = 1

    admission_type = new_patient["admission_type"]
    if admission_type == "EMERGENCY":
        admission_type_new = 0
    elif admission_type == "NEWBORN":
        admission_type_new = 1
    elif admission_type == "ELECTIVE":
        admission_type_new = 2
    else:
        admission_type_new = 3

    admission_origin = new_patient["admission_origin"]
    if admission_origin == "EMERGENCY ROOM ADMISSION":
        admission_origin_new = 0
    elif admission_origin == "PHYSICAL REFERRAL":
        admission_origin_new = 1
    elif admission_origin == "CLINIC REFERRAL":
        admission_origin_new = 2
    else:
        admission_origin_new = 3

    insurance = new_patient["insurance"]
    if insurance == "MEDICARE":
        insurance_new = 0
    elif insurance == "PRIVATE":
        insurance_new = 1
    elif insurance == "MEDICAID":
        insurance_new = 2
    elif insurance == "GOVERNMENT":
        insurance_new = 3
    else:
        insurance_new = 4

    num_callouts = new_patient["num_callouts"]
    num_diagnoses = new_patient["num_diagnoses"]
    num_procedures = new_patient["num_procedures"]
    num_cptevents = new_patient["num_cptevents"]
    num_inputevents = new_patient["num_inputevents"]
    num_labevents = new_patient["num_labevents"]
    num_microbiologyevents = new_patient["num_microbiologyevents"]
    num_noteevents = new_patient["num_noteevents"]
    num_outputevents = new_patient["num_outputevents"]
    num_procedureevents = new_patient["num_procedureevents"]
    num_transfers = new_patient["num_transfers"]
    num_chartevents = new_patient["num_chartevents"]
    expired = new_patient["expired"]

    df = pd.DataFrame(
        [
            [
                age_new,
                gender_new,
                admission_type_new,
                admission_origin_new,
                insurance_new,
                num_callouts,
                num_diagnoses,
                num_procedures,
                num_cptevents,
                num_inputevents,
                num_labevents,
                num_microbiologyevents,
                num_noteevents,
                num_outputevents,
                num_procedureevents,
                num_transfers,
                num_chartevents,
                expired,
            ]
        ]
    )

    model = joblib.load("pred.model")
    prediction = model.predict(df)
    result = model_service.save(new_patient)
    if not result:
        abort(500)
    return jsonify({"patient_info": {"gender": gender, "age": age, "admission_type": admission_type, "admission_origin"
    : admission_origin, "insurance": insurance},"prediction": "".join(prediction.tolist())}), 201
