const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers");

function findDependenciesForModule(absolutePath, localRepos, cb) {
    fs.readFile(path.resolve(absolutePath, "package.json"), (err, results) => {
        if (err) {
            return;
        }

        const dependencies = JSON.parse(results).dependencies;

        cb(
            _(dependencies)
                .keys()
                .filter((dependencyName) => isDependencyNuiAndLocal(dependencyName, localRepos))
                .value()
        );

    });
}
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

findDependenciesForModule(localRepos[9], localRepos, (results) => console.log(results));
