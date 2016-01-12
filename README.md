# Private Eye

A JavaScript plugin to warn users about links to private pages. Places a lock icon next to any links that you specify as private.

## Usage

Compatible with modern browsers (IE 9+).

```html
<script src="private-eye.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    PrivateEye({
      // list of URLs to match as substrings
      ignoreUrls: [
        'http://so.me/private/url',
        'anoth.er',
        ...
      ]
    });
  }, false );
</script>
```
