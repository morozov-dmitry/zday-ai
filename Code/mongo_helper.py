import pprint
import pymongo
from pymongo import MongoClient
from pymongo import InsertOne
from pymongo.errors import BulkWriteError

class MongoHelper(object):
    """ Helper provide high-level interface for mongodb client. """

    def __init__(self):
        self.client = MongoClient('mongodb://mongo:27017/')
        self.db = self.client['local']
        self.statistic_collection = self.db['statistic_collection']
        self.summary_collection = self.db['summary_collection']

    def save_summary_data(self, data):
        """ Saves summary data to database"""
        self.summary_collection.insert_one(data)

    def save_statistic_data(self, data):
        """ Saves statistic data to database"""
        self.statistic_collection.insert_one(data)

    def flush_summary_data(self):
        """ Saves summary data to database"""
        self.summary_collection.remove()

    def flush_statistic_data(self):
        """ Saves summary data to database"""
        self.statistic_collection.remove()

