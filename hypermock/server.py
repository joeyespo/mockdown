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
    extensions = app.config['SUPPORTED_IMAGE_EXTENSIONS']
    relationships_path = app.config['RELATIONSHIPS_PATH']
    available = project_mockups(directory, extensions)
    relationships = project_relationships(relationships_path)
    return render_template('index.html', available=available, relationships=relationships)


@app.route('/mockups/<path:filename>')
def mockups(filename):
    directory = app.config['PROJECT_DIRECTORY']
    if not os.path.exists(safe_join(directory, filename)):
        abort(404)
    
    image = url_for('.images', filename=filename)
    return render_template('mockups.html', image=image)


@app.route('/images/<path:filename>')
def images(filename):
    directory = app.config['PROJECT_DIRECTORY']
    send_file_options = app.config['WORKSPACE_SEND_FILE_OPTIONS']
    return send_from_directory(directory, filename, **send_file_options)
