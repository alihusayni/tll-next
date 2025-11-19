#!/bin/bash

# Create new-content directory if it doesn't exist
mkdir -p new-content

# Process the CSV, skipping the header and removing the numbering
tail -n +2 structure.csv | sed 's/^[0-9]*| //' | while IFS=, read -r url path; do
    # Extract slug from URL (last part after last /)
    slug=$(basename "$url")
    
    # Find the markdown file recursively in /content
    found_file=$(find content/ -name "${slug}.md" -type f -print -quit)
    
    if [ -z "$found_file" ]; then
        echo "Warning: No file found for slug $slug"
        continue
    fi
    
    # Remove leading / from path if present
    path=${path#/}
    # Remove trailing comma from path if present
    path=${path%,}
    
    # Determine directory and file name
    if [[ "$path" == */* ]]; then
        dir_part=$(dirname "$path")
        file_part=$(basename "$path").md
    else
        dir_part=""
        file_part="${path}.md"
    fi
    
    # Create directories
    mkdir -p "new-content/$dir_part"
    
    # Copy and rename the file
    cp "$found_file" "new-content/$dir_part/$file_part"
    
    echo "Copied $found_file to new-content/$dir_part/$file_part"
done