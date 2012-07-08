import os
import posixpath
from flask import url_for
from .util import list_files, read_file

try:
    import simplejson as json
except ImportError:
    import json


class MockupGraph(object):
    def __init__(self, project_directory, relationships_filename, supported_extensions, relationships, unlisted):
        self.project_directory = project_directory
        self.relationships_filename = relationships_filename
        self.supported_extensions = supported_extensions
        self.relationships = relationships
        self.unlisted = unlisted


class Mockup(object):
    def __init__(self, path):
        urlpath = posixpath.normpath(path)
        self.path = path
        self.name = os.path.basename(os.path.splitext(path)[0]).title()
        self.image = url_for('.images', filename=urlpath)
        self.url = url_for('.mockups', filename=urlpath)
        self.is_existing = False
        self.is_listed = False
        self.is_default = False


def graph_mockups(project_directory, relationships_filename, supported_extensions):
    """Loads the mockup graph from the specified project directory and relationships file."""
    files = list_files(project_directory, supported_extensions)
    
    # TODO: read relationships with json.loads file and create the graph
    
    relationships = []
    unlisted = map(Mockup, files)
    return MockupGraph(project_directory, relationships_filename, supported_extensions, relationships, unlisted)
