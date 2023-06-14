from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import cross_origin

app = Flask(__name__)

app.app_context().push()

###Creating Database for Diary App Function##########################

#creating table class for diary use case of daily bread app
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/daily_bread_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#use Marshmallow to serialize app
ma = Marshmallow(app)

#creating database table for App-config
class Appconfig(db.Model):
    appconfig_id = db.Column(db.Integer, primary_key=True)
    appconfig_set_date = db.Column(db.DateTime, default = datetime.datetime.now)
    appconfig_weight = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    appconfig_bp = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    appconfig_steps = db.Column(db.Integer)
    
    def __init__(self,appconfig_weight,appconfig_bp,appconfig_steps):
        self.appconfig_weight = appconfig_weight
        self.appconfig_bp = appconfig_bp
        self.appconfig_steps = appconfig_steps

class AppconfigSchema(ma.Schema):
    class Meta:
        fields = ('appconfig_id','appconfig_set_date','appconfig_weight','appconfig_bp','appconfig_steps')

appconfig_schema = AppconfigSchema()
appconfigs_schema = AppconfigSchema(many=True)


@app.route('/appconfigure/get', methods = ['GET'])
@cross_origin()
def get_appconfig_entry():
    all_appconfig_entries = Appconfig.query.all()
    res = appconfigs_schema.dump(all_appconfig_entries)
    return jsonify(res)

@app.route('/appconfigure/add', methods = ['POST'])
@cross_origin()
def add_appconfig_entry():
    appconfig_weight = request.json['appconfig_weight']
    appconfig_bp = request.json['appconfig_bp']
    appconfig_steps = request.json['appconfig_steps']
    
    appconfig = Appconfig(appconfig_weight, appconfig_bp, appconfig_steps)
    db.session.add(appconfig)
    db.session.commit()

    return appconfig_schema.jsonify(appconfig)


#creating database table for Diary
class Diary(db.Model):
    diary_title = db.Column(db.String(100), primary_key=True)
    diary_date = db.Column(db.DateTime, default = datetime.datetime.now)
    diary_entry = db.Column(db.Text())

    def __init__(self,diary_title,diary_entry):
        self.diary_title = diary_title
        self.diary_entry = diary_entry

class DiarySchema(ma.Schema):
    class Meta:
        fields = ('diary_title','diary_entry','diary_date')

diary_schema = DiarySchema()
diaries_schema = DiarySchema(many=True)


@app.route('/diary/get', methods = ['GET'])
@cross_origin()
def get_diary_entry():
    all_diary_entries = Diary.query.all()
    res = diaries_schema.dump(all_diary_entries)
    return jsonify(res)

@app.route('/diary/get/<diary_title>', methods = ['GET'])
def get_diary_with_title(diary_title):
    diary_entry_id = Diary.query.get(diary_title)
    return diary_schema.jsonify(diary_entry_id)

@app.route('/diary/add', methods = ['POST'])
@cross_origin()
def add_diary_entry():
    diary_title = request.json['diary_title']
    diary_entry = request.json['diary_entry']
   
    diary = Diary(diary_title, diary_entry)
    db.session.add(diary)
    db.session.commit()
    return diary_schema.jsonify(diary)

@app.route('/diary/update/<diary_title>/', methods = ['PUT'])
@cross_origin()
def update_diary(diary_title):
    diary = Diary.query.get(diary_title)

    diary_title = request.json['diary_title']
    diary_entry = request.json['diary_entry']
 
    diary.diary_title = diary_title
    diary.diary_entry = diary_entry
    
    db.session.commit()
    return diary_schema.jsonify(diary)

@app.route('/diary/delete/<diary_title>/', methods = ['DELETE'])
@cross_origin()
def delete_diary(diary_title):
    diary = Diary.query.get(diary_title)
    db.session.delete(diary)
    db.session.commit()
    return diary_schema.jsonify(diary)


