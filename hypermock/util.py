import os
import posixpath
from flask import url_for


def project_files(directory):
    files = []
    for dirname, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            files.append(os.path.relpath(os.path.join(dirname, filename), directory))
    return files

    
def project_mockups(directory):
    return map(mockup, project_files(directory))


def mockup(path):
    unixpath = posixpath.normpath(path)
    return {
        'image': url_for('.images', filename=unixpath),
        'url': url_for('.mockup', filename=unixpath),
    }
