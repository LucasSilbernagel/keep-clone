# Keep-Clone

A clone of Google Keep built with the MERN stack. Replicates the web app on larger screens and the mobile app on smaller screens.

<img width="1421" alt="Screenshot of the Keep Clone app" src="https://user-images.githubusercontent.com/57023164/179433616-2da2d9be-536e-4f68-8e52-d395b52af4c4.png">

## Features

- Create, edit, copy, pin, and delete the following note types:
  - Text notes
  - Checklists
  - Drawings
  - Audio recordings
  - Images
- Batch select notes to copy or delete
- Note editing modal indicates when the note was last edited
- Search filter
- Button to manually refresh the app
- Toggle between grid view and list view
- Toggle between dark theme and light theme
- Google authentication, with Google account information displayed

## Live Link

[https://lucas-silbernagel-keep-clone.herokuapp.com/](https://lucas-silbernagel-keep-clone.herokuapp.com/)

## Tech Stack

### Database

- [MongoDB](https://www.mongodb.com/)

### Server

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)

### Front End

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [javascript-time-ago](https://www.npmjs.com/package/javascript-time-ago)
- [react-time-ago](https://www.npmjs.com/package/react-time-ago)
- [lodash.clonedeep](https://www.npmjs.com/package/lodash.clonedeep)
- [lucas-silbernagel-react-audio-recorder
](https://www.npmjs.com/package/lucas-silbernagel-react-audio-recorder)
- [lucas-silbernagel-react-canvas-draw
](https://www.npmjs.com/package/lucas-silbernagel-react-canvas-draw)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [focus-trap-react](https://www.npmjs.com/package/focus-trap-react)

### State Management

- [Recoil](https://recoiljs.org/)

### Authentication

- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)

### Linting & Formatting

- [eslint-config-lucas-silbernagel](https://www.npmjs.com/package/eslint-config-lucas-silbernagel)

### Code Analysis

- [SonarCloud](https://sonarcloud.io/)

## Run Locally

### Prerequisites

In order to run this application locally, you must have node installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have node, you can install it here: https://nodejs.org/en/

### Clone the repository

Once you have confirmed that node is installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/keep-clone.git`

Then `cd` into the root folder and open it in your code editor. For Visual Studio Code:

`cd keep-clone`
`code .`

### Set up a free database with MongoDB Atlas

Follow these steps: [https://docs.atlas.mongodb.com/getting-started](https://docs.atlas.mongodb.com/getting-started)

- When adding a connection IP address, click Allow Access from Anywhere or add the following IP address: `0.0.0.0/0`
- Make sure to save your username and password when creating a database user.
- For connection method, I recommend either `Connect your application` or `MongoDB Compass`. Installing and using MongoDB Compass is optional, but choosing either connection method will show you your database connection string, which you need to save.

In the root folder of your app, create a new file called `.env` and save your connection string in it with a key of DB. Make sure to replace the password variable with your database user password. Your username should already be populated. The file should now look something like this:

`DB = mongodb+srv://demoUser:12345pass@cluster0.ywxa5.mongodb.net/test`

There should be no quotation marks or brackets in this file.

### Set up Google authentication

Users will log into the app using their Google account. For the authentication to work, you need to [get a Google API client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid). Then in the client folder of the app, create another `.env` file. In this file, put your Google client ID with a key of `REACT_APP_GOOGLE_CLIENT_ID`. The file should now look something like this:

`REACT_APP_GOOGLE_CLIENT_ID = XXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com`

There should be no quotation marks or brackets in this file.

### Install dependencies

To install all of the required dependencies, run `npm run installDeps`.

### Additional environment variables

A custom ESLint configuration has been added to the root folder of the app rather than the client folder. As a result, conflicts can occur between the custom ESLint configuration and the ESLint configuration built into `create-react-app`. In order for the app to run and build smoothly, add the following additional variables to the `.env` file in the `client` folder:

```
SKIP_PREFLIGHT_CHECK = true

DISABLE_ESLINT_PLUGIN = true
```

### Start up the app

To start up the app, make sure you are in the root folder and then run `npm run dev` in your terminal. This should start both the app's server and the front end in a single terminal window, and launch the app in a new browser tab. You are now running the app locally!

## Testing

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

Use `npm run test:unit` to run all unit tests, or `cd` into the client folder and use `npm test -- SomeFileToRun` to run a specific test file.

## Component Documentation

Components are visually documented with [Storybook](https://storybook.js.org/).

Use `npm run storybook` to launch Storybook locally, or [visit this link](https://62de0039a0287437701c3efb-xuuvnppdcu.chromatic.com/?path=/story/about--page) to view the published Storybook page.