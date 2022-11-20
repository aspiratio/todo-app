import os #pathの取得などに使う
import json #何かと使う
from flask import Flask # flaskを使うのに絶対必要
from flask import jsonify # jsonを送るのに使う
from flask import request # queryなどを取得するのに使う
from flask_cors import CORS, cross_origin #crosの設定
from flask_sqlalchemy import SQLAlchemy #databaseを使うために必要

app = Flask(__name__, instance_relative_config=True) # アプリの作成

@app.route("/")
def hello_world():
		return jsonify("Hello World!")

# 例えば/oumu-gaesi/hello なら say 'hello' を返す
@app.route("/oumu-gaesi/<text>")
def oumu_gaesi(text):
	return jsonify("say '{}'".format(text))
	
if __name__ == '__main__':
	app.run(debug=True, host="0.0.0.0", port=5000)