"""\
Default Config

Do NOT change the values here.
Override them using command-line arguments instead.
"""


HOST = 'localhost'
PORT = 8080
PROJECT_PATH = '.'

SEND_FILE_OPTIONS = { 'cache_timeout': None, 'add_etags': False }

SUPPORTED_IMAGE_EXTENSIONS = [
    '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi',       # JPEG
    '.jp2', '.j2k', '.jpf', '.jpx', '.jpm', '.mj2',         # JPEG 2000
    '.hdp', '.jxr', '.wdp',                                 # JPEG XR
    
    '.gif',                             # Graphics Interchange Format
    '.png',                             # Portable Network Graphics
    '.apng',                            # Animated Portable Network Graphics
    '.mng',                             # Multiple-image Network Graphics
    '.tiff', '.tif',                    # Tagged Image File Format
    '.svg', '.svgz',                    # Scalable Vector Graphics
    '.xbm',                             # X BitMap
    '.bmp', '.dib',                     # Bitmap
    
    # TODO: Server-side support?
    #'.pdf',                            # Portable Document Format
]
