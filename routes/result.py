from flask import Blueprint, render_template

# Blueprintの作成
result_bp = Blueprint('result', __name__, url_prefix='/result')

@result_bp.route('/',methods = ['POST'])
def index():
    # サンプルデータ
    result_data = {
        "name": "Player1",
        "isWin": 0,
        "playerDice": "6, 5, 4",
        "cpuDice": "4, 3, 2"
    }
    return render_template('result.html', result=result_data)
