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
    """
    The `preprocess_image` function takes an image file path, resizes it to 64x64 pixels, converts it to
    a NumPy array, normalizes the pixel values, and returns the preprocessed image.
    
    :param image_path: The `image_path` parameter is a string that represents the file path to the image
    that you want to preprocess. This function loads the image from the specified path, resizes it to a
    target size of 64x64 pixels, converts it to a NumPy array, expands its dimensions to include
    :return: The function preprocess_image is returning a preprocessed image in the form of a NumPy
    array with shape (1, 64, 64, 3) where the image has been resized to 64x64 pixels, converted to an
    array, expanded dimensions to include batch size, and normalized by dividing by 255.0.
    """
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

# The code snippet you provided is part of a Flask API endpoint `/classify` that handles image
# classification. Here's what the code is doing:

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