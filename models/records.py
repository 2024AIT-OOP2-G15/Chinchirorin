from peewee import Model, CharField, BooleanField, IntegerField
from .db import db

class Record(Model):

    # 戦績画面用
    name = CharField()
    isWin = IntegerField()
    playerDice = CharField()
    cpuDice = CharField()

    # タイトルの戦績一覧用
    pinzoro = IntegerField()
    zorome = IntegerField()
    sigoro = IntegerField()
    normal = IntegerField()
    yakunasi = IntegerField()
    shonben = IntegerField()
    hifumi = IntegerField()

    class Meta:
        database = db