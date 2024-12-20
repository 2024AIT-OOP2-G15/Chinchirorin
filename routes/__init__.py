from .game import game_bp
from .result import result_bp
from .records import records_bp

# Blueprintをリストとしてまとめる
blueprints = [
    game_bp,
    result_bp,
    records_bp
]
