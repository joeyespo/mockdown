"""\
Server

Hypermock server to create mockup relationships and add comments.
"""

import os
from flask import Flask, render_template, abort, send_from_directory
from .mockups import graph_mockups, get_mockup


# Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config.from_pyfile('local_config.py', silent=True)


# Views
@app.route('/')
def index():
    graph = graph_mockups(app.config['PROJECT_DIRECTORY'], app.config['RELATIONSHIPS_PATH'], app.config['SUPPORTED_EXTENSIONS'])
    return render_template('index.html', graph=graph)


@app.route('/mockups/<path:filename>')
def mockups(filename):
    if not supported(filename):
        abort(404)
    
    mockup = get_mockup(app.config['PROJECT_DIRECTORY'], app.config['RELATIONSHIPS_PATH'], filename)
    if not mockup.is_existing:
        abort(404)
    
    return render_template('mockups.html', mockup=mockup)


@app.route('/images/<path:filename>')
def images(filename):
    if not supported(filename):
        abort(404)
    
    return send_from_directory(app.config['PROJECT_DIRECTORY'], filename, **app.config['SEND_FILE_OPTIONS'])


# Helpers
def supported(filename):
    return os.path.splitext(filename)[1] in app.config['SUPPORTED_EXTENSIONS']
