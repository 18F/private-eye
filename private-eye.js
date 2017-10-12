// https://github.com/18F/private-eye
(function() {
  'use strict';

  var DEFAULT_MESSAGE = 'This is a link to a private site, which may or may not be accessible to you.';
  var STYLES = 'a.private-link::after { content: "\\1F512"; font-size: 0.75em; vertical-align: top; }';
  var STYLES_ID = '_privateEye-styles';

  function setStyles() {
    var styles = document.createElement('style');
    styles.innerHTML = STYLES;
    styles.id = STYLES_ID;
    document.body.appendChild(styles);
  }

  var PrivateEye = function(opts) {
    if (!(this instanceof PrivateEye)) {
      return new PrivateEye(opts);
    }

    if (!document.getElementById(STYLES_ID)) {
      setStyles();
    }

    var defaultMessage;
    if (opts.defaultMessage && 'string' === typeof opts.defaultMessage) {
      defaultMessage = opts.defaultMessage;
    } else {
      defaultMessage = DEFAULT_MESSAGE;
    }

    this.opts = opts;
    this.defaultMessage = defaultMessage;

    this.checkLinks();
  };

  PrivateEye.prototype.checkLinks = function() {
    var self = this;

    this.opts.ignoreUrls.forEach(function(url) {
      var hrefValue;
      var titleValue;

      // If the `url` is an Object, then parse the properties `message` & `url`
      if (url === Object( url )) {
        titleValue = url.message;
        hrefValue = url.url;
      } else {
        hrefValue = url;
        titleValue = self.defaultMessage;
      }

      var wrapper = (self.opts.wrapper && typeof self.opts.wrapper === 'string') ? self.opts.wrapper + ' ' : '';
      var anchors = document.querySelectorAll(wrapper + 'a[href*="' + hrefValue + '"]');

      Array.prototype.forEach.call(anchors, function(anchor) {
        anchor.className += ' private-link';

        // Only replace the anchor's title if it is empty
        if (!anchor.title) {
          anchor.title = titleValue;
        }
      });
    });
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = PrivateEye;
  } else {
    window.PrivateEye = PrivateEye;
  }
})();
