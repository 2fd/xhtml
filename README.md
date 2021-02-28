# XHTML

HTML filter and sanitization cli tool

## Install

```bash
  npm install -g xhtml-cli
```

## Usage

```bash
  xhtml --help
```

![help command](example-help.png)

## Filtering tags

```bash
  curl -s https://github.com | xhtml -s "meta[property]"
  curl -s https://github.com | xhtml -selector "meta[property]"
```

![meta](example-filter-meta.png)

## Limiting depth output

```bash
  curl -s https://github.com | xhtml -s "strong" -d 0
  curl -s https://github.com | xhtml -selector "strong" -depth 0
```

![meta](example-hide-child.png)

## No color output

```bash
  curl -s https://github.com | xhtml -s "strong" -d 0 --no-color
  curl -s https://github.com | xhtml -selector "strong" -depth 0 --no-color
```

![meta](example-no-color.png)
