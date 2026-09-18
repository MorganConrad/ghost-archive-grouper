
const DEFAULTS = {
  query: "article",
  createDetails,        // user might want to override these
  getdatetime,
  getDateStringForUI,
  openFirstNDetails: 1,
  summaryClassList: "archive-summary"

/** null defaults for
  detailsClassList,
  detailsAttributes,
  summaryAttributes
*/
}

export function groupByDate(wrapperEl, userOptions) {
  let options = Object.assign({}, DEFAULTS, userOptions)

  let posts = wrapperEl.querySelectorAll(options.query);
  let groupMap = new Map();  // must iterate in the original insertion order

  posts.forEach((post) => {
    let uiTime = options.getDateStringForUI(options.getdatetime(post));
    if (uiTime)
      groupMap.getOrInsert(uiTime, []).push(post)
  });

  let count = 0;
  groupMap.forEach((group, uiTime) => {
    let { detailsEl, summaryEl } = options.createDetails(uiTime, count, group, groupMap, options);
    summaryEl.after(...group);
    wrapperEl.append(detailsEl);
    count++;
  });

  return posts;
}


/**
 * Default function to create the <details><summary></summary></details> combo
 *
 * @param {string} summaryText
 * @param {integer} count
 * @param {*} options
 * @returns { Element, Element }
 */
function createDetails(uiTime, count, theGroup, groupMap, options) {
  const detailsEl = createElement('details', options.detailsClassList, options.detailsAttributes);
  if (count < options.openFirstNDetails)
    detailsEl.setAttribute("open", "true")

  let summaryEl = createElement('summary', options.summaryClassList, options.summaryAttributes);
  let summaryHTML = ` <span class="archive-summary-uitime">${uiTime}</span>  <span class="archive-summary-postcount">(${theGroup.length} posts available)</span>`;
  summaryEl.innerHTML = summaryHTML;
  detailsEl.append(summaryEl);
  return { detailsEl, summaryEl };
}


/**
 * Default function to get the datetime for a post.  Uses the time tag datetime attribute.
 *
 * @param {Element} el
 * @returns String, may be ""
 */
function getdatetime(el) {
  let timeEl = el.getElementsByTagName("time")[0];
  return timeEl ? timeEl.getAttribute("datetime") : "";
}

/**
 * Default function to convert the datetime to a string the UI will show in the <summary>
 * @param {string} datetime
 * @returns string, may be null
 */
function getDateStringForUI(datetime) {
  return datetime ? datetime.substring(0,4) : null; // default is year only
}


function createElement(tag, classList, attrs = {}) {
  let el = document.createElement(tag);
  if (classList)
    el.classList = classList;
  for (let [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }

  return el;
}
