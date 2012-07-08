import os
import posixpath
from flask import url_for


def project_files(directory, extensions):
    files = []
    for dirname, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            if os.path.splitext(filename)[1] in extensions:
                files.append(os.path.relpath(os.path.join(dirname, filename), directory))
    return files

    
def project_mockups(directory, extensions):
    return map(mockup, project_files(directory, extensions))


def mockup(path):
    unixpath = posixpath.normpath(path)
    return {
        'image': url_for('.images', filename=unixpath),
        'url': url_for('.mockups', filename=unixpath),
    }
