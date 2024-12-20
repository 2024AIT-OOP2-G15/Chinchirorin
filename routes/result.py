from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
result_bp = Blueprint('result', __name__, url_prefix='/result')
