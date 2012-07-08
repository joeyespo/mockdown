import os
import posixpath
from flask import url_for


def project_files(directory, extensions):
    """Get a list of files, recursively, for the specified directory and list of extensions."""
    files = []
    for dirname, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            if os.path.splitext(filename)[1] in extensions:
                files.append(os.path.relpath(os.path.join(dirname, filename), directory))
    return files

    
def project_mockups(directory, extensions):
    """Get the mockup objects, recursively, for the specified directory and list of extensions."""
    return map(mockup, project_files(directory, extensions))


def project_relationships(path):
    """Gets the relationships for the project, if it exists; otherwise, None."""
    return read_file(path)


def mockup(path):
    """Initializes a mockup object from the specified file path."""
    unixpath = posixpath.normpath(path)
    return {
        'name': os.path.basename(os.path.splitext(path)[0]).title(),
        'image': url_for('.images', filename=unixpath),
        'url': url_for('.mockups', filename=unixpath),
    }


def read_file(path):
    """Returns the contents of the specified file, if it exists; otherwise, None."""
    if not os.path.exists(path):
        return None
    with open(path) as f:
        return f.read()
