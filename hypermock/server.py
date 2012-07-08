"""\
Server

Hypermock server to create mockup relationships and add comments.
"""

import os
from flask import Flask, render_template, url_for, abort, safe_join, send_from_directory
from .util import project_mockups, project_relationships


# Flask application
app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config.from_pyfile('local_config.py', silent=True)


# Views
@app.route('/')
def index():
    directory = app.config['PROJECT_DIRECTORY']
    extensions = app.config['SUPPORTED_EXTENSIONS']
    relationships_path = app.config['RELATIONSHIPS_PATH']
    available = project_mockups(directory, extensions)
    relationships = project_relationships(relationships_path)
    return render_template('index.html', available=available, relationships=relationships)


@app.route('/mockups/<path:filename>')
def mockups(filename):
    if not supported(filename) or not exists(filename):
        abort(404)
    return render_template('mockups.html', image=url_for('.images', filename=filename))


@app.route('/images/<path:filename>')
def images(filename):
    if not supported(filename):
        abort(404)
    return send_from_directory(app.config['PROJECT_DIRECTORY'], filename, **app.config['SEND_FILE_OPTIONS'])


# Helpers
def supported(filename):
    return os.path.splitext(filename)[1] in app.config['SUPPORTED_EXTENSIONS']


def exists(filename):
    return os.path.exists(safe_join(app.config['PROJECT_DIRECTORY'], filename))
