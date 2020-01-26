import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


def loadDataset(datasetName):
    return pd.read_csv("./static/data/"+datasetName +".csv", engine='python',sep=',')

def loadTrainData(dataset,classifiedField):
#read data



    # add new feature to use it for classification
    grades = dataset[classifiedField].values
    labels = []

    for grade in grades:
        if grade >=17:
            labels.append('very good')
        elif grade < 17 and grade >= 15:
            labels.append('good')
        elif grade < 15 and grade >= 10:
            labels.append('average')
        elif grade < 10:
            labels.append('bad')

    #encoding the data
    enc = LabelEncoder()
    for item in dataset:
        data_raw = dataset[item].values
        dataset[item] = enc.fit_transform(data_raw)

    enc_labels = enc.fit_transform(labels)

    dataset = dataset.values
    #print(df['item'].head())
    #preparing test data
    X_train, X_test, y_train, y_test = train_test_split(dataset[:,:16],enc_labels, stratify=enc_labels,random_state=0,test_size=0.20)
    return (X_train,y_train)
#