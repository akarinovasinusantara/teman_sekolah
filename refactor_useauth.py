import sys
import re
from pathlib import Path

def process_file(file_path):
    print(f"Processing {file_path}")
    content = file_path.read_text('utf-8')
    
    # 1. Replace the import statement
    # from: import { AuthContext } from '../../App'
    # to: import { useAuth } from '../../hooks/useAuth'
    content = re.sub(
        r"import\s*\{\s*AuthContext\s*\}\s*from\s*['\"](.*?)App['\"]",
        r"import { useAuth } from '\1hooks/useAuth'",
        content
    )
    
    # 2. Replace the hook usage
    # from: const { something } = useContext(AuthContext)
    # to: const { something } = useAuth()
    content = re.sub(
        r"useContext\(\s*AuthContext\s*\)",
        r"useAuth()",
        content
    )
    
    file_path.write_text(content, 'utf-8')

def main():
    files_to_process = [
        r"d:\Project\Teman_Sekolah\frontend\src\pages\tu\Dashboard\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\pages\super-admin\Dashboard\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\pages\siswa\Dashboard\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\pages\ortu\Dashboard\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\pages\Login\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\pages\guru\Dashboard\index.jsx",
        r"d:\Project\Teman_Sekolah\frontend\src\components\layout\MainLayout\index.jsx"
    ]
    
    for f in files_to_process:
        process_file(Path(f))
        
    print("All files processed.")

if __name__ == "__main__":
    main()
