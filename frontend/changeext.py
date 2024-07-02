import os
import sys

def rename_files(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.js'):
                old_path = os.path.join(root, filename)
                new_path = os.path.join(root, filename[:-2] + 'jsx')
                os.rename(old_path, new_path)
                print(f'Renamed: {old_path} -> {new_path}')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python rename_js_to_jsx.py <directory>')
        sys.exit(1)
    
    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f'Error: {directory} is not a valid directory.')
        sys.exit(1)
    
    rename_files(directory)
    print('All .js files renamed to .jsx successfully.')
