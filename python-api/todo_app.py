import os  # pathの取得などに使う
import json  # 何かと使う
from flask import Flask  # flaskを使うのに絶対必要
from flask import jsonify  # jsonを送るのに使う
from flask import request  # queryなどを取得するのに使う
from flask_cors import CORS, cross_origin  # crosの設定
from flask_sqlalchemy import SQLAlchemy  # databaseを使うために必要

basedir = os.path.abspath(os.path.dirname(__file__))  # 実行folderのpathを取得、何かと使う

app = Flask(__name__, instance_relative_config=True)  # アプリの作成

app.config.from_mapping(  # アプリの設定
    # DBの位置を指定する
    SQLALCHEMY_DATABASE_URI=os.environ.get("DATABASE_URL")
    or "sqlite:///" + os.path.join(basedir, "todo_app.db"),
    # TrueにするとFlask-SQLAlchemyがデータベースの変更を追跡管理して、シグナルを発生するようになる
    # 指定しないと'None'になる（エラーにはならないが警告が出る）
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

# 本来はCORSというセキュリティ対策のため、'http://127.0.0.1:3000/'からのリクエストを'http://127.0.0.1:5000/'が受けることはできない
# そのため特定のURLとポートを限定して穴あけを行う
# ここではワイルドカードで全て許可しているが、外部に公開するようなWebアプリでこの設定は危険
cors = CORS(app, responses={r"/*": {"origins": "*"}})

# sqlite3のDBの定義
db = SQLAlchemy(app)


class Task(db.Model):
    # テーブル名の定義
    __tablename__ = "tasks"
    # 新しいカラムの作成
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(4096), unique=False, nullable=False)
    status = db.Column(db.String(4096), unique=False, nullable=False)


@app.before_first_request
def init():
    db.create_all()


@app.route("/create", methods=["POST"])
@cross_origin()
def create_task():
    request_body = json.loads(request.data.decode("utf-8"))["body"]
    content = json.loads(request_body)["content"]
    status = json.loads(request_body)["status"]
    task = Task(content=content, status=status)
    db.session.add(task)
    db.session.commit()
    return jsonify({"id": task.id})


@app.route("/update", methods=["POST"])
@cross_origin()
def update_status():
    request_body = json.loads(request.data.decode("utf-8"))["body"]
    id = json.loads(request_body)["id"]
    status = json.loads(request_body)["status"]
    task = Task.query.get(id)
    if not task:
        return
    task.status = status
    db.session.commit()
    return jsonify({"status": "ok"})


@app.route("/delete/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return
    db.session.delete(task)
    db.session.commit()
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    # DBのversion管理をしなくて良いように(スキーマとかを簡単にいじれるように)変更を加えるたびにdbをdropして作り直すようにする
    with app.app_context():
        db.drop_all()
        db.create_all()
        db.session.commit()
    app.run(debug=True, host="0.0.0.0", port=5000)
