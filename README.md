# Alyansang Tapat sa Lasallista Forum Website
This a forum website for the oldest political organization of De La Salle University, Alyansang Tapat sa Lasallista (TAPAT). Tapat values "freedom of speech", thus, a forum would be an avenue for anyone to express their opinions about current social issues in our society today. With this, we carry with us the common goal of Tapat, which is to build a Just and Free Society. 

## How to run the web application
### MongoDB
#### Prerequisities
- [MongoDB](https://www.mongodb.com/download-center/community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass)
#### Setting up the database
1. Run **mongod.exe**.
2. Make a DB named **nodekb** in MongoDB Compass.
3. Import the JSON files using MongoDB Compass the three collections found in `\model` with the respective names: nodekb-users, nodekb-posts, nodekb-comments.
### Project Folder
1. Install dependencies on the **project** command line: `npm install`
2. Run index.js by executing `node index.js` on the command line. You should see the following:
```
App listening at port 3000
Connected to MongoDB
```
3. Go to http://localhost:3000/.

## Dependencies
- Body Parser
- Express
- Express Session
- HBS
- Moment
- MongoDB
- Mongoose
- Passport
- Passport Local
- Passport Local Mongoose
- Validator

## Authors
- Julianne Magbitang
- Gabriel Marcelo
- Carlo Santos
