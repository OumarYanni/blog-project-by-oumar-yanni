# blog-project-by-oumar-yanni

# I use all the latest JavaScript features to create a functional blog :
In this project, I'm not going to make a Single Page Application like I would with a framework (Angular, Vue.js and React).

The aim is not to recode a framework, but to master Webpack and a vanilla JavaScript project (without a framework).

I'd like to create an application with several HTML pages and therefore several Webpack bundles.

The aim is that, when the user navigates the site, only the CSS, JavaScript and HTML corresponding to the page are sent.

I don't want all the pages to be in a single bundle that I send, as this would degrade performance.

To achieve this, we need to configure Webpack to send exactly one bundle per page.
