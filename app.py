from flask import Flask, render_template
from models import initialize_database, Record
from routes import blueprints

app = Flask(__name__)

# データベースの初期化
initialize_database()

# 各Blueprintをアプリケーションに登録
for blueprint in blueprints:
    app.register_blueprint(blueprint)

# ホームページのルート
@app.route('/')
def index():
    # データベースからすべてのレコードを取得
    record_list = Record.select()
    
    # 必要なフィールドだけを持つデータのリストを作成
    records = [
        {
            "pinzoro": record.pinzoro,
            "zorome": record.zorome,
            "sigoro": record.sigoro,
            "normal": record.normal,
            "yakunasi": record.yakunasi,
            "shonben": record.shonben,
            "hifumi": record.hifumi
        }
        for record in record_list
    ]
    
    # テンプレートにデータを渡す
    return render_template('title.html', records=records)

if __name__ == '__main__':
    app.run(port=8800,debug=True)