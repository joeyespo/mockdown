"""\
Server

Hypermock server to create mockup relationships and add comments.
"""

from flask import Flask, render_template, url_for, send_from_directory


# Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config.from_pyfile('local_config.py', silent=True)


# Views
@app.route('/')
def index():
    return render_template('index.html')
