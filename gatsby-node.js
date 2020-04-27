const path = require('path');
const _ = require('lodash');

// exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
//   const config = getConfig();
//   config.resolve.alias = {
//     ...config.resolve.alias,
//     react: path.resolve('./node_modules/react'),
//     'react-dom': path.resolve('./node_modules/react-dom'),
//   };
// actions.setWebpackConfig({
//   resolve: {
//     modules: [path.resolve(__dirname, 'src/theme'), 'node_modules'],
//   },
// });
// };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const tpls = {
    page: path.resolve(__dirname, 'src/theme/templates/PageTpl.js'),
    contents: path.resolve(__dirname, 'src/theme/templates/ContentsTpl.js'),
    credits: path.resolve(__dirname, 'src/theme/templates/CreditsTpl.js'),
    error: path.resolve(__dirname, 'src/theme/templates/ErrorTpl.js'),
    home: path.resolve(__dirname, 'src/theme/templates/HomeTpl.js'),
  };

  const allEssentials = await graphql(`
    {
      allEssentialsJson(filter: { meta: { uid: { ne: "schema" } } }) {
        edges {
          node {
            meta {
              path
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allPages = await graphql(`
    {
      allPagesJson(filter: { meta: { uid: { ne: "schema" } } }, sort: { fields: meta___order }) {
        edges {
          node {
            meta {
              coverEnabled
              coverImage {
                name
              }
              order
              path
              summary
              title
              uid
            }
          }
        }
      }
    }
  `);
  const allSiteData = await graphql(`
    {
      allSiteJson(filter: { meta: { uid: { ne: "schema" } } }) {
        edges {
          node {
            meta {
              coverEnabled
              coverImage {
                name
              }
              publisher
              summary
              title
              uid
            }
            brand {
              backgColor
              brandColor
              faviconEnabled
              logoEnabled
              favicon {
                name
              }
              logo {
                name
              }
              textColor
              typography
            }
            motivation {
              enabled
              label
              link
            }
            sound {
              enabled
              track {
                name
              }
            }
          }
        }
      }
    }
  `);

  const creators = [
    {
      gql: 'allEssentialsJson',
      src: allEssentials,
      tpl: null,
    },
    {
      gql: 'allPagesJson',
      src: allPages,
      tpl: tpls.page,
    },
  ];

  creators.forEach(creator => {
    const { edges } = creator.src.data[creator.gql];
    edges.forEach(({ node }) => {
      const { path, uid } = node.meta;
      createPage({
        component: creator.tpl || tpls[uid],
        context: {
          uid,
          allEssentials: allEssentials.data.allEssentialsJson.edges.map(o => o.node.meta),
          allPages: allPages.data.allPagesJson.edges.map(o => o.node.meta),
          allSiteData: allSiteData.data.allSiteJson.edges.map(o => o.node)[0],
        },
        path: path,
      });
    });
  });
};
