# Artificial Intelligence for Business - Case Study 2
# Testing the AI

# Installing Keras
# conda install -c conda-forge keras

# Importing the libraries and the other python files
import os
import numpy as np
import random as rn
from tensorflow.keras.models import load_model
import environment
from mongo_helper import MongoHelper

# Setting seeds for reproducibility
mongo_helper = MongoHelper()
mongo_helper.flush_statistic_data()
mongo_helper.flush_summary_data()

os.environ['PYTHONHASHSEED'] = '0'
np.random.seed(42)
rn.seed(12345)

# SETTING THE PARAMETERS
number_actions = 5
direction_boundary = (number_actions - 1) / 2
temperature_step = 1.5

# BUILDING THE ENVIRONMENT BY SIMPLY CREATING AN OBJECT OF THE ENVIRONMENT CLASS
env = environment.Environment(optimal_temperature = (18.0, 24.0), initial_month = 0, initial_number_users = 20, initial_rate_data = 30)

# LOADING A PRE-TRAINED BRAIN
model = load_model("model.h5")

# CHOOSING THE MODE
train = False

# RUNNING A 1 YEAR SIMULATION IN INFERENCE MODE
env.train = train
current_state, _, _ = env.observe()
month = 30 * 24 * 60
for timestep in range(0, 12 * month):
    month_number = int(timestep / month)
    q_values = model.predict(current_state)
    action = np.argmax(q_values[0])
    if (action - direction_boundary < 0):
        direction = -1
    else:
        direction = 1
    energy_ai = abs(action - direction_boundary) * temperature_step
    next_state, reward, game_over = env.update_env(direction, energy_ai, int(timestep / month))
    current_state = next_state

    if ((timestep+1) % month == 0):
        print("\n")
        print ("Month passed. Month number: {:.0f}".format(month_number))
        statistic_data = env.get_measured_statics()
        mongo_helper.save_statistic_data(statistic_data)
        env.flush_measured_statics()

# PRINTING THE TRAINING RESULTS FOR EACH EPOCH
summary = {
    'total_energy_ai': env.total_energy_ai,
    'total_energy_noai': env.total_energy_noai,
    'energe_saved': ((env.total_energy_noai - env.total_energy_ai) / env.total_energy_noai * 100)
}
mongo_helper.save_summary_data(summary)
print("\n")
print("Total Energy spent with an AI: {:.0f}".format(env.total_energy_ai))
print("Total Energy spent with no AI: {:.0f}".format(env.total_energy_noai))
print("ENERGY SAVED: {:.0f} %".format((env.total_energy_noai - env.total_energy_ai) / env.total_energy_noai * 100))
