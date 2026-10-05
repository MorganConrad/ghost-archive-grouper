const DEFAULTS = {
  query: "article",      // query used to find the posts
  openFirstNDetails: 1,  // this many of the details elements start as open
  dateStrLen: 4,         // default to year (out of a presumed YYYY-MM-YY format)
  summaryClassList: "archive-summary"

/** null defaults for
  detailsClassList,
  detailsAttributes,
  summaryAttributes
*/
}


export class ArchiveGrouper {

  constructor(userOptions) {
    this.options = Object.assign({}, DEFAULTS, userOptions);
  }

  /**
   * Group posts by their date
   * @param {Element} wrapperEl
   * @returns
   */
  doGroup(wrapperEl) {
    let posts = this.sortAndPreparePosts(this.getPosts(wrapperEl));
    let groupMap = new Map();  // must iterate in the original insertion order

    posts.forEach((post) => {
      let datestr = this.getdatetime(post);
      let uiTime = this.getDateStringForUI(datestr);
      if (uiTime)
        groupMap.getOrInsert(uiTime, []).push(post)
    });

    let index = 0;
    groupMap.forEach((group, uiTime) => {
      let { detailsEl, summaryEl } = this.createDetailsAndSummary(uiTime, index, group.length);
      summaryEl.after(...group);
      wrapperEl.append(detailsEl);
      index++;
    });

    return posts;
  }

  /**
   * Find all posts within some wrapper Element
   * @param {Element} wrapperEl
   * @returns [Element]
   */
  getPosts(wrapperEl) {
    return wrapperEl.querySelectorAll(this.options.query);
  }

  /**
   * Normally posts are already sorted in reverse order, but just in case...
   * @param {[Element]} posts
   * @returns [Element]
   */
  sortAndPreparePosts(posts) {
    return posts;
  }


  /**
   * Create the <details><summary></summary></details> combo
   *
   * @param {string} uiTime
   * @param {integer} index      which detail 0..N
   * @param {integer} postCount  number of posts in this timeframe
   * @param {*} options
   * @returns { Element, Element }
   */
  createDetailsAndSummary(uiTime, index, postCount) {
    const detailsEl = this.createElement('details', this.options.detailsClassList, this.options.detailsAttributes);
    if (index < this.options.openFirstNDetails)
      detailsEl.setAttribute("open", "true")

    let summaryEl = this.createElement('summary', this.options.summaryClassList, this.options.summaryAttributes);
    let summaryHTML = ` <span class="archive-summary-uitime">${uiTime}</span>  <span class="archive-summary-postcount">(${postCount} posts available)</span>`;
    summaryEl.innerHTML = summaryHTML;
    detailsEl.append(summaryEl);
    return { detailsEl, summaryEl };
  }

  /**
   * Get the datetime for a post.  Uses the time tag datetime attribute.
   *
   * @param {Element} post
   * @returns String, may be ""
   */
  getdatetime(post) {
    let timeEl = post.getElementsByTagName("time")[0];
    return timeEl ? timeEl.getAttribute("datetime") : "";
  }

  /**
   * Convert the datetime to a string the UI will show in the <summary>
   * @param {string} datetime
   * @returns string, may be null
   */
  getDateStringForUI(datetime) {
    return datetime ? datetime.substring(0, this.options.dateStrLen) : null; // default is year only
  }

  /**
   * Create an Element
   * @param {string} tag
   * @param {string} classList
   * @param {object} attrs
   * @returns
   */
  createElement(tag, classList, attrs = {}) {
    let el = document.createElement(tag);
    if (classList)
      el.classList = classList;
    for (let [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }

    return el;
  }

}
