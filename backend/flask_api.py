from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS
import time
import os


app = Flask(__name__)
CORS(app)
model = keras.models.load_model('best_model.h5')

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0 
    return img

@app.route('/classify', methods=['POST'])
def classify_image():
    try:
        setofresult = []
        files = request.files.getlist('image')
        if not files:
            return jsonify({"error": "No files uploaded"})


        for num, file in enumerate(files):
            image_path = f'temp_image_{num}.jpg'
            file.save(image_path)
            processed_image = preprocess_image(image_path)
            predictions = model.predict(processed_image)
            predicted_class = np.argmax(predictions)
            class_labels = ["Cracked", "Normal"] 

            result = {
                "class": class_labels[predicted_class],
                "confidence": float(predictions[0][predicted_class])
            }

            setofresult.append(result)
            os.remove(image_path)


        return jsonify(setofresult)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host="0.0.0.0" , debug=True, port=5000)