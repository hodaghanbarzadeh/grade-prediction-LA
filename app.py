from flask import Flask, render_template, flash, request, url_for,jsonify,json
from werkzeug.utils import redirect
from loaddata import loadTrainData 
from predict import prepareML,calcPredict
# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
# app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

x_train,y_train=loadTrainData('dataset_stu','grade')

lr=prepareML('lr',x_train,y_train)

knn=prepareML('knn',x_train,y_train)


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/survey')
def survey():
    return render_template('survey.html')

@app.route('/predict', methods=['POST'])
def predict():
    req_data = request.get_json()
    question =[0 for i in range(16)]
    question[0] =  int(req_data['sex'])
    question[1] =  int(req_data['age'])
    question[2] =  int(req_data['travelTime'])
    question[3] =  int(req_data['studyTime'])
    question[4] =  int(req_data['failures'])
    question[5] =  int(req_data['schoolsup'])
    question[6] =  int(req_data['famsup'])
    question[7] =  int(req_data['paid'])
    question[8] =  int(req_data['activities'])
    question[9] =  int(req_data['higher'])
    question[10] = int(req_data['internet'])
    question[11] = int(req_data['famrel'])
    question[12] = int(req_data['freetime'])
    question[13] = int(req_data['goout'])
    question[14] = int(req_data['health'])
    question[15] = int(req_data['absences'])

    data = {'resultlr':calcPredict(lr,question),'resultknn':calcPredict(knn,question)}
    print(jsonify(data))
    return jsonify(data)
     

if __name__ == "__main__":
    app.run()