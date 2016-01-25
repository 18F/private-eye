(function() {
  'use strict';

  var PrivateEye = function(opts) {
    var styles = document.createElement('style');
    styles.innerHTML = 'a.private-link::after { content: "\\1F512"; font-size: 0.75em; vertical-align: top; }';
    document.body.appendChild(styles);

    opts.ignoreUrls.forEach(function(url) {

      var DEFAULT_MESSAGE = "This is a link to a private site, which may or may not be accessible to you.";
      var hrefValue;
      var linkMessage;

      // If the `url` is an Object, then parse the properties `message` & `url`
      //
      if ( url === Object( url ) ) {

        linkMessage = url.message;
        hrefValue = url.url;

      } else {

        hrefValue = url;
        linkMessage = DEFAULT_MESSAGE;

      }

      var anchors = document.querySelectorAll('a[href*="' + hrefValue + '"]');
      Array.prototype.forEach.call(anchors, function(anchor) {
        anchor.className += ' private-link';

        // Only replace the anchor's title if it is empty
        //
        if ( ! anchor.title ) {

          anchor.title = linkMessage;

        }

      });
    });
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = PrivateEye;
  } else {
    window.PrivateEye = PrivateEye;
  }
})();
