---
layout: post
title: "Welcome to My Blog"
date: 2024-01-18
categories: [Personal, Meta]
tags: [blogging, jekyll, github-pages, getting-started]
excerpt: "The first post explaining the purpose of this blog, how it was built, and what readers can expect in future posts."
author: Vipul Sehgal
comments: true
share: true
---

Hello and welcome to my blog! 🎉

This is the first post on my new Jekyll-powered blog, and I'm excited to share my thoughts, projects, and learnings with you.

## Why I Started This Blog

I've always believed in the power of writing to clarify thoughts and share knowledge. This blog will serve as:

1. **A digital garden** — A place to cultivate ideas and let them grow
2. **A learning journal** — Documenting what I learn along the way
3. **A portfolio** — Showcasing projects and experiments

## How This Blog Works

This blog is built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/). Here's what makes it special:

### Command Palette (⌘K)

Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette. You can:

- Navigate quickly to any page
- Search through all posts
- Toggle between light and dark themes
- Copy the current URL
- Access social links

Try it now! Press `⌘K` and type "theme" to switch between light and dark mode.

### Code Highlighting

The blog supports syntax highlighting for code blocks. Here's a Python example:

```python
def greet(name: str) -> str:
    """Return a personalized greeting."""
    return f"Hello, {name}! Welcome to my blog."

# Example usage
message = greet("Reader")
print(message)
```

And here's some JavaScript:

```javascript
// A simple async function example
async function fetchPosts() {
  const response = await fetch('/search.json');
  const posts = await response.json();
  
  return posts.filter(post => post.tags.includes('tutorial'));
}
```

### Inline Code

You can also use `inline code` for short snippets like variable names, commands, or file paths like `_config.yml`.

## What to Expect

Here's what I'm planning to write about:

- **Tutorials** — Step-by-step guides on tools and technologies
- **Project Updates** — Progress on things I'm building
- **Thoughts** — Reflections on productivity, learning, and life
- **Resources** — Curated lists of helpful tools and content

## Features of This Blog

### Dark Mode

Click the sun/moon icon in the header or use the command palette (`⌘K` → "Switch Theme") to toggle between light and dark modes. Your preference is saved automatically.

### Responsive Design

This blog works great on all devices — from phones to desktops. Try resizing your browser window!

### Categories and Tags

Posts are organized by categories and tags:

- **Categories** are broad topics (like "Personal" or "Technical")
- **Tags** are specific keywords (like "jekyll" or "tutorial")

Click on any category or tag to see related posts.

### Comments

Scroll down to see the comments section powered by [Giscus](https://giscus.app/). It uses GitHub Discussions, so you can comment with your GitHub account.

## A Sample Blockquote

> "The best time to start was yesterday. The second best time is now."
> 
> — Unknown

## Lists and Formatting

Here's what I use to write:

### Unordered List
- **Obsidian** for drafting posts
- **GitHub Desktop** for version control
- **VS Code** for any code edits

### Ordered List
1. Write the draft in Obsidian
2. Review and edit
3. Commit using GitHub Desktop
4. Wait for GitHub to build the site
5. The post is live!

## Images

You can add images to your posts by placing them in `/assets/images/` and referencing them:

```markdown
![Alt text describing the image](/assets/images/example.jpg)
```

## Tables

| Feature | Status |
|---------|--------|
| Dark Mode | ✅ Complete |
| Command Palette | ✅ Complete |
| Search | ✅ Complete |
| Comments | ✅ Complete |
| RSS Feed | ✅ Complete |

## What's Next?

I'm planning to write more about:

1. How I set up my development environment
2. Useful tools and workflows
3. Deep dives into technologies I'm learning

---

Thanks for reading! If you have any questions or just want to say hi, feel free to leave a comment below or reach out on social media.

Happy reading! 📚
