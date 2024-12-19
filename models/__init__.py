from .db import db
from .records import Record

# モデルのリストを定義しておくと、後でまとめて登録しやすくなります
MODELS = [
    Record
]

# データベースの初期化関数
def initialize_database():
    db.connect()
    db.create_tables(MODELS, safe=True)
    db.close()