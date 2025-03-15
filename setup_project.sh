#!/bin/bash

# Base project directory (set this to your Next.js project root)
BASE_DIR="./"

# Directories to create
DIRS=(
  "$BASE_DIR/app"
  "$BASE_DIR/app/journal"
  "$BASE_DIR/app/work"
  "$BASE_DIR/app/info"
  "$BASE_DIR/components"
  "$BASE_DIR/styles"
)

# Files to create
FILES=(
  "$BASE_DIR/app/layout.js"
  "$BASE_DIR/app/loading.js"
  "$BASE_DIR/app/page.js"                 # Journal page (Start page)
  "$BASE_DIR/app/journal/page.js"         # Journal page
  "$BASE_DIR/app/work/page.js"            # Work page
  "$BASE_DIR/app/info/page.js"            # Info page
  "$BASE_DIR/components/Header.js"        # Header component
  "$BASE_DIR/components/HorizontalScroll.js"
  "$BASE_DIR/components/ImageBlock.js"
  "$BASE_DIR/components/ExpandableText.js"
  "$BASE_DIR/components/WelcomeText.js"
  "$BASE_DIR/styles/globals.css"          # Global styles
  "$BASE_DIR/styles/Header.module.css"
  "$BASE_DIR/styles/HorizontalScroll.module.css"
  "$BASE_DIR/styles/ImageBlock.module.css"
  "$BASE_DIR/styles/ExpandableText.module.css"
  "$BASE_DIR/styles/WelcomeText.module.css"
)

# Create directories
echo "Creating directories..."
for dir in "${DIRS[@]}"; do
  mkdir -p "$dir"
  echo "Created: $dir"
done

# Create files
echo "Creating files..."
for file in "${FILES[@]}"; do
  touch "$file"
  echo "Created: $file"
done

echo "Project structure setup complete!"