System.config({
  defaultJSExtensions: false,
  transpiler: false,
  meta: {
    "*.css": {
      loader: "css"
    }
  },
  map: {
    "css": "/cdn/systemjs/plugin-css/css-0.1.20.js",
    "lodash": "/cdn/lodash.js/3.9.3/lodash.js",
    "redux": "/cdn/redux/3.3.1/redux.js",
    "react": "/cdn/react/0.14.6/react.js",
    "react-dom": "/cdn/react/0.14.6/react-dom.js",
    "react-redux": "/cdn/react-redux/4.4.0/react-redux.js"
  }
});
