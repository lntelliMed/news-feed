# News Connect: Social network for discussing news!

Technologies used include React, Redux, Node.js, Semantic UI React

[See this app live!](https://newsapi-connect.herokuapp.com)

![alt text](screenshots/news-connect.png 'News Connect')

---

# Quick Start

### Either add a default.json file under config folder with the following,

```
{
  "newsApiKey": "<your_newsapi_key_from_https://newsapi.org>"
}
```

### or set an env variable called process.env.NEWS_API_KEY as in:

```bash
NEWS_API_KEY=<your_newsapi_key_from_https://newsapi.org>
```

### For backend, install server dependencies:

```bash
npm install
```

### For frontend, install client dependencies:

```bash
cd client
npm install
```

### Run both backend and frontend from root directory:

```bash
npm run dev
```

### To build for production:

```bash
cd client
npm run build
```

### To test production before deploy:

After running above client build command, cd into the root directory and run the following:

```bash
NODE_ENV=production node server.js
```

Check in browser on [http://localhost:3000/](http://localhost:3000/)

---

## About this app:

### Author

Sam Alsmadi

### Version

1.0.0

### License

This project is licensed under the MIT License

---

## TODO List:

- Add JWT Authentication
- Users will be able to login/signup and create their own profiles
- Use MongoDB to save articles instead of localStorage
- Add protected routes (e.g. save article, add comment, like/unlike news/comment, share news..)
- Address any bugs (e.g. those related to CRUD operations, overall state management/updates while changing routes..)
- etc.
