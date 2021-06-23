/**
 * Loads an HTML document from a URL and retuns an element selected using
 * the 'selector' parameter
 * 		Example usage:
 * 				loadPageSection('./myPage.html', '#container', (r, err) => console.log(r, err));
 *
 * @method loadPageSection
 * @param  {String} url
 * @param  {String} selector - A valid CSS selector
 * @param  {Function} callback - To be called with two parameters (response, error)
 * @return {void} - The Element collected from the loaded page.
 */
window.loadPageSection = function loadPageSection(url, selector, callback) {
  if (typeof url !== 'string') {
    throw new Error('Invalid URL: ', url);
  } else if (typeof selector !== 'string') {
    throw new Error('Invalid selector selector: ', selector);
  } else if (typeof callback !== 'function') {
    throw new Error('Callback provided is not a function: ', callback);
  }

  var xhr = new XMLHttpRequest();
  var finished = false;
  xhr.onabort = xhr.onerror = function xhrError() {
    finished = true;
    callback(null, xhr.statusText);
  };

  xhr.onreadystatechange = function xhrStateChange() {
    if (xhr.readyState === 4 && !finished) {
      finished = true;
      var section;
      try {
        section = xhr.responseXML.querySelector(selector);
        callback(section);
      } catch (e) {
        callback(null, e);
      }
    }
  };

  xhr.open('GET', url);
  xhr.responseType = 'document';
  xhr.send();
};
