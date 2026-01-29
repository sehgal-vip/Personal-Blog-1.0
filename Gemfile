source "https://rubygems.org"

# Ruby 4.0+ requires these gems explicitly
gem "csv"
gem "bigdecimal"

# Use GitHub Pages gem for compatibility
gem "github-pages", group: :jekyll_plugins

# GitHub Pages approved plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb for JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
