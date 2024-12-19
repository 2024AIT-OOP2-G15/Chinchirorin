from peewee import Model, CharField, IntegerField
from .db import db

class Record(Model):

    name = CharField()
    pinzoro = IntegerField()
    zorome = IntegerField()
    sigoro = IntegerField()
    normal = IntegerField()
    yakunasi = IntegerField()
    shonben = IntegerField()
    hifumi = IntegerField()

    class Meta:
        database = db