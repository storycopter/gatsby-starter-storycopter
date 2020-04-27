const React = require('react');

const Layout = require('./src/theme/partials/Layout.js').default;

exports.wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;
