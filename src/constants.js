const DEBUG = false

const DEFAULT_EXCLUDED_FILES = [
    'node_modules',
    '.idea',
    '.git',
    'package.json',
    'package-lock.json',
    'nsd_app_uploader.json',
    '.gitignore'
]

const DEFAULT_ZIP_PATH = "dist.zip"

const CONFIG_FILE_PATH = 'nsd_app_uploader.json'

const DEFAULT_SOURCE_DIR_PATH = 'dist'

const DEFAULT_SCHEME = 'https'

export {
    DEFAULT_ZIP_PATH,
    DEFAULT_EXCLUDED_FILES,
    CONFIG_FILE_PATH,
    DEFAULT_SOURCE_DIR_PATH,
    DEFAULT_SCHEME,
    DEBUG
}
