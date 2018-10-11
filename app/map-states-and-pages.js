const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const {isDependencyNuiAndLocal} = require("./helpers.js");

const platformDirectory = "/Users/bi1w/repos/nui/platform";

function mapStatesAndPages(localAbsolutePaths, cb) {

    fs.readFile(path.resolve(platformDirectory, ".platformrc.json"), (err, file) => {
        if (err) {
            return;
        }

        const results = {};
        const platformExperiences = JSON.parse(file).experiences;
        _({
            ...platformExperiences[0].components,
            ...platformExperiences[0].state,
            ...platformExperiences[1].components,
            ...platformExperiences[1].state
        })
            .keys()
            .uniq()
            .forEach((dependency) => {
                if (isDependencyNuiAndLocal(dependency, localAbsolutePaths)) {
                    results[dependency] = localAbsolutePaths.find(relativePath => relativePath.includes(dependency.split("@nui")[1]));
                }
            });
        
        cb(results);
    });
}

const localRepos =[
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

module.exports = mapStatesAndPages;

mapStatesAndPages(localRepos, (results) => console.log(results));
