import pandas as pd
import os

def main():
    
    figure_1 = admission_type_per_hospitalization()
    figure_2 = gender_per_hospitalization()
    figure_3 = hospitalization_per_admission_origin_per_avg_age()
    figure_4 = admission_origin_per_insurance()
    figure_5 = hospitalization_per_expired_per_age()
    print(
        {
            "plots": {  "figure_1": figure_1,
                        "figure_2": figure_2,
                        "figure_3": figure_3,
                        "figure_4": figure_4,
                        "figure_5": figure_5,
            },
        }
    )
    return {
            
            "plots": {  "figure_1": figure_1,
                        "figure_2": figure_2,
                        "figure_3": figure_3,
                        "figure_4": figure_4,
                        "figure_5": figure_5,
            },
        }

def admission_type_per_hospitalization():  # Pie Chart

    pfizer_df = pd.read_csv(os.getcwd() + "/repo/Data_for_SQL.csv")

    stats_df = pfizer_df.groupby(['admission_type']).agg(
        {'hospitalization': ['count']}
    )
    stat_dict = stats_df.to_dict("index")

    pie_stats = []
    for key, value in stat_dict.items():
        pie_stat = {"admission_type": key, "admission_type_per_hospitalization": 0}
        pie_stat["admission_type_per_hospitalization"] = value[("hospitalization", "count")]
        pie_stats.append(pie_stat)

    return pie_stats

def gender_per_hospitalization():  # Bar_chart

    pfizer_df = pd.read_csv(os.getcwd() + "/repo/Data_for_SQL.csv")

    stats_df = pfizer_df.groupby(["gender"]).agg({"hospitalization": ["count"]})

    stat_dict = stats_df.to_dict("index")

    bar_stats = []
    for key, value in stat_dict.items():
        bar_stat = {
            "gender": key,
            "count_per_gender": 0,
            }
        bar_stat["count_per_gender"] = value[("hospitalization", "count")]
        bar_stats.append(bar_stat)

    return bar_stats

def hospitalization_per_admission_origin_per_avg_age(): # Bar_chart

    pfizer_df = pd.read_csv(os.getcwd() + "/repo/data_for_stats.csv")

    stats_df = pfizer_df.groupby(['hospitalization','admission_origin']).agg(
        {'age': ['mean'], 'hospitalization': ['count']}
    )
    stat_dict = stats_df.to_dict("index")

    stat_dict = stats_df.to_dict("index")

    bar_stats = []
    for key, value in stat_dict.items():
        bar_stat = {"hospitalization_and_admission_origin": " ".join(key), "mean_age": 0}
        bar_stat["mean_age"] = value[("age", "mean")]
        bar_stats.append(bar_stat)

    return bar_stats

def admission_origin_per_insurance():

    pfizer_df = pd.read_csv(os.getcwd() + "/repo/data_for_stats.csv")

    stats_df = pfizer_df.groupby(['admission_origin','insurance']).agg(
        {'admission_origin': ['count']}
    )
    stat_dict = stats_df.to_dict("index")

    bar_stats = []
    for key, value in stat_dict.items():
        bar_stat = {"admission_per_insurance": " ".join(key), "stats": {"count_admission_origin": 0}}
        bar_stat["stats"]["count_admission_origin"] = value[("admission_origin", "count")]
        bar_stats.append(bar_stat)

    return bar_stats

def hospitalization_per_expired_per_age():
    pfizer_df = pd.read_csv(os.getcwd() + "/repo/data_for_stats.csv")

    stats_df = pfizer_df.groupby(['hospitalization','expired']).agg(
        {'age': ['mean','count']}
    )
    stat_dict = stats_df.to_dict("index")

    bar_stats1 = []
    for key, value in stat_dict.items():
        bar_stat1 = {"hospitalization_per_expired": key, "stats": {"mean_age": 0, 'count_age':0}}
        bar_stat1["stats"]["mean_age"] = value[("age", "mean")]
        bar_stat1["stats"]["count_age"] = value[("age", "count")]
        bar_stats1.append(bar_stat1)

    return bar_stats1

if __name__ == "__main__":
    main()
