from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
game_bp = Blueprint('game', __name__, url_prefix='/game')
