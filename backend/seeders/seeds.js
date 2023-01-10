const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Group = require('../models/Group');
const Figure = require('../models/Figure');
const Article = require("../models/Article.js");

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 6;

// Create figures
const figureNames = [
  "Elon Musk", 
  "Jeff Bezos", 

  // "Lionel Messi", 
  // "Michael Jordan",

  "Joe Biden",
  "Donald Trump",
  "Kanye West"
];

const figures = [];
figureNames.forEach(name => {
  figures.push(
    new Figure({
      name: name
    })
  )
});

//Create articles
const articles = []
articles.push(
  new Article({
    headline: "How to Destroy a Brand, Musk Style",
    summary: "Does Elon know who buys his stuff?",
    source: "The New York Times",
    publishedDate: "2022-12-30 20:09:49",
    url: "https://www.nytimes.com/2022/12/30/opinion/elon-musk-tesla-democrats.html"
  })
)

articles.push(
  new Article({
    headline: "Jeff Bezos Says He Will Give Away Most of His Fortune",
    summary: "The Amazon founder, estimated to be worth $124 billion, suggested in an interview on CNN that he would donate most of his money to charity in his lifetime, the first time he had made such a pledge.",
    source: "The New York Times",
    publishedDate: "2022-11-14 13:25:27",
    url: "https://www.nytimes.com/2022/11/14/business/jeff-bezos-charity.html"
  })
)


articles.push(
  new Article({
    headline: "Elon Musk's Succession Plan Comes with Strings Attached",
    summary: "The Twitter owner has said he will resign as chief executive, but it's far from certain whether he would actually step down as the boss.",
    source: "The New York Times",
    publishedDate: "2022-12-21 12:40:02",
    url: "https://www.nytimes.com/2022/12/21/business/dealbook/elon-musk-twitter-ceo.html"
  })
)

// Create users
const users = [];
// Create groups
const groups = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    savedArticles: [articles[0]._id, articles[1]._id, articles[2]._id]
  })
)
groups.push(new Group({
  user: users[0]._id,
  figures: [figures[4]._id],
  name: "No group"
}))

// const groupNames = ["business", "sports", "politics"];
const groupNames = ["business", "politics"];

for (let i = 0; i < groupNames.length; i++) {
  groups.push(
    new Group({
      user: users[0]._id,
      name: groupNames[i],
      figures: [figures[i * 2]._id, figures[i * 2 + 1]._id]
    })
  )
}




// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users and everything else...");

  User.collection.drop()
                 .then(() => Article.collection.drop())
                 .then(() => Group.collection.drop())
                 .then(() => Figure.collection.drop())
                 .then(() => Article.insertMany(articles))
                 .then(() => User.insertMany(users))
                 .then(() => Figure.insertMany(figures))
                 .then(() => Group.insertMany(groups))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}