# Keep-Clone

## Description

A clone of Google Keep.

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
- [MUI](https://mui.com/)

## Run Locally

In order to run this application locally, you must have node installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have node, you can install it here: https://nodejs.org/en/

Once you have confirmed that node is installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/keep-clone.git`

Then `cd` into the root folder and open it in your code editor. For Visual Studio Code:

`cd keep-clone`
`code .`

Next, follow these steps to set up a free database with MongoDB Atlas:

https://docs.atlas.mongodb.com/getting-started

- When adding a connection IP address, click Allow Access from Anywhere or add the following IP address: `0.0.0.0/0`
- Make sure to save your username and password when creating a database user. 
- For connection method, I recommend clicking on MongoDB Compass. Installing and using MongoDB Compass is optional, but clicking on a connection method will show you your database connection string.

In the root folder of your app, create a new file called `.env` and save your connection string in it with a key of DB. Make sure to replace the password variable with your database user password. Your username should already be populated. The file should now look something like this:

`DB = mongodb+srv://demoUser:12345pass@cluster0.ywxa5.mongodb.net/test`

There should be no quotation marks or brackets in this file.

Next, install all of the required dependencies for both the root folder and the client folder. `cd` into the client folder and run `npm install` Then return to the root folder and run `npm install` again.

To start up the app, make sure you are in the root folder and then run `npm run dev` in your terminal. This should start both your app's server and front end in a single terminal window, and launch the app in a new browser tab. You are now running the app locally!

Test the app by adding, deleting, and editing notes. Notes should appear in your MongoDB cluster as they are added (you may need to refresh the database page).
