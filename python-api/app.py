import os #pathの取得などに使う
import json #何かと使う
from flask import Flask # flaskを使うのに絶対必要
from flask import jsonify # jsonを送るのに使う
from flask import request # queryなどを取得するのに使う
from flask_cors import CORS, cross_origin#crosの設定
from flask_sqlalchemy import SQLAlchemy#databaseを使うために必要