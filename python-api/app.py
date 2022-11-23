import os  # pathの取得などに使う
import json  # 何かと使う
from flask import Flask  # flaskを使うのに絶対必要
from flask import jsonify  # jsonを送るのに使う
from flask import request  # queryなどを取得するのに使う
from flask_cors import CORS, cross_origin  # crosの設定
from flask_sqlalchemy import SQLAlchemy  # databaseを使うために必要

basedir = os.path.abspath(os.path.dirname(__file__))  # 実行folderのpathを取得、何かと使う

app = Flask(__name__, instance_relative_config=True)  # アプリの作成

app.config.from_mapping(None)  # アプリの設定  # 今は何も無い

# 本来はCORSというセキュリティ対策のため、'http://127.0.0.1:3000/'からのリクエストを'http://127.0.0.1:5000/'が受けることはできない
# そのため特定のURLとポートを限定して穴あけを行う
# ここではワイルドカードで全て許可しているが、外部に公開するようなWebアプリでこの設定は危険
cors = CORS(app, responses={r"/*": {"origins": "*"}})


@app.route("/get/<id>")
def get_url(id):
    return jsonify({"url": "https://example.com"})


@app.route("/create", methods=["POST"])
@cross_origin()
def create_url():
    return jsonify({"url": "https://exmaple.com"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
