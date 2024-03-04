import os
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.layers import *
from tensorflow.keras.applications import VGG16
from tensorflow.keras.optimizers import Adam
# from tensorflow.keras.losses import BinaryCrossentropy
# from tensorflow.keras.metrics import BinaryAccuracy
from tensorflow.keras.losses import CategoricalCrossentropy
from tensorflow.keras.metrics import CategoricalAccuracy
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau, EarlyStopping
import warnings
warnings.filterwarnings('ignore')
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
MAIN_PATH = "C:/Users/pvrkm/Programming/TOH/TOH_app/TireTextures/training_data"
TEST_PATH = "C:/Users/pvrkm/Programming/TOH/TOH_app/TireTextures/testing_data"
CLASSES = os.listdir(MAIN_PATH)
NUM_CLASSES = len(CLASSES)
NUM_TEST_IMAGES = len(os.listdir(os.path.join(TEST_PATH,"cracked")))+len(os.listdir(os.path.join(TEST_PATH,"normal")))
HEIGHT,WIDTH = 64,64
BATCH_SIZE = 32
SPLIT = 0.2
# The `train_datagen` object created using `tf.keras.preprocessing.image.ImageDataGenerator` is used
# for data augmentation during training of a neural network model. Here's what each parameter in
# `train_datagen` is doing:
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    validation_split=SPLIT)
'''
    width_shift_range=0.2,
    height_shift_range=0.2,
    '''
# `train_ds = train_datagen.flow_from_directory()` is creating a data generator for training data.
# Here's what each parameter is doing:
train_ds = train_datagen.flow_from_directory(
    MAIN_PATH,
    target_size = (HEIGHT,WIDTH),
    batch_size = BATCH_SIZE,
    subset = "training",
    class_mode = "categorical",
    shuffle = True
)

# `val_ds = train_datagen.flow_from_directory()` is creating a data generator for validation data.
val_ds = train_datagen.flow_from_directory(
    MAIN_PATH,
    target_size = (HEIGHT,WIDTH),
    batch_size = BATCH_SIZE,
    subset = "validation",
    class_mode = "categorical",
    shuffle = True
)

# The line `test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)` is
# creating an image data generator for the testing data. The `rescale=1./255` parameter is used to
# normalize the pixel values of the images in the testing dataset. By dividing each pixel value by
# 255, the pixel values are scaled to be in the range [0, 1], which is a common practice in deep
# learning models to help with convergence and training stability.
test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255)
# The code snippet `test_ds = test_datagen.flow_from_directory(TEST_PATH, target_size=(HEIGHT, WIDTH),
# shuffle=False)` is creating an image data generator for the testing data.
test_ds = test_datagen.flow_from_directory(
    TEST_PATH,
    target_size = (HEIGHT,WIDTH),
    shuffle = False
)
def create_model():
    """
    The function `create_model` builds a neural network model using VGG16 as a base with additional
    layers for classification.
    :return: The function `create_model()` returns a TensorFlow Keras model that consists of a VGG16
    base model with additional layers for classification.
    """
    vgg16 = tf.keras.applications.VGG16(include_top=False, weights='imagenet',input_shape=[HEIGHT,WIDTH, 3])
            
    x = vgg16.output
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.5) (x)
    x = tf.keras.layers.Dense(256) (x)
    x = tf.keras.layers.ReLU() (x)
    x = tf.keras.layers.GaussianDropout(0.5) (x)
    outputs = Dense(NUM_CLASSES, activation="softmax",dtype="float32")(x)
        
    model = tf.keras.Model(inputs=vgg16.input, outputs=outputs)
    return model

model = create_model()
model.summary()
def compile_model(model, lr=0.000001):
    """
    The function `compile_model` compiles a given model with specified optimizer, loss function, and
    metrics for training.
    
    :param model: The `compile_model` function takes a neural network model as input and compiles it
    with specified optimizer, loss function, and metrics for training. The default learning rate is set
    to 0.000001, but you can also specify a different learning rate if needed. The optimizer used is
    Adam,
    :param lr: The `lr` parameter in the `compile_model` function stands for the learning rate, which is
    a hyperparameter that controls the step size during the optimization process of training a neural
    network. It determines how much the model weights are updated during training based on the
    calculated gradient
    :return: The function `compile_model` is returning the compiled model with the specified optimizer,
    loss function, and metrics.
    """
    optimizer = Adam(learning_rate=lr)
    loss = CategoricalCrossentropy()
    metrics = [
       CategoricalAccuracy(name='categorical_accuracy')
    ]
    model.compile(optimizer=optimizer, loss=loss, metrics=metrics)
    return model
model=compile_model(model, lr=0.0001)
def create_callbacks():
    cpk_path = './best_model.h5'
    # The `checkpoint = ModelCheckpoint()` function is creating a callback that will monitor the
    # validation categorical accuracy during the training of the neural network model. Here's a
    # breakdown of the parameters used in this function:
    checkpoint = ModelCheckpoint(
        filepath=cpk_path,
        monitor='val_categorical_accuracy',
        mode='max',
        save_best_only=True,
        verbose=1,
    )
    # The `ReduceLROnPlateau` callback in TensorFlow is used to reduce the learning rate when a metric
    # has stopped improving. Here's a breakdown of the parameters used in this callback:
    reducelr = ReduceLROnPlateau(
        monitor='val_categorical_accuracy',
        mode='max',
        factor=0.2,
        patience=5,
        verbose=1
    )
    # The `EarlyStopping` callback is used to monitor a specified metric during the training of a
    # neural network model and stop the training process early if the metric stops improving. Here's a
    # breakdown of the parameters used in the `EarlyStopping` callback:
    earlystop = EarlyStopping(
        monitor='val_categorical_accuracy',
        mode='max',
        patience=15, 
        verbose=1
    )
    callbacks = [checkpoint, reducelr, earlystop]         
    return callbacks
EPOCHS= 20
VERBOSE =1

# tf.keras.backend.clear_session()

# The code block `with tf.device('/device:CPU:0'):` is specifying that the following operations within
# the block should be executed on the CPU (Central Processing Unit) device with index 0. This can be
# useful when you have multiple devices available (such as GPUs) and you want to explicitly choose to
# run certain operations on a specific device.
with tf.device('/device:CPU:0'):
    model = create_model()
    model = compile_model(model, lr=0.0001)
    callbacks = create_callbacks()
    history = model.fit(train_ds, 
                        epochs=EPOCHS,
                        callbacks=callbacks,
                        validation_data = val_ds,
                        verbose=VERBOSE)
acc = history.history['categorical_accuracy']
val_acc = history.history['val_categorical_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']
epochs_range = range(len(history.history['val_loss']))
plt.figure(figsize=(15, 10))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Categorical Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Categorical Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Categorical Accuracy')
plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()
test_loss, test_accuracy = model.evaluate(test_ds)
print(f"Test Loss: {test_loss}, Test Accuracy: {test_accuracy}")
