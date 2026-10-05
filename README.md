[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/ghost-archive-grouper)

# archive-grouper

Groups a bunch of blog posts into subgroups by date, e.g. by year or month.  Wraps these subgroups in `<details><summary></summary></details>` tags.

Developed and tested for for Ghost but should be useable many places.

## Background
A common question on the [ghost blog](https://ghost.org/) discussions is how to provide an archive on past posts, grouped by date.  For example, by year.

- https://brightthemes.com/blog/ghost-post-archive
- https://forum.ghost.org/t/monthly-archive-index-pages/12110 does it with some tricky css
- https://forum.ghost.org/t/creating-a-blogroll-grouped-by-year-and-month/53128
  - "This is one of those spots where handlebars really doesn’t make things easy."


## Solution?

archive-grouper is a short javascript routine that runs _after_ page load to group the list of posts by date.  I made it a javascript class to make it extensible to cover a variety of HTML.

A few example demo pages based upon popular ghost themes included in the examples folder.  The original HTML has been modified with the additional script.  Look for the HTML comments <!-- added code to trigger ArchiveGrouper --> ... <!-- end of added code -->.

In some cases the original content was modified to add more posts with different dates.  Modest attempts to keep the original formatting and css are included but are not completely successful.

@see
 - Casper.html
 - Dawn.html
 - Solo.html
 - Source.html
 - Tangle.html   based on readtangle.com

## Usage

In a production Ghost blog, one would add something akin to the following code, either in the handlebars template, or via [Ghost Header Injection](https://ghost.org/tutorials/use-code-injection-in-ghost/).  This selectors in this code are specific to the Solo theme.  You may have to change some selectors for another theme.  (see the demos)

```js
<script type="module" defer>

  import { ArchiveGrouper } from "./archiveGrouper.js";   // note - you'd probably want this in assets/js

  let wrapper = document.querySelector("div .gh-feed");   // this selector varies, e.g., for Casper theme, the selector is "div .post-feed"
  let grouper = new ArchiveGrouper();
  let newPosts = grouper.doGroup(wrapper);

</script>
```

You probably want to add css styling for .archive-summary-uitime.  As demonstrated in the example files with something simple and garish.  :-)

## Modifications

There are some userOptions you can pass in to the constructor.  For example, in Source.html, we set `dateStrLen` to 7, which will include the year _and_ month out of YYYY-MM.  If those basic options don't provide the flexibility you need, you may need to override `getPosts(), getdatetime(), or getDateStringForUI()`.

For example, since Dawn doesn't use a simple datetime tag, in Dawn.html we override `getdatetime()`.

If you dislike my simplistic details and summary code, you can override `createDetailsAndSummary()`.

