'use strict';

const FS = require('fs');
const PATH = require('path');
const MINIFY_HTML = require('html-minifier').minify;

// Get static path
const STATIC = __dirname + '/../../dist';

const HTML = getFile(PATH.resolve(STATIC, 'static/index-server.html'));
const INLINE_STYLE = getFile(PATH.resolve(STATIC, 'static/inline.css'));
const INLINE_SCRIPT = getFile(PATH.resolve(STATIC, 'static/inline.js'));
const SVG = getFile(PATH.resolve(STATIC, 'static/sprite.svg'));

const {default: App} = require(`${STATIC}/server/index`);
const {initialState} = require(`${STATIC}/server/store`);

// Get json serialize
const serialize = require('serialize-javascript');

// Import react decencies
const {createElement: h} = require('react');
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const {createStore} = require('redux');
const {Provider} = require('react-redux');

function getFile(path) {
  return FS.existsSync(path) ? FS.readFileSync(path, 'utf8') : '';
}

// React server side render method
function render({url}) {
  const context = {};

  const store = createStore((state) => JSON.parse(JSON.stringify(state)), {
    ...initialState,
    router: {
      ...initialState.router,
      location: url,
      modified: (new Date()).toISOString(),
    }
  });

  const result = renderToString(h(Provider, {store}, h(StaticRouter, {location: url, context}, h(App))));

  // Return current context, store and app html
  return {context, store, result};
}

// Export express subroutines
module.exports = (APP, RAVEN) => {
  // Use server side rendering as fallback for all routs
  APP.get('*', (req, res) => {
    try {
      // Server side render
      const {context, result, store} = render({
        url: req.url.replace('index.html', ''),
        csrf: req.csrfToken(),
        aside: true
      });

      if (context.url) {
        // If context contains redirect, go ot it
        res.redirect(302, context.url);
      } else {
        // Render html
        const html = MINIFY_HTML(
            HTML
            .replace(/%INLINE_STYLE%/ig, INLINE_STYLE)
            .replace(/%PRELOADED_STATE%/ig, serialize(store.getState()))
            .replace(/%INLINE_SCRIPT%/ig, INLINE_SCRIPT)
            .replace(/%SVG_SPRITE%/ig, SVG)
            .replace(/%APP%/ig, result),
            {
              removeComments: true,
              collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeAttributeQuotes: true,
              removeEmptyAttributes: true,
              minifyJS: true
            }
        );

        // Response rendered html
        res.set('content-type', 'text/html');
        res.send(html);
      }
    } catch (e) {
      console.log(e)
      res.writeHead(500);
      res.end();
    }
  });
};
