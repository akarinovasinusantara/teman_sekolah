import os
import shutil
from pathlib import Path

def main():
    base_dir = Path(r"d:\Project\Teman_Sekolah\frontend\src")
    
    # 1. Create top-level directories
    for d in ['assets', 'context', 'hooks', 'routes']:
        (base_dir / d).mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {d}")
        
    # 2. Refactor components and pages
    target_dirs = [(base_dir / "components"), (base_dir / "pages")]
    
    def process_dir(current_dir):
        if not current_dir.exists():
            return
            
        # List items
        for item in current_dir.iterdir():
            if item.is_dir():
                process_dir(item) # recurse
            elif item.is_file() and item.suffix == '.jsx':
                # Skip App.jsx and main.jsx if they somehow are here, actually they are at src/ level
                if item.name in ('App.jsx', 'main.jsx'):
                    continue
                
                # We have a component/page .jsx file
                # Create a directory with its base name
                base_name = item.stem # e.g. Login from Login.jsx
                new_dir = current_dir / base_name
                new_dir.mkdir(parents=True, exist_ok=True)
                
                # Move the file to the new directory as index.jsx
                new_file = new_dir / 'index.jsx'
                print(f"Moving {item.relative_to(base_dir)} -> {new_file.relative_to(base_dir)}")
                shutil.move(str(item), str(new_file))

    for d in target_dirs:
        process_dir(d)
        
    print("Refactoring completed successfully.")

if __name__ == "__main__":
    main()
