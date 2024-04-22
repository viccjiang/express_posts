const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// 連接 mongoDB 雲端資料庫
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((error) => {
    console.log(error);
  });

// mongodb://127.0.0.1:27017/post 本地端測試用
// mongoose.connect('mongodb://127.0.0.1:27017/postTest')
//   .then(() => {
//     console.log('資料庫連線成功')
//   })
//   .catch((error) => {
//     console.log(error);
//   });