import os
import sys
from .server import app


def main():
    """The application command-line entry point."""
    
    # Get contextual information
    project_directory = os.path.abspath(os.path.normpath('.'))
    relationships_filename = 'relationships.json'
    
    # Set default config values
    app.config.setdefault('PROJECT_DIRECTORY', project_directory)
    app.config.setdefault('WORKSPACE_SEND_FILE_OPTIONS', {})
    app.config.setdefault('SUPPORTED_IMAGE_EXTENSIONS', [])
    app.config.setdefault('RELATIONSHIPS_FILENAME', relationships_filename)
    
    # Set dependent default config values
    relationships_path = os.path.join(app.config['PROJECT_DIRECTORY'], app.config['RELATIONSHIPS_FILENAME'])
    app.config.setdefault('RELATIONSHIPS_PATH', relationships_path)
    
    # TODO: command-line processing
    
    args = sys.argv[1:]
    port = int(args[0]) if len(args) > 0 else None
    
    # Set overridden config values
    if port is not None:
        app.config['PORT'] = port
    
    # Run the server, using the specified workspace path
    app.run(app.config['HOST'], app.config['PORT'], debug=True, use_reloader=app.config['DEBUG_MOCKDOWN'])
