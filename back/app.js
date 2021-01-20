const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const linkRouter = require('./routes/link');
const homeRouter = require('./routes/home');
const visitRouter = require('./routes/visit');

const PORT = 5000;
dotenv.config();
passportConfig();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch(console.error);

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: 'https://mini-link.site',
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' && 'mini-link.site',
    },
  })
);
app.use(useragent.express());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`Hello! mini-link! ${process.env.NODE_ENV}` );
});

app.use('/user', userRouter);
app.use('/link', linkRouter);
app.use('/home', homeRouter);
app.use('/visit', visitRouter);

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 실행중`);
});
