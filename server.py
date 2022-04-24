from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect
from quiz_data import *
import uuid
import random
import tutorial_data
import time
from datetime import datetime

app = Flask(__name__)


quiz_questions = []
user_answers = ['X'] * 10
marked_questions = []
end_time = 0.0

# data
data = tutorial_data.tutorial
tutorial_collection_id = [1,2,3,40,45,23] # TODO: test purpose for now change it back to empty later
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

@app.route('/intro')
def intro():
    return render_template('ud-intro.html')

@app.route('/quiz/')
def generateQuiz(id = None):
    global quiz_questions
    global user_answers
    global marked_questions
    global end_time

    quiz_questions = random.sample(quiz_data, 10)
    user_answers = ['X'] * 10
    marked_questions = []
    end_time = time.time() + 20 * 60

    return redirect("/quiz/1", code=302)

@app.route('/quiz/<num>')
def quiz(num = None):
    try:
        num = int(num)
    except:
        return redirect("/quiz/1", code=302)

    if quiz_questions == []:
        return redirect("/quiz/", code=302)

    if num < 1 or num > 10:
        return redirect("/quiz/1", code=302)

    return render_template('ud-quiz.html', title = 'Quiz', num = num, question = quiz_questions[num - 1], user_answers = user_answers, marked_questions = marked_questions, end_time = end_time)


@app.route('/quizresult')
def quizresult():
    return render_template('ud-quizResult.html', title = 'Quiz', quiz_questions = quiz_questions, user_answers = user_answers)


@app.route('/mark', methods=['POST'])
def mark():
    global marked_questions

    json_data = request.get_json()

    if json_data['operation'] == 'mark':
        marked_questions.append(int(json_data['num']))
    else:
        marked_questions.remove(int(json_data['num']))

    return jsonify({'status': 200, 'marked_questions': marked_questions})


@app.route('/answer', methods=['POST'])
def answer():
    global user_answers

    json_data = request.get_json()
    user_answers[json_data['num'] - 1] = json_data['answer']

    return jsonify({'status': 200, 'user_answers': user_answers})

@app.route('/learn/<num>')
def learn(num = None):
    try:
        num = int(num)
    except:
        return redirect("/learn/1", code=302)

    if num < 21:
        return render_template('ud-learn.html', info=data["regulatory"][num], num = num)

    return render_template('ud-learn.html', info=data["warning"][num], num = num)

@app.route('/learn/tutorialCollection')
def tutorial_collection():
    '''
        Route for tutorial collection page.
        Data entries are supposed to stored as int value represent the sign id.
    '''
    marked = []
    for id in tutorial_collection_id:
        if id<=20: # regulatory signs
            marked.append(data["regulatory"][id])
        else:   # warning signs
            marked.append(data["warning"][id])

    return render_template('ud-tutorialCollection.html', data=marked)

# Binding
if __name__ == '__main__':
   app.run(debug = True, host="0.0.0.0", port="2022")
