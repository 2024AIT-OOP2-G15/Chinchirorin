from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
game_bp = Blueprint('game', __name__, url_prefix='/game')

@game_bp.route('/', methods=['POST'])
def index():
    name = request.form['name']
    return render_template('game.html',name=name)