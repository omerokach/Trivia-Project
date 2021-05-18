# Trivia-Project

## Link to the [app](https://firm-pentameter-312707.ew.r.appspot.com/)

## Setup & Instructions for local host

1. Import this repository into your account. Make sure to select the private option

2. Clone your new repository to your computer

3. Install the project dependencies by running `npm install` from the `root` folder, the `DB` folder and the `client` folder.

4. Create `.env` files in the `root` folder and the `DB` folder with the following variables:

   - `SECRET_KEY=""` , choose your secret key for jwt creation.
   - `DB_DATABASE=""` , write your db name that you created on mysql workbench.
   - `DB_PASSWORD=""` , write your mysql connection password
   - `DB_HOST=""` , write your mysql connection host

5. Open the file `config.js` from `DB/config/config.js` and delete the following line from all three objects: `socketPath: `.

6. In the terminal go do DB folder (`cd DB`) and run the following commends:

   - `npx sequelize db:migrate` // this will create the tables in your mysql workbench
   - `npx sequelize db:seed:all` // this will populate the tables with data

7. In the terminal go to the `root` folder (`cd ..`) and run `npm start`.

8. Open another terminal, go to the `client` folder (`cd client`), run `npm start` and this will open the trivia in the browser.

9. Now you can sign up and start playing this awesome game!

## Enjoy