const React = require('react');
const ReactDOM = require('react-dom');

const Layout = require('./src/templates/partials/Layout.js').default;

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback);
  };
};

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
