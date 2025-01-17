from flask import Blueprint, render_template, request, redirect, url_for, session
from models import Record

# Blueprintの作成
game_bp = Blueprint('game', __name__, url_prefix='/game')

@game_bp.route('/', methods=['POST'])
def index():
    name = request.form['name']
    return render_template('game.html',name=name)

@game_bp.route('/manager', methods=['POST'])
def manager():
    # ここでデータの保存もする
    if request.method == 'POST':
        result = request.get_json()
        data = result.get('data')
        session['data'] = data
        save(data)
        return redirect(url_for('game.result'))

@game_bp.route('/result', methods=["GET"])
def result():
    data = session.get('data')
    return render_template('result.html', result=data)

def save(data:dict):
    yaku = [0,0,0,0,0,0,0]
    playerDice = data['playerDice']
    if(playerDice == "ピンゾロ"):
        yaku[0] = 1
    elif("ゾロ目" in playerDice):
        yaku[1] = 1
    elif(playerDice == "シゴロ"):
        yaku[2] = 1
    elif("の目" in playerDice):
        yaku[3] = 1
    elif(playerDice == "役なし"):
        yaku[4] = 1
    elif(playerDice == "ションベン"):
        yaku[5] = 1
    elif(playerDice == "ヒフミ"):
        yaku[6] = 1
    
    Record.create(name=data['name'],
                  isWin=data['isWin'],
                  playerDice=data['playerDice'],
                  cpuDice=data['cpuDice'],
                  pinzoro=yaku[0],
                  zorome=yaku[1],
                  sigoro=yaku[2],
                  normal=yaku[3],
                  yakunasi=yaku[4],
                  shonben=yaku[5],
                  hifumi=yaku[6])