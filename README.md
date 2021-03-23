# Mimic III Full Stack application
This is a full stack application, that contains Back-End (w/ Flash), Front-End (w/ React), as well Data Science and Machine Learning (w/ Python) for MIMIC-III dataset. The goal of this application is to correlate the patients' interactions with the duration of their hospitalization.

# - Dataset knowledge

The first thing that a Data Scientist must do is to check and find the right dataset. It is so critical to every project, that without a good Dataset, or without having the knowledge of the features inside, you will not be able to do anything! 

It is like you are a chef and you are using low quality products or you are using Saffron and you don't even know what this is!

So, the first thing you have to do is to understand your **dataset**.

## - What is Mimic-III dataset?

**MIMIC-III** (Medical Information Mart for Intensive Care) is a large, single-center database comprising information relating to patients admitted to critical care units at a large tertiary care hospital. It includes vital signs, medications, laboratory measurements, observations and notes charted by health care providers (HCPs), fluid balance, procedure codes, diagnostic codes (Each record in the dataset includes ICD-9 codes) and more. The original MIMIC-III dataset consists of 28 tables with millions of entries.

***Note:*** This dataset contains nearly 50,000 hospital admissions, including the duration of their hospitalization.

You can learn for about this dataset here: https://mimic.physionet.org/

Also, here are the steps of how to get access to MIMIC III: https://towardsdatascience.com/getting-access-to-mimic-iii-hospital-database-for-data-science-projects-791813feb735

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Now that we know some things about this dataset, I think it is a great idea to analyze it.

# 1. Exploratory Data Analysis (EDA) & Machine Learning (w/ iPython)

EDA helps to bring out points from datasets that may not be analyzed by standard data science algorithms. It helps in better data understanding and it is known for capturing and analyzing uncommon data patterns that will be skipped by typical machine learning algorithms.

You can find the EDA & Modeling here: https://github.com/StamKavid/Mimic_III_full_stack_application/blob/main/DataScience_part/Data_Science_part.ipynb

***Note:*** This was one of my first projects, so I kept the Data Scince & Machine Learning algorithm as it was. Of course, there can be a lot of enchancements.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2. Back end (w/ Flask)

I used REST API architecture. A REST API is an application programming interface (API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services.

***Controller & Service Logic***

- **Controller** is used to orchestrate the work.
- **Service** is used to execute the work

Separating like this becomes a powerful tool for code reuse and code organization. 

I provided to endpoints:

- **/stats**: Provide meaningful aggregations based on the data set. (like histogram, pie chart etc.)

![image](https://user-images.githubusercontent.com/69797374/112065055-ad96c480-8b6c-11eb-9bb2-50bd92f619b0.png)

- **/models**: This endpoint should accept the data for an individual patient, in the format of the original file and return the predicted duration of hospitalization for that patient.

**Request**

![image](https://user-images.githubusercontent.com/69797374/112065125-cdc68380-8b6c-11eb-91c4-515b894dc6ca.png)

**Response**

![image](https://user-images.githubusercontent.com/69797374/112065150-d5862800-8b6c-11eb-9f28-f40841e627e1.png)

For the modeling part, I used Joblib to keep the model [save & load], which is a set of tools to provide lightweight pipelining in Python.

You can find all the code of the Back end here: https://github.com/StamKavid/Mimic_III_full_stack_application/tree/main/API

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 3. Front end (w/ React)

React. js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. 

For the web app I created the layout with Bootstrap and I created to routes: 

- One for the modeling part **/models** 
- One for the visualization part, that containts some statistics **/stats**

![image](https://user-images.githubusercontent.com/69797374/112065227-f6e71400-8b6c-11eb-8ca4-502df6862401.png)

You can find all the code of the Front end here: https://github.com/StamKavid/Mimic_III_full_stack_application/tree/main/Web_app

