/**
 * @jest-environment jsdom
 */

const PrivateEye = require("./private-eye.js");

test('Adds the class private-link and title to matching urls', () => {
  // Set up our document body
  document.body.innerHTML = '<a href="http://example.com">link</a>'

  PrivateEye({
    ignoreUrls: ["http://example.com"]
  })
  const link = document.body.querySelector("a");

  expect(link.className).toEqual(expect.stringContaining("private-link"))
  expect(link.title).toEqual("This is a link to a private site, which may or may not be accessible to you.")
})

test('Does not override existing titles but still applies the class', () => {
  // Set up our document body
  document.body.innerHTML = '<a href="http://example.com" title="existing title">link</a>'

  PrivateEye({
    ignoreUrls: ["http://example.com"]
  });

  const link = document.body.querySelector("a");

  expect(link.className).toEqual(expect.stringContaining("private-link"))
  expect(link.title).toEqual("existing title")
})


test('Allows setting a default message', () => {
  // Set up our document body
  document.body.innerHTML = '<a href="http://example.com">link</a>'

  PrivateEye({
    ignoreUrls: ['http://example.com'],
    defaultMessage: 'custom message'
  })
  const link = document.body.querySelector('a');

  expect(link.className).toEqual(expect.stringContaining('private-link'))
  expect(link.title).toEqual('custom message')
})

test('Does not add the class private link to non-matching urls', () => {
  // Set up our document body
  document.body.innerHTML = '<a href="http://some-other-domain.com">link</a>'

  PrivateEye({
    ignoreUrls: ['http://example.com']
  })
  const link = document.body.querySelector('a');

  expect(link.className).toEqual('')
})

test('works with multiple links', () => {
  // Set up our document body
  document.body.innerHTML = '<a href="http://example.com">link</a> <a href="http://example.com/some-other-link">another-link link</a>'

  PrivateEye({
    ignoreUrls: ['http://example.com'],
    defaultMessage: 'custom message'
  })

  const links = document.body.querySelectorAll('a.private-link');

  expect(links.length).toEqual(2);
})

test('allows configuring custom messages for individual URLs', () => {
  document.body.innerHTML = '<a href="http://example.com">link</a> <a href="http://anoth.er/some-other-link">another-link link</a>';
  PrivateEye({
    ignoreUrls: [
      'http://example.com',
      {
        url: 'anoth.er',
        message: 'custom message'
      }
    ],
    defaultMessage: 'default message'
  });

  const links = document.body.querySelectorAll('a.private-link');
  expect(links[0].title).toEqual('default message');
  expect(links[1].title).toEqual('custom message');
});

test('setting a custom message for an individual URL doesnt override the title', () => {
  document.body.innerHTML = '<a href="http://anoth.er/" title="dont override me">link</a><a href="http://anoth.er/some-other-link">another-link link</a>';
  PrivateEye({
    ignoreUrls: [
      {
        url: 'anoth.er',
        message: 'custom message'
      }
    ]
  });

  const links = document.body.querySelectorAll('a.private-link');
  expect(links[0].title).toEqual('dont override me');
  expect(links[1].title).toEqual('custom message');
});


test('link matching is case insensitive', () => {
  document.body.innerHTML = '<a href="http://EXAMPLE.COM">link</a> <a href="http://anoth.er/some-other-link">another-link link</a>';
  PrivateEye({
    ignoreUrls: [
      'http://example.com',
      'aNoTh.Er'
    ]
  });

  const links = document.body.querySelectorAll('a.private-link');
  expect(links.length).toEqual(2);
});

test('only modifies links within wrapper', function(){
  document.body.innerHTML = '\
    <div class="wrapper"><a href="http://example.com/">link</a></div>\
    <a href="http://example.com/some-other-link">another-link link</a>\
  ';

  PrivateEye({
    wrapper: '.wrapper',
    ignoreUrls: [
      'http://example.com'
    ]
  });

  const links = document.body.querySelectorAll('a.private-link');
  expect(links.length).toEqual(1);
  expect(links[0].href).toEqual('http://example.com/');
});
