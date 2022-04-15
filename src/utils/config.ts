const PORT = process.env.PORT

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.yalci.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const AUTH_SECRET = "super-secret-key"

const DEV_CLIENT_API_URL = 'http://localhost:3000';

const IS_DEV_ENV = process.env.NODE_ENV === "development";

export default {
  DEV_CLIENT_API_URL,
  IS_DEV_ENV,
  AUTH_SECRET,
  MONGODB_URI,
  PORT
}