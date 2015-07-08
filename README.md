# JSConf 2015 React.js Training Workshop Code

This is the starter code for the Introduction / Getting started with React.js training workshop at JSConf 2015

This boilerplate code has these features:

 - **React.js JSX example which fetches from REST source and renders**
 - **simple build and auto rebuild** (watch) using npm run scripts
 - **browser-sync** for auto reloading in browser on change
 - **ES6/7 and JSX compiling** to ES5 with **babeljs**
 - **eslint** for linting
 - **browserify** (w/babelify) for bundling javascript for the browser
 - **watchify** to automatically rebuild on changes
 - **uglify** for js minification
 - **less** CSS style compiler
 - **autoprefixer** for automatically adding css prefixes
 - **cleancss** for css minification
 - **axios** for promise based HTTP client

Note: **Windows users** - use https://github.com/jeffbski/jsconf-react-win instead

Structure:

 - package.json - dependencies and build commands
 - public/index.html - main HTML
 - public/fake-api.json - mock REST api returning json data
 - src/browser.jsx - React.js JSX code which fetches REST data and renders into the main HTML
 - src/util/polyfill.js - Import any core-js or other polyfills here
 - assets/site.less - CSS styles used by site, edit or import into
 - bs-config.js - browser-sync config, set browser to launch, middleware implementing a REST api used for the app
 - dist/ - contains compiled and minified css and js

Branches:

Change branches to iterate through implementing features for the solution.

`git checkout stepX # iterate through solution`

 - master / step0
   - initial starting boilerplate
   - working autobuild react.js / babel dev environment
 - step1
   - fetch /pools
   - display all questions
   - shuffle-array
   - display first shuffled poll w/choices
 - step2
   - Display poll as form
   - Post { YOUR_ID: IDX } to `/polls/${id}`
   - that Returns poll result, display poll result
   - Use PieChart from react-d3-components to display
 - step3
   - Use state to display first poll
   - Use state to hold shuffled polls
   - Add next survey button which shifts poll
   - setState trigger update to show new poll
 - step4 / final
   - Add admin.html
   - Add conditional logic location.pathname = '/admin.html'
   - fetch /admin/polls, display all
   - Add question form
   - post { question: 'What', choices: [ 'Foo', 'Bar'] } to /polls

Notes:

 - My default browser for browser-sync is `Google Chrome`, if you want to use a different browser like `Google Chrome Canary` or `Mozilla Firefox` edit `bs-config.js`


## Installation

Requires node.js/iojs >= 0.10

```bash
npm install ## install dependent node modules
```

## Usage

Primary use - auto build and reload browser
```bash
node run watch # build and watch, auto recompile and load changes
# use control-c to exit the autobuild watch
```

Build only
```bash
node run build # build only
```

Build for Production
```bash
node run prod-build # sets NODE_ENV=production then builds
```


## More info

 - contact me via twitter @jeffbski  - <http://twitter.com/jeffbski>
 - Register for my membership list on http://codewinds.com/ to get notified about my upcoming React.js video training, podcast, and tutorials.

## License

 - [MIT license](http://github.com/jeffbski/jsconf-react/raw/master/LICENSE)
