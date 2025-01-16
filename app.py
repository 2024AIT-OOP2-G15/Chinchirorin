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
    pinzoro_total = 0;
    zorome_total = 0
    sigoro_total = 0
    normal_total = 0
    yakunasi_total = 0
    shonben_total = 0
    hifumi_total = 0

    # 必要なフィールドだけを持つデータのリストを作成
    records_data = [
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
    
    for record in records_data:
        if record["pinzoro"] == 1:
            pinzoro_total += 1
        if record["zorome"] == 1:
            zorome_total += 1
        if record["sigoro"] == 1:
            sigoro_total += 1
        if record["normal"] == 1:
            normal_total += 1
        if record["yakunasi"] == 1:
            yakunasi_total += 1
        if record["shonben"] == 1:
            shonben_total += 1
        if record["hifumi"] == 1:
            hifumi_total += 1

    records = [
        {
            "pinzoro": pinzoro_total,
            "zorome": zorome_total,
            "sigoro": sigoro_total,
            "normal": normal_total,
            "yakunasi": yakunasi_total,
            "shonben": shonben_total,
            "hifumi": hifumi_total
        }
    ]
    # テンプレートにデータを渡す
    return render_template('title.html', records=records)

if __name__ == '__main__':
    app.run(port=8800,debug=True)