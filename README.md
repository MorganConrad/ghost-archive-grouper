[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/ghost-archive-grouper)

# ghost-archive-grouper

## Background
A common question on the [ghost blog](https://ghost.org/) discussions is how to provide an archive on past posts, grouped by date.  For example, by year.

- https://brightthemes.com/blog/ghost-post-archive
- https://forum.ghost.org/t/creating-a-blogroll-grouped-by-year-and-month/53128
  - "This is one of those spots where handlebars really doesn’t make things easy."


## Solution?

This is a short javascript program that runs _after_ page load to group the list of posts by date.

### Usage

see examplePage.html

Add something akin to the following code, probably via [Ghost Header Injection](https://ghost.org/tutorials/use-code-injection-in-ghost/).  This selectors in this code are specific to the Solo theme.  You may have to change some selectors for another theme.

```js
<script type="module" defer>

// You may want to change the description to something shorter
  let pageParagraph = document.querySelector("p.gh-about-secondary");
  pageParagraph.textContent = "Archive Summary";

// call the group the feed by date code
  import { groupByDate } from 'https://cdn.jsdelivr.net/gh/MorganConrad/ghost-archive-grouper/ghostArchiveGrouper.js';
  let wrapper = document.querySelector("div .gh-feed");  // may vary by theme
  let newPosts = groupByDate(wrapper);

</script>
```
