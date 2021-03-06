import os
import posixpath
from flask import url_for
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
        self.mockups = relationships + unlisted
    
    def __repr__(self):
        return '<MockupGraph: %s mockups at %s>' % (len(self.mockups), os.path.relpath(self.project_directory, '.'))


class Mockup(object):
    def __init__(self, project_directory, path, is_default=False):
        relative_path = os.path.relpath(path, project_directory)
        urlpath = relative_path.replace(os.sep, posixpath.sep)
        self.project_directory = project_directory
        self.path = path
        self.is_existing = os.path.exists(path)
        self.is_default = is_default
        self.name = os.path.basename(os.path.splitext(path)[0]).title()
        self.image = url_for('.images', filename=urlpath)
        self.url = url_for('.mockups', filename=urlpath)
    
    def __repr__(self):
        return '<Mockup: %s%s>' % (repr(self.path), ' (default)' if self.is_default else '')


def graph_mockups(project_directory, relationships_filename, supported_extensions):
    """Loads the mockup graph from the specified project directory and relationships file."""
    relationships = load_relationship_mockups(relationships_filename, project_directory)
    unlisted = load_unlisted_files(relationships, project_directory, supported_extensions)
    return MockupGraph(project_directory, relationships_filename, supported_extensions, relationships, unlisted)


def get_mockup(project_directory, relationships_filename, mockup_filename):
    """Loads a mockup from the specifide relative path."""
    relationships = load_relationship_mockups(relationships_filename, project_directory)
    path = os.path.join(project_directory, os.path.normpath(mockup_filename))
    mockup = mockup_from_path(relationships, path)
    return mockup if mockup else Mockup(project_directory, path)


def load_relationship_mockups(filename, project_directory):
    """Returns a list of Mockups from the specified file."""
    try:
        with open(filename) as f:
            data = json.load(f)
    except IOError, e:
        # TODO: report error
        print 'Error reading ' + os.path.basename(filename) + ':', e, '-- skipping'
        return {}
    except ValueError, e:
        # TODO: report error
        print 'Error reading ' + os.path.basename(filename) + ':', e, '-- skipping'
        return {}
    
    try:
        filenames = data['mockups']
    except KeyError, e:
        print 'Warning loading ' + os.path.basename(filename) + ': no "mockups" entry found -- skipping file'
        return {}
    
    default = None
    if 'default' in data:
        if isinstance(data['default'], basestring):
            default = os.path.normpath(os.path.join(project_directory, data['default']))
        else:
            print 'Warning loading ' + os.path.basename(filename) + ': "default" entry is not a string -- skipping'
    
    mockups = []
    for filename in filenames:
        if not isinstance(filename, basestring):
            print 'Warning: mockup item is not an object -- skipping'
            continue
        path = os.path.normpath(os.path.join(project_directory, filename))
        mockups.append(Mockup(project_directory, path, default == path))
    return mockups


def load_unlisted_files(mockups, project_directory, supported_extensions):
    """Returns the Mockups from the specified list of files that are not listed."""
    paths = []
    for dirname, dirnames, filenames in os.walk(project_directory):
        paths += (os.path.join(dirname, filename) for filename in filenames if os.path.splitext(filename)[1] in supported_extensions)
    listed = [mockup.path for mockup in mockups]
    return [Mockup(project_directory, path) for path in paths if path not in listed]


def mockup_from_path(relationships, path):
    """Gets the associated Mockup with the specified normalized path from the relationships."""
    for mockup in relationships:
        if mockup.path == path:
            return mockup
    return None
