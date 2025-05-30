import os

excluded_folders = []

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d not in excluded_folders]

    current_dir = root
    folder_name = os.path.basename(current_dir)
    index_filename = os.path.join(current_dir, f"{folder_name}.md")

    if root == ".":
        continue

    extensions = ["md", "pdf", "jpg", "jpeg", "docx", "doc", "zip"]
    content = []

    for extension in extensions:
        for file in [f for f in files if f.endswith(f'.{extension}') and f != os.path.basename(index_filename)]:
            name = os.path.splitext(file)[0]
            content.append(f"![[{name}.{extension}]]")

    # Üst dizinleri içeriğe ekle
    path_parts = []
    path = current_dir
    while path != "." and path != "":
        parent = os.path.dirname(path)
        parent_name = os.path.basename(parent)
        if parent_name:
            path_parts.append(parent_name)
        path = parent

    for dir_name in path_parts:
        if dir_name and dir_name != ".":
            content.append(f"[[{dir_name}]]")

    # İçeriği index dosyasına yaz
    with open(index_filename, 'w') as f:
        f.write('\n'.join(content))