an Express / Node server assignment for Thinkful Web Dev bootcamp.

# Set-up
1. Clone repo
2.        npm install
3. create a .env file in the top level of the project with:
> NODE_ENV=development  
PORT=8000  
API_TOKEN= 123 (or create your own key)
4.        npm run dev


# How to use
A request must have a header containing:
    
    Authorization: Bearer 123 (or key created in step 3)

server will run on http://localhost:8000 or the port number specified in step 3. 

# Endpoints
## /bookmarks
### GET
returns a list of all bookmarks (there are 2 by default)
### POST
accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.

ex. In the body of the request:

    {
      "title": "something",
      "url": "http://www.something.com",
      "description": "this is a description for something",
      "rating": 3
    }

A unique ID will be added to each bookmark posted.

## /bookmarks/:id
### GET
Returns a single bookmark with the given ID, returns 404 Not Found if the ID is not valid

ex. GET /bookmarks/2 will return the pre-loaded bookmark that has an ID of 2.
### DELETE
Deletes a a single bookmark with the given ID, returns 404 Not Found if the ID is not valid

ex. DELETE /bookmarks/2 will delete the pre-loaded bookmark that has an ID of 2.

***
---
***

# This server created for the following Assignment:
Build an API for a Bookmarks client supporting GET, POST and DELETE.

## Requirements
1. Start a new application named bookmarks-server
2. Configure logging and API key handling middleware on the server
3. Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks
4. Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
5. Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
6. Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.