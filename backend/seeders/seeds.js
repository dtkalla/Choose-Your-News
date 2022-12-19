const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Group = require('../models/Group');
const Figure = require('../models/Figure');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_TWEETS = 30;
const NUM_SEED_GROUPS = 1;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
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

// Create figures
const figures = [];

figures.push(
  new Figure({
    name: "Elon Musk"
  })
)

figures.push(
  new Figure({
    name: "Kanye West"
  })
)

figures.push(
  new Figure({
    name: "Jeff Bezos"
  })
)

figures.push(
  new Figure({
    name: "Lionel Messi"
  })
)

figures.push(
  new Figure({
    name: "Michael Jordan"
  })
)

// Create groups
const groups = [];

// for (let i = 0; i < NUM_SEED_GROUPS; i++) {
//   groups.push(
//     new Group({
//       user: users[0]._id,
//       name: "business",
//       figures: [],
//       shared: true
//     })
//   )
// }

groups.push(
  new Group({
    user: users[0]._id,
    name: "business",
    figures: [figures[0]._id, figures[2]._id],
    shared: true
  })
)

groups.push(
  new Group({
    user: users[0]._id,
    name: "sports",
    figures: [figures[3]._id, figures[4]._id],
    shared: true
  })
)

groups.push(
  new Group({
    user: users[1]._id,
    name: "politics",
    figures: [figures[1]._id],
    shared: true
  })
)
    
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
                 .then(() => Tweet.collection.drop())
                 .then(() => Group.collection.drop())
                 .then(() => Figure.collection.drop())
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