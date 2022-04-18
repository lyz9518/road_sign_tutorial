from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect
from data import *
import uuid
import random
app = Flask(__name__)


quiz_questions = []
user_answers = ['X'] * 10
marked_questions = []

# ROUTES

@app.route('/')
def index():
    return render_template('ud-index.html', title = '')

@app.route('/mode')
def mode():
    return render_template('ud-mode.html', title = 'Select Mode')

@app.route('/quiz/')
def generateQuiz(id = None):
    global quiz_questions
    global user_answers
    global marked_questions
    quiz_questions = data[:]
    quiz_questions = random.sample(data, 10)
    user_answers = ['X'] * 10
    marked_questions = []

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

    return render_template('ud-quiz.html', title = 'Quiz', num = num, question = quiz_questions[num - 1], user_answers = user_answers, marked_questions = marked_questions)


@app.route('/quizresult')
def quizresult():
    return render_template('ud-quiz.html', title = 'Quiz', quiz_questions = quiz_questions, user_answers = user_answers)


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


# Binding
if __name__ == '__main__':
   app.run(debug = True, host="0.0.0.0", port=9999)
