function makeBookmarksArray() {
  return [
    {
      "id": 1,
      "b_title": "example",
      "b_url": "example.com",
      "b_description": "this is an example description",
      "b_rating": 3
    },
    {
      "id": 2,
      "b_title": "test",
      "b_url": "test.com",
      "b_description": "this is a test description",
      "b_rating": 4
    },
    {
      "id": 3,
      "b_title": "something",
      "b_url": "something.com",
      "b_description": "this is a something description",
      "b_rating": 1
    },
    {
      "id": 4,
      "b_title": "ejemplo",
      "b_url": "ejemplo.com",
      "b_description": "this is an ejemplo description",
      "b_rating": 5
    },
  ];
};

module.exports = {
  makeBookmarksArray,
};