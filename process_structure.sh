#!/bin/bash

# Script to process structure.csv and generate Markdown files
# Dependencies: curl, sed, awk, basename, dirname, mkdir

# Configuration - can be overridden by environment variables
CSV_FILE="${CSV_FILE:-structure.csv}"
BASE_DIR="${BASE_DIR:-./content}"


# Custom HTML to Markdown converter
html_to_markdown() {
    local html_content="$1"
    local host="$2"

    # Remove scripts and styles
    html_content=$(echo "$html_content" | sed 's/<script[^>]*>.*<\/script>//g')
    html_content=$(echo "$html_content" | sed 's/<style[^>]*>.*<\/style>//g')

    # FIRST convert images while HTML tags are still intact
    # Handle various img tag formats, order matters since attributes can be in different order
    # Handle img with alt and src (alt first)
    html_content=$(echo "$html_content" | sed 's|<img[^>]*alt="\([^"]*\)"[^>]*src="\([^"]*\)"[^>]*>|\![\1](\2)|g')
    # Handle img with src and alt (src first)
    html_content=$(echo "$html_content" | sed 's|<img[^>]*src="\([^"]*\)"[^>]*alt="\([^"]*\)"[^>]*>|\![\2](\1)|g')
    # Handle img with just src
    html_content=$(echo "$html_content" | sed 's|<img[^>]*src="\([^"]*\)"[^>]*>|\![](\1)|g')
    # Handle self-closing img tags with alt and src
    html_content=$(echo "$html_content" | sed 's|<img[^>]*alt="\([^"]*\)"[^>]*src="\([^"]*\)"[^>]*/>|\![\1](\2)|g')
    # Handle self-closing img tags with just src
    html_content=$(echo "$html_content" | sed 's|<img[^>]*src="\([^"]*\)"[^>]*/>|\![](\1)|g')
    # Handle single quotes
    html_content=$(echo "$html_content" | sed "s|<img[^>]*alt='\([^']*\)'[^>]*src='\([^']*\)'[^>]*>|\![\1](\2)|g")
    html_content=$(echo "$html_content" | sed "s|<img[^>]*src='\([^']*\)'[^>]*alt='\([^']*\)'[^>]*>|\![\2](\1)|g")
    html_content=$(echo "$html_content" | sed "s|<img[^>]*src='\([^']*\)'[^>]*>|\![](\1)|g")
    html_content=$(echo "$html_content" | sed "s|<img[^>]*src='\([^']*\)'[^>]*/>|\![](\1)|g")

    # Convert headers
    html_content=$(echo "$html_content" | sed 's|<h1[^>]*>|# |g' | sed 's|</h1>|\n\n|g')
    html_content=$(echo "$html_content" | sed 's|<h2[^>]*>|## |g' | sed 's|</h2>|\n\n|g')
    html_content=$(echo "$html_content" | sed 's|<h3[^>]*>|### |g' | sed 's|</h3>|\n\n|g')
    html_content=$(echo "$html_content" | sed 's|<h4[^>]*>|#### |g' | sed 's|</h4>|\n\n|g')
    html_content=$(echo "$html_content" | sed 's|<h5[^>]*>|##### |g' | sed 's|</h5>|\n\n|g')
    html_content=$(echo "$html_content" | sed 's|<h6[^>]*>|###### |g' | sed 's|</h6>|\n\n|g')

    # Convert bold and italic (handle nested or complex cases)
    html_content=$(echo "$html_content" | sed 's|<strong[^>]*>|**|g' | sed 's|</strong>|**|g')
    html_content=$(echo "$html_content" | sed 's|<b[^>]*>|**|g' | sed 's|</b>|**|g')
    html_content=$(echo "$html_content" | sed 's|<em[^>]*>|*|g' | sed 's|</em>|*|g')
    html_content=$(echo "$html_content" | sed 's|<i[^>]*>|*|g' | sed 's|</i>|*|g')
    # Fix potential double markers from nested tags
    html_content=$(echo "$html_content" | sed 's|\*\*\*\*|\*\*|g' | sed 's|\*\*\*|\*\*|g')
    html_content=$(echo "$html_content" | sed 's|\*\*\*|\*\*|g')

    # Convert links
    html_content=$(echo "$html_content" | sed 's|<a[^>]*href="\([^"]*\)"[^>]*>\([^<]*\)</a>|[\2](\1)|g')

    # Convert lists
    html_content=$(echo "$html_content" | sed 's|<ul[^>]*>||g' | sed 's|</ul>||g')
    html_content=$(echo "$html_content" | sed 's|<ol[^>]*>||g' | sed 's|</ol>||g')
    html_content=$(echo "$html_content" | sed 's|<li[^>]*>|* |g' | sed 's|</li>|\n|g')

    # Convert blockquotes
    html_content=$(echo "$html_content" | sed 's|<blockquote[^>]*>|> |g' | sed 's|</blockquote>|\n\n|g')

    # Convert paragraphs
    html_content=$(echo "$html_content" | sed 's|<p[^>]*>||g' | sed 's|</p>|\n\n|g')

    # Convert line breaks
    html_content=$(echo "$html_content" | sed 's|<br[^>]*>|\n|g')

    # Convert code blocks
    html_content=$(echo "$html_content" | sed 's|<pre[^>]*><code[^>]*>|```bash\n|g' | sed 's|</code></pre>|```\n|g')
    html_content=$(echo "$html_content" | sed 's|<code[^>]*>|`|g' | sed 's|</code>|`|g')

    # Remove Vue.js template comments and artifacts
    html_content=$(echo "$html_content" | sed 's/<!--\[--><!--\[-->//g')
    html_content=$(echo "$html_content" | sed 's/<!--\]-->//g')
    html_content=$(echo "$html_content" | sed 's/<!--\[-->//g')
    html_content=$(echo "$html_content" | sed 's/<\!\[CDATA\[//g')
    html_content=$(echo "$html_content" | sed 's/\]\]-->//g')

    # Remove remaining HTML tags (be more selective to avoid removing markdown)
    # Remove specific HTML tags that are commonly left over, but be careful not to remove markdown images
    html_content=$(echo "$html_content" | sed 's/<\/\?span[^>]*>//g')
    html_content=$(echo "$html_content" | sed 's/<\/\?div[^>]*>//g')
    html_content=$(echo "$html_content" | sed 's/<\/\?section[^>]*>//g')
    html_content=$(echo "$html_content" | sed 's/<\/\?button[^>]*>//g')
    html_content=$(echo "$html_content" | sed 's/<\/\?svg[^>]*>//g')
    html_content=$(echo "$html_content" | sed 's/<\/\?path[^>]*>//g')
    # Remove any remaining HTML tags except those that might be part of markdown
    html_content=$(echo "$html_content" | sed '/^<[^>]*>$/d')

    # Fix image and link URLs (add hostname to relative paths starting with /)
    # Handle images and links that start with / but need hostname
    html_content=$(echo "$html_content" | sed "s|](/\([^)]*\)|]($host/\1|g")
    # Handle images and links that are relative (don't start with / or http)
    html_content=$(echo "$html_content" | sed "s|](\([^h/][^)]*\)|]($host/\1|g")

    # Clean up extra whitespace
    html_content=$(echo "$html_content" | sed '/^[[:space:]]*$/d' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//' | sed 's/\n\n\n*/\n\n/g')

    echo "$html_content"
}

process_row() {
    local url="$1"
    local new_url="$2"
    # Trim whitespace and remove carriage returns
    url=$(echo "$url" | sed 's/^ *//;s/ *$//;s/\r$//')
    new_url=$(echo "$new_url" | sed 's/^ *//;s/ *$//;s/\r$//')

    # Skip if deleted (trim whitespace first)
    new_url_trimmed=$(echo "$new_url" | sed 's/^ *//;s/ *$//')
    if [[ "$new_url_trimmed" == "deleted" ]]; then
        echo "Skipping deleted: $url"
        return
    fi

    # Extract host from URL (handle both http and https)
    host=$(echo "$url" | sed 's|^\(https://[^/]*\).*|\1|;s|^\(http://[^/]*\).*|\1|')

    # Extract path from URL (handle both http and https)
    path=$(echo "$url" | sed 's|https://[^/]*||;s|http://[^/]*||' | sed 's/\r$//' | tr -d '\r')
    if [[ "$path" == "/" || -z "$path" ]]; then
        echo "Skipping root URL: $url"
        return
    fi

    # Determine filename: last string of the url like basename but without extension
    # For http://localhost:3000/something -> something.md
    path=$(echo "$path" | sed 's/\r$//' | tr -d '\r')
    filename=$(basename "$path" | sed 's|\.[^.]*$||' | sed 's/\r$//' | tr -d '\r')
    if [[ -z "$filename" ]]; then
        # If path ends with /, use the directory name
        filename=$(basename "$path" | sed 's|/$||' | sed 's/\r$//' | tr -d '\r')
    fi
    filename="$filename.md"

    # Determine output directory
    if [[ "$new_url" == "same" ]]; then
        # File address is /content/[path without hostname and filename]
        # For https://tuanlelaw.com/us-immigration-policy-2025 -> /content/us-immigration-policy-2025/
        # Remove trailing slash and filename from path to get directory
        dir_path=$(dirname "$path")
        if [[ "$dir_path" == "." || "$dir_path" == "/" ]]; then
            dir_path=""
        fi
        # Remove leading slash to avoid double slashes
        dir_path=$(echo "$dir_path" | sed 's|^/||')
        output_dir="$BASE_DIR/$dir_path"
    else
        # Ensure new_url doesn't start with / and remove trailing slash
        new_url_clean=$(echo "$new_url" | sed 's|^/||;s|/$||')
        output_dir="$BASE_DIR/$new_url_clean"
    fi

    # Clean up output directory path (remove any non-printable characters)
    output_dir=$(echo "$output_dir" | tr -cd 'a-zA-Z0-9_\-/\.')
    
    # Ensure output directory exists
    if [[ -n "$output_dir" ]]; then
        mkdir -p "$output_dir"
        output_file="$output_dir/$filename"
    else
        output_file="$BASE_DIR/$filename"
    fi

    echo "Processing: $url -> $output_file"

    # Fetch HTML with retries
    html_file=$(mktemp)
    retries=3
    success=0
    for ((i=1; i<=retries; i++)); do
        if curl -s -L --max-time 30 "$url" -o "$html_file"; then
            success=1
            break
        fi
        echo "Retry $i failed for $url"
        sleep 2
    done

    if [[ $success -eq 0 ]]; then
        echo "Failed to fetch $url after $retries attempts" >&2
        rm "$html_file"
        return
    fi

    # Extract frontmatter fields (use empty string if not found)
    meta_title=$(grep -o '<title[^>]*>.*</title>' "$html_file" | sed 's/<title[^>]*>//;s/<\/title>//' | head -1 | sed 's/^/"/;s/$/"/')
    meta_description=$(grep -o '<meta name="description" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    h1=$(grep -o '<h1[^>]*>.*</h1>' "$html_file" | sed 's/<h1[^>]*>//;s/<\/h1>//' | head -1 | sed 's/^/"/;s/$/"/')
    og_title=$(grep -o '<meta property="og:title" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    og_description=$(grep -o '<meta property="og:description" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    og_image=$(grep -o '<meta property="og:image" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1)
    if [[ -n "$og_image" ]]; then
        if [[ "$og_image" =~ ^https?:// ]]; then
            # Already an absolute URL
            og_image="$og_image"
        else
            # Relative URL, prepend host
            og_image="$host$og_image"
        fi
    fi
    twitter_card=$(grep -o '<meta name="twitter:card" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    twitter_title=$(grep -o '<meta name="twitter:title" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    twitter_description=$(grep -o '<meta property="twitter:description" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    twitter_image=$(grep -o '<meta property="twitter:image" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    published_time=$(grep -o '<meta property="article:published_time" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')
    modified_time=$(grep -o '<meta property="article:modified_time" content="[^"]*"' "$html_file" | sed 's/.*content="\([^"]*\)".*/\1/' | head -1 | sed 's/^/"/;s/$/"/')

    # Estimate read time (rough: 275 words per minute, format as "X minutes")
    if command -v pandoc >/dev/null 2>&1; then
        word_count=$(pandoc -f html -t plain "$html_file" | wc -w)
    else
        word_count=$(sed -n '/<body/,/<\/body>/p' "$html_file" | sed 's/<[^>]*>//g' | wc -w)
    fi
    read_time_minutes=$((word_count / 275))
    if [[ $read_time_minutes -eq 0 ]]; then
        read_time_minutes=1
    fi
    read_time="\"$read_time_minutes minutes\""

    # Determine canonical URL (new address)
    if [[ "$new_url" == "same" ]]; then
        canonical_path="$path"
    else
        # Ensure new_url doesn't start with / and remove any carriage returns
        new_url_clean=$(echo "$new_url" | sed 's|^/||;s|/$||;s/\r$//')
        filename_base=$(basename "$path" | sed 's|\.[^.]*$||;s/\r$//')
        if [[ -z "$filename_base" ]]; then
            filename_base=$(basename "$path" | sed 's|/$||;s/\r$//')
        fi
        canonical_path="/$new_url_clean/$filename_base"
        # Simple cleanup - just remove double slashes
        canonical_path=$(echo "$canonical_path" | sed 's/\/\//\//g')
    fi
    # Clean up canonical URL and remove any carriage returns
    canonical="$host$canonical_path"
    canonical=$(echo "$canonical" | tr -d '\r')
    

    # Build frontmatter with quoted values
    frontmatter="---
metaTitle: ${meta_title:-\"\"}
metaDescription: ${meta_description:-\"\"}
h1: ${h1:-\"\"}
summary: ${meta_description:-\"\"}
author: \"\"
robots: \"index, follow\"
canonical: \"$canonical\"
ogTitle: ${og_title:-\"\"}
ogDescription: ${og_description:-\"\"}
ogImage: ${og_image:-\"\"}
twitterCard: ${twitter_card:-\"\"}
twitterTitle: ${twitter_title:-\"\"}
twitterDescription: ${twitter_description:-\"\"}
twitterImage: ${twitter_image:-\"\"}
publishedTime: ${published_time:-\"\"}
modifiedTime: ${modified_time:-\"\"}
readTime: $read_time
---
"

    # Extract main content area using Python for better HTML parsing
    python3 -c "
import sys
import re
from html.parser import HTMLParser

class ContentExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_blog = False
        self.in_main = False
        self.content = ''
        self.blog_content = ''
        self.main_content = ''
        self.div_stack = []
        self.tag_stack = []
    
    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag == 'div':
            for attr, value in attrs:
                if attr == 'class' and 'blog' in value:
                    self.in_blog = True
                    self.div_stack.append('blog')
                    break
        elif tag == 'main':
            for attr, value in attrs:
                if attr == 'class' and 'main' in value:
                    self.in_main = True
                    break
    
    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag == 'div' and self.div_stack:
            if self.div_stack[-1] == 'blog':
                self.in_blog = False
            self.div_stack.pop()
        elif tag == 'main':
            self.in_main = False
    
    def handle_data(self, data):
        if self.in_blog:
            self.blog_content += data
        elif self.in_main:
            self.main_content += data

with open('$html_file', 'r', encoding='utf-8') as f:
    html_content = f.read()

parser = ContentExtractor()
parser.feed(html_content)

if parser.blog_content:
    # Extract blog div with HTML tags preserved
    blog_match = re.search(r'<div class=\"blog\">(.*?)</div>', html_content, re.DOTALL)
    if blog_match:
        print(blog_match.group(1))
    else:
        print(parser.main_content)
else:
    # Extract main content with HTML tags preserved
    main_match = re.search(r'<main[^>]*>(.*?)</main>', html_content, re.DOTALL)
    if main_match:
        print(main_match.group(1))
    else:
        print(html_content)
" > /tmp/extracted_content.txt

content_html=$(cat /tmp/extracted_content.txt)
rm -f /tmp/extracted_content.txt

if [[ -z "$content_html" ]]; then
    # Fallback: extract from body but try to remove header/footer
    content_html=$(sed -n '/<body[^>]*>/,/<\/body>/p' "$html_file")
    # Remove common navigation and header elements
    content_html=$(echo "$content_html" | sed '/<header/,/<\/header>/d')
    content_html=$(echo "$content_html" | sed '/<nav/,/<\/nav>/d')
    content_html=$(echo "$content_html" | sed '/<footer/,/<\/footer>/d')
fi
if [[ -z "$content_html" ]]; then
    # Last fallback: extract from html
    content_html=$(cat "$html_file")
fi

    # Use custom HTML to Markdown converter
    markdown=$(html_to_markdown "$content_html" "$host")

    # Write to output file
    echo "$frontmatter$markdown" > "$output_file"

    # Clean up
    rm "$html_file"

    echo "Generated: $output_file"
}

# Check if CSV file exists
if [[ ! -f "$CSV_FILE" ]]; then
    echo "Error: CSV file '$CSV_FILE' not found!" >&2
    exit 1
fi

# Process only the piped input or full CSV
if [[ -p /dev/stdin ]]; then
    # Piped input
    while IFS=, read -r url new_url; do
        # Skip header line if present
        if [[ "$url" == "Page URL" ]]; then
            continue
        fi
        process_row "$url" "$new_url"
    done
else
    # Full CSV
    tail -n +2 "$CSV_FILE" | while IFS=, read -r url new_url; do
        process_row "$url" "$new_url"
    done
fi

echo "Processing complete."