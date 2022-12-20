const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Group = require('../models/Group');
const Figure = require('../models/Figure');
const Article = require("../models/Article.js");

const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_TWEETS = 30;

// Create figures
const figureNames = [
  "Elon Musk", 
  "Jeff Bezos", 

  "Lionel Messi", 
  "Michael Jordan",

  "Joe Biden",
  "Donald Trump"
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
for(let i = 0; i < 18; i++){
  articles.push(
    new Article({
      headline: `Example${i}`,
      summary: `Summary${i}`,
      source: `nairaland`,
      publishedDate: "2022-12-16 15:00:59",
      url: `http://www.nairaland.com/7483666/elon-musk-disables-twitter-spaces`,
      figure: figures[i % 6].id
    })
  )
}

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
  figures: [],
  name: "No group"
}))

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      savedArticles: [articles[3]._id]
    })
  )
  groups.push(new Group({
    user: users[users.length - 1]._id,
    figures: [],
    name: "No group"
  }))
}

const groupNames = ["business", "sports", "politcs"];
for (let i = 0; i < groupNames.length; i++) {
  groups.push(
    new Group({
      user: users[i]._id,
      name: groupNames[i],
      figures: [figures[i * 2]._id, figures[i * 2 + 1]._id]
    })
  )
}

// Create tweets
const tweets = [];

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet ({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
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
  console.log("Resetting db and seeding users and tweets...");

  User.collection.drop()
                 .then(() => Article.collection.drop())
                 .then(() => Tweet.collection.drop())
                 .then(() => Group.collection.drop())
                 .then(() => Figure.collection.drop())
                 .then(() => Article.insertMany(articles))
                 .then(() => User.insertMany(users))
                 .then(() => Tweet.insertMany(tweets))
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