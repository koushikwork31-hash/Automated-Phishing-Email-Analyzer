
import os
import shutil

source_dir = "ThePhish-master"
target_dir = "."

if os.path.exists(source_dir):
    for item in os.listdir(source_dir):
        source_item = os.path.join(source_dir, item)
        target_item = os.path.join(target_dir, item)
        
        # Avoid overwriting existing files in target
        if not os.path.exists(target_item):
            print(f"Moving {source_item} to {target_item}")
            shutil.move(source_item, target_item)
        else:
            print(f"Skipping {item}, already exists")
    
    # Remove the now empty source directory
    try:
        os.rmdir(source_dir)
        print(f"Removed empty directory {source_dir}")
    except Exception as e:
        print(f"Couldn't remove directory {source_dir}: {e}")
else:
    print(f"Source directory {source_dir} doesn't exist")