###Creating Database for Reminder App Function##########################
class Reminder(db.Model):
    reminder_title = db.Column(db.String(100), primary_key=True)
    reminder_entry = db.Column(db.String(100))
    reminder_due_date = db.Column(db.String(100))
    reminder_due_time = db.Column(db.String(100))
    reminder_entry_date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self,reminder_title,reminder_entry,reminder_due_date,reminder_due_time):
        self.reminder_title = reminder_title
        self.reminder_entry = reminder_entry
        self.reminder_due_date = reminder_due_date
        self.reminder_due_time = reminder_due_time

class ReminderSchema(ma.Schema):
    class Meta:
        fields = ('reminder_title','reminder_entry','reminder_entry_date','reminder_due_date','reminder_due_time')

reminder_schema = ReminderSchema()
reminders_schema = ReminderSchema(many=True)


@app.route('/reminder/get', methods = ['GET'])
@cross_origin()
def get_reminder():
    all_reminder_entries = Reminder.query.all()
    res = reminders_schema.dump(all_reminder_entries)
    return jsonify(res)

@app.route('/reminder/get/<reminder_title>', methods = ['GET'])
def get_reminder_entries(reminder_title):
    reminder_entry_id = Reminder.query.get(reminder_title)
    return reminder_schema.jsonify(reminder_entry_id)

@app.route('/reminder/add', methods = ['POST'])
@cross_origin()
def add_reminder_entry():
    reminder_title = request.json['reminder_title']
    reminder_entry = request.json['reminder_entry']
    reminder_due_date = request.json['reminder_due_date']
    reminder_due_time = request.json['reminder_due_time']
   
    reminder = Reminder(reminder_title,reminder_entry,reminder_due_date,reminder_due_time)
    db.session.add(reminder)
    db.session.commit()
    return reminder_schema.jsonify(reminder)

@app.route('/reminder/update/<reminder_title>/', methods = ['PUT'])
@cross_origin()
def update_reminder(reminder_title):
    reminder = Reminder.query.get(reminder_title)

    reminder_title = request.json['reminder_title']
    reminder_entry = request.json['reminder_entry']
    reminder_due_date = request.json['reminder_due_date']
    reminder_due_time = request.json['reminder_due_time']
 
    reminder.reminder_entry_time = reminder_title
    reminder.reminder_entry = reminder_entry
    reminder.reminder_due_date = reminder_due_date
    reminder.reminder_due_time = reminder_due_time
  
    db.session.commit()
    return reminder_schema.jsonify(reminder)

@app.route('/reminder/delete/<reminder_title>/', methods = ['DELETE'])
@cross_origin()
def delete_reminder(reminder_title):
    reminder = Reminder.query.get(reminder_title)
    db.session.delete(reminder)
    db.session.commit()
    return diary_schema.jsonify(reminder)

###Creating Database for Fitness App Function##########################
class Fitness(db.Model):
    fitness_id = db.Column(db.Integer, primary_key=True)
    fitness_entry_date = db.Column(db.DateTime,default = datetime.datetime.now)
    fitness_weight = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    fitness_bp = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    fitness_steps = db.Column(db.Integer)
  
    def __init__(self,fitness_weight,fitness_bp,fitness_steps):
        self.fitness_weight = fitness_weight
        self.fitness_bp = fitness_bp
        self.fitness_steps = fitness_steps

class FitnessSchema(ma.Schema):
    class Meta:
        fields = ('fitness_id','fitness_entry_date','fitness_weight','fitness_bp','fitness_steps')

fitness_schema = FitnessSchema()
fitness_schemas = FitnessSchema(many=True)


@app.route('/fitness/get', methods = ['GET'])
@cross_origin()
def get_fitness():
    all_fitness_entries = Fitness.query.all()
    res = fitness_schemas.dump(all_fitness_entries)
    return jsonify(res)

@app.route('/fitness/add', methods = ['POST'])
@cross_origin()
def add_fitness_entry():
    fitness_weight = request.json['fitness_weight']
    fitness_bp = request.json['fitness_bp']
    fitness_steps = request.json['fitness_steps']
   
    fitness = Fitness(fitness_weight,fitness_bp,fitness_steps)
    db.session.add(fitness)
    db.session.commit()
    return fitness_schema.jsonify(fitness)

if __name__=="__main__":
    db.create_all()
    app.run(host = "localhost",port=3000,debug=True)
