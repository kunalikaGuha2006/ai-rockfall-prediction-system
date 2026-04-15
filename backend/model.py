import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

data = pd.read_csv("dataset.csv")

# Convert vibration to number
data["Vibration_Level"] = data["Vibration_Level"].map({
    "Low":0,
    "Medium":1,
    "High":2
})

data["Risk_Level"] = data["Risk_Level"].map({
    "Low":0,
    "Medium":1,
    "High":2
})

X = data[["Elevation_m","Slope_deg","Rainfall_mm_hr","Soil_Stability","Vibration_Level"]]
y = data["Risk_Level"]

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)

model = RandomForestClassifier()

model.fit(X_train,y_train)

def predict_risk(elevation,slope,rainfall,soil,vibration):

    vibration_map = {"Low":0,"Medium":1,"High":2}

    pred = model.predict([[elevation,slope,rainfall,soil,vibration_map[vibration]]])[0]

    result_map = {0:"Low",1:"Medium",2:"High"}

    return result_map[pred]