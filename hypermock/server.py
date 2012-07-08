"""\
Server

Hypermock server to create mockup relationships and add comments.
"""

from flask import Flask, render_template, url_for, send_from_directory
from .util import project_mockups


# Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config.from_pyfile('local_config.py', silent=True)


# Views
@app.route('/')
def index():
    directory = app.config['PROJECT_DIRECTORY']
    mockups = project_mockups(directory)
    return render_template('index.html', mockups=mockups)


@app.route('/')
def mockup():
    # TODO: url_for
    return render_template('mockup.html')


@app.route('/images/<path:filename>')
def images(filename):
    directory = app.config['PROJECT_DIRECTORY']
    send_file_options = app.config.get('WORKSPACE_SEND_FILE_OPTIONS', {})
    return send_from_directory(directory, filename, **send_file_options)
