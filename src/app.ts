import config from './utils/config'
import express from 'express'
import cors from 'cors'
import routes from "./routes"
import db from "./models/index"
import { requestLogger } from './middlewares/index'
import log from './utils/log'
import path from "path"

const app = express()

const corsOptions = config.IS_DEV_ENV ? {
  origin: config.DEV_CLIENT_API_URL
} : undefined;

app.use(cors(corsOptions));
// serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
// application/json
app.use(express.json())
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger)

app.use(routes.authRoutes)
app.use(routes.userRoutes)
app.use(routes.todoRoutes)

// The "CatchAll" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

log.i('Connecting to: ', config.MONGODB_URI)

db.mongoose.connect(config.MONGODB_URI)
  .then(() => {
    log.i('Connected to MongoDB')
  })
  .catch((error) => {
    log.e('Error connecting to MongoDB: ', error.message)
  })

export default app