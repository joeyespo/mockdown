import os


try:
    import simplejson as json
except ImportError:
    import json


def list_files(directory, extensions):
    """Get a list of files, recursively, for the specified directory and list of extensions."""
    files = []
    for dirname, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            if os.path.splitext(filename)[1] in extensions:
                files.append(os.path.relpath(os.path.join(dirname, filename), directory))
    return files


def read_json(path):
    """Returns the contents of the specified file, if it exists; otherwise, None."""
    if not os.path.exists(path):
        return None
    with open(path) as f:
        return json.load(f)
