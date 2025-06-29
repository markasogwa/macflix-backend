# macflix-backend


# 🎬 Movie App Backend API Documentation

**Backend Stack**: Node.js, Express.js, MongoDB  
**Frontend**: React.js  
**External API**: [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)  
**Deployment**: Render  
**Database**: MongoDB Atlas  

---

## 🚀 Base URL

- **Production**: `https://<your-backend>.onrender.com/api`  
- **Local**: `http://localhost:5000/api`

---

## 🔐 Authentication

Uses **JWT** for authentication and authorization.

**Headers:**
```http
Authorization: Bearer <token>
```

---

## 🔑 Environment Variables

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
TMDB_API_KEY=<your_tmdb_api_key>
CLIENT_URL=http://localhost:3000
```

---

## 📦 Dependencies

- express  
- mongoose  
- jsonwebtoken  
- bcryptjs  
- dotenv  
- cors  
- axios  
- morgan (optional)

---

## 📘 API Endpoints

### 📍 Auth Routes

#### `POST /auth/register`
Registers a new user.

#### `POST /auth/login`
Authenticates user and returns a JWT.

---

### 👤 User Routes

#### `GET /user/profile`
Returns logged-in user's profile.  
**Headers:** `Authorization: Bearer <token>`

#### `PUT /user/profile`
Updates user's profile info.  
**Body (optional):**
```json
{
  "username": "newUsername",
  "bio": "Movie lover",
  "socialLinks": {
    "twitter": "@user"
  }
}
```

---

### 🎞️ Movie Routes (TMDB)

#### `GET /movie/popular`  
Returns popular movies.

#### `GET /movie/:id`  
Returns movie details by TMDB ID.

#### `GET /movie/:id/trailer`  
Returns the official trailer (YouTube link) if available.

#### `GET /movie/search?query=`  
Search movies by title.

#### `GET /movie/:id/recommendations`  
Recommended movies based on a movie ID.

#### `GET /movie/:id/credits`  
Returns cast and crew.

#### `GET /movie/genres`  
Returns available genres.

---

### ⭐ Watchlist and Favorites (Authenticated)

#### `POST /watchlist/:movieId`  
Add a movie to the watchlist.

#### `DELETE /watchlist/:movieId`  
Remove from watchlist.

#### `GET /watchlist`  
Get all watchlisted movies.

#### `POST /favorites/:movieId`  
Add a movie to favorites.

#### `GET /favorites`  
Get all favorite movies.

---

### 🗨️ Reviews (Authenticated)

#### `POST /review/:movieId`
```json
{
  "review": "Amazing movie!",
  "rating": 4.5
}
```

#### `PUT /review/:reviewId`  
Update a review.

#### `DELETE /review/:reviewId`  
Delete a review.

#### `GET /review/:movieId`  
Get all reviews for a movie.

---

## 🛡️ Middleware

- `protect`: JWT verification and attaches user to request.
- `errorHandler`: Global error handler.

---

## 🧪 Testing

Use [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest/) to test the API.  
**Note**: Authenticated routes require a Bearer token in the `Authorization` header.

---

## 📦 Deployment on Render

1. Push project to GitHub.
2. Create new Web Service on [Render](https://render.com).
3. Connect to the GitHub repo.
4. Add Environment Variables.
5. Set start command:
   ```bash
   npm start
   ```

---

## 🔄 CORS Configuration

```js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

## 📎 Sample `.env` File

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/movieapp
JWT_SECRET=somesecretvalue
TMDB_API_KEY=your_tmdb_key
CLIENT_URL=http://localhost:3000
```

---

## 📈 Future Improvements

- Add pagination to movie lists  
- Like/Dislike system for movies  
- Google/Facebook OAuth  
- Email notifications for trailers  
- Admin dashboard for managing users and reviews

---

## 📬 Contact

For support or questions, reach out to: **you@example.com**
