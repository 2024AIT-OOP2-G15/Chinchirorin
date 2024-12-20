from flask import Blueprint, render_template, request, redirect, url_for

# Blueprintの作成
records_bp = Blueprint('record', __name__, url_prefix='/records')
