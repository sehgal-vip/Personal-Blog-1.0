# Personal Blog - Jekyll + GitHub Pages

A beautiful, minimalist blog built with Jekyll for GitHub Pages. Features a powerful command palette (⌘K), dark/light mode, and a zero-code publishing workflow.

## ✨ Features

- **Command Palette** — Press `⌘K` (Mac) or `Ctrl+K` (Windows) for quick navigation and search
- **Dark/Light Mode** — Automatic theme detection with manual toggle
- **Responsive Design** — Beautiful on all devices
- **SEO Optimized** — Built-in meta tags, sitemap, and RSS feed
- **Comments** — GitHub Discussions-based comments via Giscus
- **Categories & Tags** — Organized content with archive pages
- **Fast** — Static site with no external dependencies

---

## 🚀 Quick Start

### 1. One-Time Setup

#### Install Prerequisites

**macOS:**
```bash
# Install Homebrew if you haven't
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby
brew install ruby

# Add Ruby to your PATH (add this to ~/.zshrc)
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install Jekyll and Bundler
gem install bundler jekyll
```

**Windows:**
1. Download and install [RubyInstaller](https://rubyinstaller.org/) (with DevKit)
2. Open a new terminal and run:
```bash
gem install bundler jekyll
```

#### Clone and Install Dependencies

```bash
git clone https://github.com/sehgal-vip/sehgal-vip.github.io.git
cd sehgal-vip.github.io
bundle install
```

### 2. Configure Your Site

Edit `_config.yml` with your information:

```yaml
# Required - Update these
title: "Your Name"
description: "Your blog description"
author: "Your Name"
url: "https://sehgal-vip.github.io"  # Your GitHub Pages URL

# Social links
social:
  github: "sehgal-vip"      # Your GitHub username
  twitter: "yourusername"    # Your Twitter handle
  linkedin: "yourusername"   # Your LinkedIn username
  email: "you@example.com"   # Your email
```

### 3. Test Locally

```bash
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) to preview your site.

### 4. Deploy to GitHub Pages

```bash
git add .
git commit -m "Initial blog setup"
git push origin main
```

Your site will be live at `https://yourusername.github.io` within 2-3 minutes!

---

## 📝 Writing Posts

### Using Obsidian (Recommended)

1. **Open Obsidian** and create a new vault pointing to your blog's `_posts` folder
2. **Create a new note** with the filename format: `YYYY-MM-DD-your-post-title.md`
3. **Add frontmatter** at the top of your post:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-18
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
excerpt: "A brief description for previews and SEO"
author: Your Name
---

Your content starts here...
```

4. **Write your content** using Markdown
5. **Publish** using GitHub Desktop (see below)

### Frontmatter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Always use `post` |
| `title` | Yes | Your post title (in quotes) |
| `date` | Yes | Format: `YYYY-MM-DD` |
| `categories` | No | Array: `[Cat1, Cat2]` |
| `tags` | No | Array: `[tag1, tag2]` |
| `excerpt` | No | Short description for previews |
| `author` | No | Author name |
| `comments` | No | `true` or `false` (default: true) |
| `share` | No | Show share buttons (default: true) |

### Markdown Tips

```markdown
# Heading 1 (don't use - reserved for title)
## Heading 2
### Heading 3

**Bold text** and *italic text*

[Link text](https://example.com)

![Image alt text](/assets/images/photo.jpg)

- Bullet point
- Another point

1. Numbered list
2. Second item

> Blockquote

`inline code`

​```python
# Code block with syntax highlighting
def hello():
    print("Hello, World!")
​```

| Table | Header |
|-------|--------|
| Cell  | Cell   |
```

---

## 🖥️ Publishing Workflow

### Using GitHub Desktop

1. **Open GitHub Desktop** and select your repository
2. You'll see your new/changed files listed
3. **Write a commit message** like "New post: Your Title"
4. Click **"Commit to main"**
5. Click **"Push origin"**
6. Wait 2-3 minutes for GitHub to build your site
7. Visit your site to see the new post!

### Using Command Line

```bash
git add .
git commit -m "New post: Your Post Title"
git push
```

---

## ⌨️ Command Palette

The command palette is your power tool for quick navigation. Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open it.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `/` | Open command palette (from any page) |
| `Esc` | Close command palette |
| `↑` / `↓` | Navigate results |
| `Enter` | Execute selected command |

### Quick Commands

Type these in the command palette:

| Command | Action |
|---------|--------|
| `gh` | Go to Home |
| `gb` | Go to Blog |
| `gc` | Go to Categories |
| `gt` | Go to Tags |
| `ga` | Go to About |
| `st` | Switch theme (light/dark) |
| `cp` | Copy current page URL |
| `sr` | Subscribe to RSS |
| `og` | Open GitHub profile |
| `ot` | Open Twitter profile |
| `ol` | Open LinkedIn profile |

---

## 🎨 Customization

### Change Colors

Edit `_config.yml`:

```yaml
colors:
  primary: "#FF6B35"    # Orange - links, buttons, accents
  secondary: "#00D9FF"  # Teal - highlights, badges
  dark_bg: "#1a1a1a"    # Dark mode background
  dark_text: "#e0e0e0"  # Dark mode text
  light_bg: "#ffffff"   # Light mode background
  light_text: "#333333" # Light mode text
```

### Update Navigation

Edit `_data/navigation.yml`:

```yaml
- name: Home
  url: /
  icon: home

- name: Blog
  url: /blog/
  icon: blog

- name: Projects    # Add new pages
  url: /projects/
  icon: folder

- name: About
  url: /about/
  icon: user
```

### Add New Pages

Create a new file in `pages/` folder:

```markdown
---
layout: page
title: Projects
description: Things I've built
permalink: /projects/
---

Your page content here...
```

---

## 💬 Set Up Comments (Giscus)

1. **Enable Discussions** on your GitHub repository:
   - Go to Settings → Features → Check "Discussions"

2. **Install Giscus app**:
   - Visit [github.com/apps/giscus](https://github.com/apps/giscus)
   - Install on your repository

3. **Generate configuration**:
   - Visit [giscus.app](https://giscus.app/)
   - Enter your repository name
   - Copy the `data-repo-id` and `data-category-id` values

4. **Update `_config.yml`**:

```yaml
giscus:
  repo: "yourusername/yourusername.github.io"
  repo_id: "R_xxxxx"           # From giscus.app
  category: "General"
  category_id: "DIC_xxxxx"     # From giscus.app
```

---

## 📊 Set Up Analytics (Optional)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com/)
2. Copy your Measurement ID (looks like `G-XXXXXXXXXX`)
3. Add to `_config.yml`:

```yaml
google_analytics: "G-XXXXXXXXXX"
```

Analytics only loads in production (not localhost).

---

## 🔧 Troubleshooting

### Build Errors

Check the GitHub Actions tab in your repository for error details.

**Common issues:**
- Post date in the future (posts won't show until that date)
- Invalid YAML in frontmatter (check for missing quotes or colons)
- Missing required frontmatter fields

**Validate locally:**
```bash
bundle exec jekyll build
bundle exec jekyll doctor
```

### Theme Not Updating

- Clear browser cache: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)
- Check browser DevTools console for errors
- Verify files were pushed to GitHub

### Command Palette Not Working

- Check browser console for JavaScript errors
- Ensure JavaScript files loaded correctly
- Try clearing localStorage: `localStorage.clear()`

### Posts Not Showing

- Ensure filename format is correct: `YYYY-MM-DD-title.md`
- Verify date is not in the future
- Check frontmatter for YAML errors

---

## 📁 Project Structure

```
├── _config.yml          # Site configuration
├── _data/
│   ├── commands.yml     # Command palette actions
│   └── navigation.yml   # Navigation menu
├── _includes/           # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── command-palette.html
│   └── ...
├── _layouts/            # Page templates
│   ├── default.html
│   ├── home.html
│   ├── post.html
│   └── page.html
├── _posts/              # Your blog posts
│   └── 2024-01-18-welcome.md
├── assets/
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   └── images/          # Your images
├── pages/               # Static pages
│   ├── about.md
│   ├── blog.html
│   ├── categories.html
│   └── tags.html
├── index.html           # Homepage
├── 404.html             # Error page
├── search.json          # Search index
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```

---

## 📖 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Giscus Setup](https://giscus.app/)
- [Obsidian](https://obsidian.md/)
- [GitHub Desktop](https://desktop.github.com/)

---

## 🆘 Getting Help

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Search existing [GitHub Issues](https://github.com/sehgal-vip/sehgal-vip.github.io/issues)
3. Ask on [Stack Overflow](https://stackoverflow.com/questions/tagged/jekyll) with the `jekyll` tag

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ using Jekyll and GitHub Pages
