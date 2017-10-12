# Private Eye

![detective image](assets/img/detective.png)

<!-- c/o https://pixabay.com/en/detective-male-man-profile-156465/ -->

A JavaScript plugin to warn users about links to private pages. Places a :lock: icon next to any links with any URLs that you specify as private, and gives a warning message.

At 18F, this is used on public sites that contain links to internal content like private GitHub repositories or Google Docs. Rather than write two versions to redact those links, this allows us to publish new content and give a warning to both staff and external readers.

## Installation

Compatible with modern browsers (IE 9+). No dependencies.

### Script

Private Eye can be included as a normal script on your page, exposing a `PrivateEye` global.

```html
<script src="private-eye.js" defer></script>
```

### CommonJS

Private Eye supports CommonJS, and is thus compatible with [Browserify](http://browserify.org/), [WebPack](https://webpack.github.io/), etc.

1. Install the module.

    ```bash
    npm install --save @18f/private-eye
    ```

1. Include in your application:

    ```javascript
    var PrivateEye = require('private-eye');
    ```

## Basic Usage

To get started using Private Eye, initialize `PrivateEye` with an object
containing an `ignoreUrls` property with a list of URLs to match.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  PrivateEye({
    // list of URLs to match as substrings – can be full URLs, hostnames, etc.
    ignoreUrls: [
      'http://so.me/private/url',
      'anoth.er',
      // ...
    ]
  });
}, false );
```

## Advanced Usage

Private Eye supports custom messages for links.
The examples below provide different ways to customize a URL's messaging from
general to granular.

### Reconfiguring the default message

The default message given to links can be configured across all private urls by
passing in an option named `defaultMessage`. This property is added to the
object passed into `PrivateEye( { /*...*/ } );`.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  PrivateEye({
    // Update the default message to a custom `string`.
    defaultMessage: "This link is secured, please ensure you have the proper credentials to access it."
    ignoreUrls: [
      'http://so.me/private/url',
      'anoth.er',
      // ...
    ]
  });
}, false );
```

In the example above, all URLs matched by `ignoreURLs` will have the customized
`defaultMessage` as the message the user sees when they hover over the link.

### Configuring custom messages for individual URLs

Custom messaging is supported on a per-URL basis as well. This is done by
passing an object in the `ignoreUrls` array with a `url` and `message` property
for the URL to match and the message to display respectively.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  PrivateEye({
    ignoreUrls: [
      'http://so.me/private/url',
      // Custom messages for individual URLs are passed in as an object.
      {
        url: 'anoth.er',
        message: 'This is another link that may not be accessible to you without the proper credentials',
      },
      // ...
    ]
  });
}, false );
```

In the example above, the URL matches for `http://so.me/private/url` will have
the base default message. The URL matches for `anoth.er` will have a specific
custom message for _only_ those individual matches.

### Using HTML to configure granular individual custom messages.

Custom messaging is supported on a per-element basis. If a `title` attribute is
found on any matched `anchor`, the default or custom messaging is never set on
the `anchor`.  The original `title` attribute is left unmodified. This can be
used to customize individual `anchor` elements on a more granular level.

```javascript
// Set up for the plugin is the same as "Basic Usage" above.
document.addEventListener('DOMContentLoaded', function() {
  PrivateEye({
    // list of URLs to match as substrings – can be full URLs, hostnames, etc.
    ignoreUrls: [
      'http://so.me/private/url',
      'anoth.er',
      // ...
    ]
  });
}, false );
```

```html
<!-- Base, or configured, default messaging for this link. -->
<a href="http://so.me/private/url">A private URL</a>
<!-- Granluar custom message for only this specific element. -->
<a href="http://so.me/private/url" title="This link is still private and you may not have access to it.">Another private URL</a>
```

In the example above, the customized message is set as a `title` attribute on
one of the matched `anchor` elements. The first match without a `title`
attribute will have the base default message. The second match with a `title`
attribute will have the custom message found in `title`. This use case is
particularly useful if you HTML page already contains valuable messaging around
private URLs, or if you'd like to configure the messaging without the need of
using JavaScript.

### Target specfic section of the page

To only add the private icon lock onto the a specfic section of the page, pass in a CSS selector via the `wrapper` option.

```js
document.addEventListener('DOMContentLoaded', function() {
  PrivateEye({
    // using the wrapper propety on the opts object - here, limiting to links under a tag with a "private" class"
    wrapper: '.private',
    // list of URLs to match as substrings – can be full URLs, hostnames, etc.
    ignoreUrls: [
      'http://so.me/private/url',
      'anoth.er',
      // ...
    ]
  });
}, false );
```

```html
<div class="private">
    <a href="http://so.me/private/url">A private URL that will get a lock</a>
</div>
<a href="http://so.me/private/url">A private URL that will not get a lock</a>
```
