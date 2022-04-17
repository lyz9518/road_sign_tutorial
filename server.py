from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect
import uuid
app = Flask(__name__)


# ROUTES

@app.route('/')
def index():
    return render_template('ud-index.html', title = '')

@app.route('/mode')
def mode():
    return render_template('ud-mode.html', title = 'Select Mode')

# Binding
if __name__ == '__main__':
   app.run(debug = True, host="0.0.0.0")
