import "@babel/polyfill";
import app from "./app";
import dotenv from "dotenv";

import "./models/hashtag";
import "./models/post";
import "./models/user";

dotenv.config();  // .env 파일에서 변수를 load

const PORT = process.env.PORT || '3000';
const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);