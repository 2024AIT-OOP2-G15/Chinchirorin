from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
records_bp = Blueprint('records', __name__, url_prefix='/records')

@records_bp.route('/')
def index():
    render_template('records.html')