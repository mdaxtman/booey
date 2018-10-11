const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers.js");

function findDependenciesForStatesAndPages(map, localPaths, cb) {
    const mapOfDependencies = {};
    const localPathsSet = new Set(localPaths.map(localPath => path.basename(localPath)));
    let count = Object.keys(map).length;

    _.forEach(map, (absPath, dependencyName) => {
        fs.readFile(path.resolve(absPath, "package.json"), (err, contents) => {
            --count;

            if (err) {
                return;
            }

            mapOfDependencies[dependencyName] = 
                _(JSON.parse(contents).dependencies)
                    .omitBy((version, dependency) => !isDependencyNuiAndLocal(dependency, localPaths))
                    .keys()
                    .value();
            
            if (!count) {
                cb(mapOfDependencies);
            }
        });
    });
}

const statesAndPagesMap = {
    '@nui/looks-page': '/Users/bi1w/repos/nui/looks-page',
    '@nui/product-page': '/Users/bi1w/repos/nui/product-page',
    '@nui/your-look': '/Users/bi1w/repos/nui/your-look',
    '@nui/store-and-events-page': '/Users/bi1w/repos/nui/store-and-events-page',
    '@nui/store-details-page': '/Users/bi1w/repos/nui/store-details-page',
    '@nui/looks-shelf': '/Users/bi1w/repos/nui/looks-shelf',
    '@nui/state-looks': '/Users/bi1w/repos/nui/state-looks',
    '@nui/state-product-page': '/Users/bi1w/repos/nui/state-product-page',
    '@nui/state-selling-essentials': '/Users/bi1w/repos/nui/state-selling-essentials'
};

const localRepos = [
    '/Users/bi1w/repos/nui/drop-down-menu',
    '/Users/bi1w/repos/nui/dropdown-menu',
    '/Users/bi1w/repos/nui/example',
    '/Users/bi1w/repos/nui/iconography',
    '/Users/bi1w/repos/nui/international-shipping-modal',
    '/Users/bi1w/repos/nui/looks-page',
    '/Users/bi1w/repos/nui/looks-shelf',
    '/Users/bi1w/repos/nui/pdp-quantity-input',
    '/Users/bi1w/repos/nui/product-page',
    '/Users/bi1w/repos/nui/product-page-banners',
    '/Users/bi1w/repos/nui/product-page-buttons-and-tooltips',
    '/Users/bi1w/repos/nui/product-page-price-lockup',
    '/Users/bi1w/repos/nui/product-page-product-title-lockup',
    '/Users/bi1w/repos/nui/product-page-sku-filters',
    '/Users/bi1w/repos/nui/product-page-swatches',
    '/Users/bi1w/repos/nui/scrollbar',
    '/Users/bi1w/repos/nui/state-looks',
    '/Users/bi1w/repos/nui/state-product-page',
    '/Users/bi1w/repos/nui/state-product-page-styles-by-id',
    '/Users/bi1w/repos/nui/state-selling-essentials',
    '/Users/bi1w/repos/nui/store-and-events-page',
    '/Users/bi1w/repos/nui/store-details-page',
    '/Users/bi1w/repos/nui/touch-target',
    '/Users/bi1w/repos/nui/your-look'
];

findDependenciesForStatesAndPages(statesAndPagesMap, localRepos, (results) => console.log(results));

module.exports = findDependenciesForStatesAndPages;
