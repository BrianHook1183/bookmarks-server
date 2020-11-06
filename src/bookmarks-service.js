const BookmarksService = {
  // when this object is imported into another file (currently bookmarks-router but could change), 
  // the "knex" argument  will be passed in as  req.app.get('db')  where the 'db' property was added to the app object in server.js
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmarks');
  },
  // More methods will go here
};

module.exports = BookmarksService;