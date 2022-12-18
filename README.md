# TODO アプリの起動方法（ローカルのみ）

## フロントエンド

todo-app ディレクトリ直下で

```sh
# 本番なら
$ pnpm run start

# 開発中なら
$ pnpm run dev
```

## バックエンド（DB 込み）

python-api ディレクトリに移動

```sh
$ cd python-api
```

venv(仮想環境)に入る

```sh
$ . venv/bin/activate
```

flask を起動する

```sh
# 本番なら
$ FLASK_APP=todo_app.py flask run

# 開発中なら
$ FLASK_APP=todo_app.py flask run --debugger --reload
```
