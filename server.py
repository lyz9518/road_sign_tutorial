from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect
from data import *
import uuid
import random
app = Flask(__name__)


quiz_questions = []

# ROUTES

@app.route('/')
def index():
    return render_template('ud-index.html', title = '')

@app.route('/mode')
def mode():
    return render_template('ud-mode.html', title = 'Select Mode')

@app.route('/selectChapter')
def select():
    return render_template('ud-selectChapter.html')

@app.route('/quiz/')
def generateQuiz(id = None):
    global quiz_questions
    quiz_questions = data[:]
    quiz_questions = random.sample(data, 20)

    return redirect("/quiz/1", code=302)

@app.route('/quiz/<num>')
def quiz(num = None):
    try:
        num = int(num)
    except:
        return redirect("/quiz/1", code=302)

    if quiz_questions == []:
        return redirect("/quiz/", code=302)

    return render_template('ud-quiz.html', question = quiz_questions[num - 1], num = num, title = 'Quiz')


# Binding
if __name__ == '__main__':
   app.run(debug = True, host="0.0.0.0", port="2022")
