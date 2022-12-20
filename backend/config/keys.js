module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === 'production',
  newyorktimesApiKey: process.env.NEWYORKTIMES_API_KEY,
  newsCatcherApiKey: process.env.NEWSCATCHER_API_KEY,
};
