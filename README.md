# 🏠 NYC House Types Prediction

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?logo=fastapi)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-orange?logo=scikitlearn)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)

An end-to-end Machine Learning web application that predicts the **type of an Airbnb listing** in New York City using a **Random Forest Classifier**.

---

## 🚀 Live Demo

**Frontend:** https://nyc-house-types-prediction.onrender.com

---

## ✨ Features

- Predict Airbnb house type instantly
- Modern responsive UI
- Real-time prediction using FastAPI
- Interactive confidence gauge
- Color-coded probability bars
- Displays prediction confidence
- Raw JSON response viewer
- REST API integration
- Deployed on Render

---

## 🧠 Machine Learning Model

- **Algorithm:** Random Forest Classifier
- **Problem Type:** Multi-Class Classification
- **Classes**
  - Entire home/apt
  - Private room
  - Shared room

---

## 📊 Dataset

**Dataset:** NYC Airbnb Open Data

### Features Used

- Latitude
- Longitude
- Neighbourhood Group
- Neighbourhood
- Price
- Minimum Nights
- Number of Reviews
- Reviews Per Month
- Host Listing Count
- Availability 365

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- FastAPI
- Python

### Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib

### Deployment

- Render

---

## 📁 Project Structure

```
NYC_House_Types-Prediction/
│
├── Frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── dataset/
│   └── AB_NYC_2019.csv
│
├── model/
│   └── Model_Pipeline.pkl
│
├── notebook/
│   └── nyc_airbnb_room_type.ipynb
│
├── main.py
├── requirements.txt
├── .python-version
├── README.md
└── __pycache__/

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/JayDhandhukiya14/NYC_House_Types-Prediction.git

cd NYC_House_Types-Prediction
```

---

### Backend

```bash
pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

### Frontend

Open

```
cd Frontend
```

or use

```
open index.html using Live Server.
```

---

## 📡 API Endpoint

### POST

```
/predict
```

### Sample Request

```json
{
  "latitude": 40.7484,
  "longitude": -73.9857,
  "neighbourhood_group": "Brooklyn",
  "neighbourhood": "Williamsburg",
  "price": 150,
  "minimum_nights": 3,
  "number_of_reviews": 24,
  "reviews_per_month": 1.2,
  "calculated_host_listings_count": 1,
  "availability_365": 180
}
```

### Sample Response

```json
{
  "prediction": "Entire home/apt",
  "probability": [
    0.816,
    0.149,
    0.035
  ]
}
```

---

## 📈 Model Output

Example Prediction

```
Prediction

Entire home/apt

Confidence

82%

Probability

Entire home/apt 82%
Private room    15%
Shared room      4%
```

---

## 🎯 Future Improvements

- Google Maps Integration
- Batch Predictions
- SHAP Explainability
- User Authentication
- Prediction History
- Model Monitoring
- Dark / Light Theme
- Docker Deployment

---

## 👨‍💻 Author

**Jay Dhandhukiya**

Data Analyst | Data Science Enthusiast

GitHub

https://github.com/JayDhandhukiya14

LinkedIn

https://www.linkedin.com/in/jay-dhandhukiya

Email

jayddd2006@gmail.com

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
