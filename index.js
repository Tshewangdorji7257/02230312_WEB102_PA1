// Import required modules
const http = require('http'); // HTTP module for creating server
const fs = require('fs'); // File system module for reading and writing files

const PORT = 3000;

// Define the blog post resource
const blogPosts = JSON.parse(fs.readFileSync('blog-posts.json', 'utf-8')) || [];

// Function to save blog posts to the JSON file
function saveBlogPosts() {
  fs.writeFileSync('blog-posts.json', JSON.stringify(blogPosts, null, 2));
}

// HTTP server
const server = http.createServer((req, res) => {
  // Set the content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Parse the request URL
  const { url, method } = req;
  const parts = url.split('/');
  const id = parts[2];

  try {
    // Handle different HTTP methods
    switch (method) {
      case 'GET':
        if (url === '/blog-posts') {
          // Get all blog posts
          res.statusCode = 200;
          res.end(JSON.stringify(blogPosts));
        } else if (id) {
          // Get a specific blog post
          const post = blogPosts.find((p) => p.id === id);
          if (post) {
            res.statusCode = 200;
            res.end(JSON.stringify(post));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Blog post not found' }));
          }
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
        break;
      case 'POST':
        if (url === '/blog-posts') {
          // Create a new blog post
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const newPost = JSON.parse(body);
            newPost.id = String(blogPosts.length + 1);
            blogPosts.push(newPost);
            saveBlogPosts();
            res.statusCode = 201;
            res.end(JSON.stringify(newPost));
          });
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
        break;
      case 'PUT':
        if (id) {
          // Update an existing blog post
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const updatedPost = JSON.parse(body);
            updatedPost.id = id;
            const index = blogPosts.findIndex((p) => p.id === id);
            if (index !== -1) {
              blogPosts[index] = updatedPost;
              saveBlogPosts();
              res.statusCode = 200;
              res.end(JSON.stringify(updatedPost));
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Blog post not found' }));
            }
          });
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
        break;
      case 'PATCH':
        if (id) {
          // Partial update of an existing blog post
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const partialUpdate = JSON.parse(body);
            const index = blogPosts.findIndex((p) => p.id === id);
            if (index !== -1) {
              const existingPost = blogPosts[index];
              const updatedPost = { ...existingPost, ...partialUpdate };
              blogPosts[index] = updatedPost;
              saveBlogPosts();
              res.statusCode = 200;
              res.end(JSON.stringify(updatedPost));
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Blog post not found' }));
            }
          });
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
        break;
      case 'DELETE':
        if (id) {
          // Delete a blog post
          const index = blogPosts.findIndex((p) => p.id === id);
          if (index !== -1) {
            const deletedPost = blogPosts.splice(index, 1)[0];
            saveBlogPosts();
            res.statusCode = 200;
            res.end(JSON.stringify(deletedPost));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Blog post not found' }));
          }
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
        break;
      default:
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Invalid request' }));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
