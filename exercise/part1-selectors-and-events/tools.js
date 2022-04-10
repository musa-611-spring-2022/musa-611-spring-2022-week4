/* eslint-disable no-param-reassign */
/* ====================
The following two functions take a string of HTML and create DOM element objects
representing the tags, using the `template` feature of HTML. See the following
for more information: https://stackoverflow.com/a/35385518/123776
==================== */

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  let template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  let template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}
