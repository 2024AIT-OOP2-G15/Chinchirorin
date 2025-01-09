from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
records_bp = Blueprint('records', __name__, url_prefix='/records')

@records_bp.route('/', methods=['GET', 'POST'])
def index():
    # if request.method == 'POST':
    #     name = request.form.get('name')
    #     isWin = 'isWin' in request.form
    #     playerDice = request.form.get('playerDice')
    #     cpuDice = request.form.get('cpuDice')

    # サンプルデータ
    records = [
        {"name": "Player1", "isWin": True, "playerDice": "6, 5, 4", "cpuDice": "4, 3, 2"},
        {"name": "Player2", "isWin": False, "playerDice": "1, 2, 3", "cpuDice": "6, 6, 6"},
        {"name": "Player3", "isWin": True, "playerDice": "3, 3, 3", "cpuDice": "2, 4, 5"}
    ]
    
    return render_template('records.html',records=records)