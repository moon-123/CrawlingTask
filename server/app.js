import express from "express";
import morgan from "morgan";
import banasRouter from './router/bana.js';
// import dotenv from 'dotenv';
import { config } from './config.js';
import cors from 'cors';
import { connectDB } from './db/database.js';

// dotenv.config();

// console.log(process.env.JWT_SECRET);
const app = express();

// express에서 제공하는 미들웨어를 사용하기 위한 설정?
// 어떤 미들웨어를 어떻게 사용할지
app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());



// 라우터
app.use('/bana', banasRouter);


// 오류
app.use((req, res, next) => {
    res.sendStatus(404);
});

// db.getConnection().then(connection => console.log(connection));
connectDB().then((db) => {
    app.listen(config.host.port);    // config.[].[] 로 config에 정의한 값에 접근할 수 있음.
}).catch(console.error)

// DB를 사용하는데 어떤 DB를 사용하냐
// 지금 사용되는 건 Mogoose임.
// db에 dababase.js 가면 알 수 있음.
// 이렇게 사용하는 이유는 보안