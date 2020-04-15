# microblog

A server for managing blog posts.
It handles restful api requests (create, update, read, delete) by accepting JSON requests and responding with JSON responses.
The server is written in NodeJS and uses ATLAS MongoDB for saving blog posts.
It can be run with a docker-compose file.

## Docker

Building an image:  
docker-compose build  
Running a container:  
docker-compose up  
Stopping a container  
docker-compose down  

## API Recources:

* [GET /microblogs](#get-microblogs)
* [GET /microblogs/{blogId}](#get-microblogs-id)
* [POST /microblogs](#post-microblogs)
* [PUT /microblogs/{blogId}](#put-microblogs-id)
* [PATCH microblogs/{blogId}](#patch-microblogs-id)
* [DELETE /microblogs/{blogId}](#post-microblogs)
* [POST /microblogs/favorites?blogId={blogId}](#post-microblogs-favorites)
* [GET /microblogs/toptrending](#get-microblogs-toptrending)

### GET /microblogs  
Example: localhost:8010/microblogs  

Response:
```json
{
  "count": 2,
   "blogPosts": [
        {
            "_id": "12",
            "author": "JK Rowling ",
            "title": "Harry Potter and the Order of the Phoenix",
            "content": "Grimmauld Place",
            "datePosted": "2020-04-12T20:03:37.000Z",
            "likes": 9
        },
        {
            "_id": "34",
             "author": "JK Rowling",
             "title": "Harry Potter and the Philosopher's Stone",
             "content": "Harry Potter was a wizard",
             "datePosted": "2020-04-12T20:03:15.000Z",
              "likes": 0
        }
    ]
}
```

### GET /microblogs/{blogId}  
Example: localhost:8010/microblogs/12  

Response:
```json
{
  "_id": "12",
  "author": "JK Rowling ",
  "title": "Harry Potter and the Order of the Phoenix",
  "content": "Grimmauld Place",
  "datePosted": "2020-04-12T20:03:37.000Z",
  "likes": 9
}
 ```
        
### POST /microblogs  
Example: localhost:8010/microblogs  

Request:
```json
{
  "author" : "JK Rowling",
  "title" : "Harry Potter and the Order of the Phoenix",
  "content" : "This post is about a wizard"
}
```

**Fields "author", "title", "content" are mandatory.**

Response:
```json
{
    "message": "You have successfully added blog post",
    "blogPost": {
        "_id": "12",
        "author": "JK Rowling",
        "title": "Harry Potter and the Order of the Phoenix",
        "content": "This post is about a wizard",
        "datePosted": "2020-04-15T16:32:53.000Z",
        "likes": 0
    }
}
```

### PUT /microblogs/{blogId}  
Example: localhost:8010/microblogs/12  

Request:
```json
{
  "author" : "J.K Rowling",
  "title" : "Harry Potter and the Order of the Phoenix",
  "content" : "This post is about a wizard"
}
```

**Fields "author", "title", "content" are mandatory.**  
**Note - if id is wrong, a new post is added to the database with the JSON details.**  

Response:
```json
{
    "message": "You have successfully updated blog post",
    "blogPost": {
        "_id": "5e973735af30e9001739a5b3",
        "author": "fdf",
        "title": "dfds",
        "content": "dfds",
        "datePosted": "2020-04-15T16:32:53.000Z",
        "likes": 0
    }
}
```

### PATCH /microblogs/{blogId}  
Example: localhost:8010/microblogs/12  

Request:
```json
{
  "author" : "J.K Rowling"
}
```

**One of the fields "author", "title", "content" should be part of the request.**  

Response:
```json
{
    "message": "You have successfully updated blog post",
    "blogPost": {
        "_id": "12",
        "author": "J.K Rowling",
        "title": "Harry Potter and the Order of the Phoenix",
        "content": "This post is about a wizard",
        "datePosted": "2020-04-15T16:32:53.000Z",
        "likes": 0
    }
}
```

### DELETE /microblogs/{blogId}  
Example: localhost:8010/microblogs/12  

Response:
```json
{
    "message": "You have successfully deleted blog post"
}
```

### POST /microblogs/favorites?blogId={blogId}  
Example: localhost:8010/microblogs/favorites?blogId=12  

Response:
```json
{
    "message": "You have successfully liked this post",
    "blogPost": {
        "_id": "12",
        "author": "J.K Rowling",
        "title": "Harry Potter and the Order of the Phoenix",
        "content": "This post is about a wizard",
        "datePosted": "2020-04-15T16:32:53.000Z",
        "likes": 1
    }
}
```

### GET /microblogs/toptrending  
Example: localhost:8010/microblogs/toptrending  

Response:
```
{
    "count": 2,
    "blogPosts": [
        {
            "_id": "12",
            "author": "JK Rowling ",
            "title": "Harry Potter and the Order of the Phoenix",
            "content": "Grimmauld Place",
            "datePosted": "2020-04-12T20:03:37.000Z",
            "likes": 9
        },
        {
            "_id": "34",
            "author": "JK Rowling",
            "title": "Harry Potter and the Philosopher's Stone",
            "content": "Harry Potter was a wizard",
            "datePosted": "2020-04-12T20:03:15.000Z",
            "likes": 0
        }
    ]
}
```
