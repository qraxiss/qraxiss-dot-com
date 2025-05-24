#!/bin/bash

# Path to build directory
BUILD_DIR="./apps/web/dist"

echo "Adding /web prefix to resource paths..."

# Find all HTML files in the build directory and its subdirectories
find "$BUILD_DIR" -name "*.html" -type f | while read -r file; do
  # Use sed to replace src attributes with macOS compatibility
  sed -i '' 's/\(src=["'"'"']\)\(\/\?\)\(web\/\)\?\([^"'"'"']*["'"'"']\)/\1\/web\/\4/g' "$file" # CHANGE !!

  # Also handle href for CSS and other linked resources
  sed -i '' 's/\(href=["'"'"']\)\(\/\?\)\(web\/\)\?\([^"'"'"']*\.\(css\|ico\|png\|jpg\|jpeg\|gif\|svg\)["'"'"']\)/\1\/web\/\4/g' "$file" # CHANGE !!
done

echo "Done!"
