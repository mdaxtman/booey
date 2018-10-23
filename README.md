# Booey

## Quick Start

1. Clone down the Booey Repo and `cd booey`
2. Run `npm install`
3. Run `npm run build`
4. Run `npm run start`
5. Booey runs locally on port 3131. The ui should open a new tab or you can navigate to localhost:3131 in your browser.

##Using Booey
1. Add your nui repos to booey by entering in the absolute path to the repos into the "nui repos directory" input. 
    Adding a path to a single repo (ie `/Users/MyAccount/MyNuiComponents/NameOfComponent`)

    you can add multiple repos by entering the folder name (ie `/Users/MyAccount/MyNuiComponents`). Booey will only pull in nui components. Or if you would only like to add a select few components and not all the nui components in a folder

Click the "refresh repos" button and all your nui repos will populate below.
2. Add your platform file to booey by entering the absolute path to your platform file in the "platform directory" input. From here you can run the commands `./install` by clicking on the "clean/install" button or `npm run build && npm run start` by clicking on the "build/start" button. You'll be able to see your commands run in the terminal below the input.
3. Now that you have added your nui repos and the platform repo, you can copy your local code over to the platform by clicking "build & copy -> build & start" next to on of your repos OR select multiple repo and click the "Build & Copy selected" button above your list of repos. You'll be able to see the commands running in the terminal on the right of your page or in your terminal locally.

##Contributing to Booey

###Running Tests
1. Run `npm run test`