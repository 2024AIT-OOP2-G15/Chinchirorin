from peewee import Model, CharField, BooleanField, IntegerField
from .db import db

class Record(Model):

    name = CharField()
    isWin = BooleanField()
    pinzoro = IntegerField()
    zorome = IntegerField()
    sigoro = IntegerField()
    normal = IntegerField()
    yakunasi = IntegerField()
    shonben = IntegerField()
    hifumi = IntegerField()

    class Meta:
        database = db