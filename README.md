
Node.js HTTP server

Node.js HTTP Blog Server
This is a simple HTTP server built with Node.js that allows to perform CRUD operations (Create, Read, Update, Delete) on a collection of blog posts stored in a JSON file.

Features
GET /blog-posts: Retrieve all blog posts.
![Screenshot 2024-05-15 140915](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/04ec49cb-e755-49e9-86f1-0932b2aa2ff0)

GET /blog-posts/:id: Retrieve a specific blog post by ID.
![Screenshot 2024-05-15 140933](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/c988b066-06c8-47dd-b230-09d0bed0c334)

POST /blog-posts: Create a new blog post.
![Screenshot 2024-05-15 141013](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/57235f57-a76a-4ea7-a359-8d6a1edbc618)

PUT /blog-posts/:id: Update an existing blog post.
![Screenshot 2024-05-15 142913](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/35e3383f-2c62-4050-9923-3ffeeb4586d0)

PATCH /blog-posts/:id: Partially update an existing blog post.
![Screenshot 2024-05-15 141130](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/99b6f672-1367-4e4b-94fd-d67664bdd1ec)

DELETE /blog-posts/:id: Delete a blog post.
![Screenshot 2024-05-15 141213](https://github.com/Tshewangdorji7257/02230312_WEB102_PA1/assets/141105711/53a9bf08-1bbe-40bc-9471-2d930235c1d2)


Prerequisites
Node.js installed on machine.

Getting Started
Clone this repository to local machine.
Navigate to the project directory.
Install dependencies using npm install.
Run the server using node index.js.
The server will be running on port 3000 by default. it can change the port in the index.js file if needed.

Usage
It can interact with the server using any HTTP client (e.g., cURL, Postman, browser).

Example cURL commands:

Get all blog posts:
http://localhost:3000/blog-posts
Get a specific blog post:

http://localhost:3000/blog-posts/:id
Create a new blog post:

-X POST -H "Content-Type: application/json" -d '{"title": "New Post", "content": "Lorem ipsum"}' http://localhost:3000/blog-posts
Update an existing blog post:

-X PUT -H "Content-Type: application/json" -d '{"title": "Updated Title", "content": "Updated content"}' http://localhost:3000/blog-posts/:id
Partially update an existing blog post:

-X PATCH -H "Content-Type: application/json" -d '{"title": "Updated Title"}' http://localhost:3000/blog-posts/:id
Delete a blog post:

-X DELETE http://localhost:3000/blog-posts/:id
