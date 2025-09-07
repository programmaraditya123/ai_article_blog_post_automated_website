const express = require('express')
const articleTitle = require('./bullmq/routes/articleTitle.route')
const Queue = require('bullmq');
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const articleTitleQueue = require('./bullmq/queues/articleTitle.queue');
const { connectdb } = require('./config/db');
const ArticleRoute = require('./modules/article/Routes/ArticleRoute')
const blogRoute = require('./modules/blogs/Routes/blogRoute')
const postRoute = require("./modules/posts/Routes/postRoute")
const cors = require('cors')
require('dotenv').config()

connectdb();



const allowedOrigins = [
  "https://ai-article-blog-post-automated-website-ez96sid3r.vercel.app",
  "https://ai-article-blog-post-automated-website-xxcmna0tt.vercel.app",
  'https://www.knowledgepoll.site',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://knowledgepoll.site',
];



const app = express();
const app1 = express();
app.use(express.json())
app1.use(express.json())

app.use(cors({ origin: "*" }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.get('/',(req,res) => {
    res.send("hii this is the homepage route")
})

app.use('/',articleTitle)

//get article routes
app.use('/app/getarticle',ArticleRoute)

//blog route
app.use('/app/getblog',blogRoute)

//post route
app.use("/app/getpost",postRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
     console.log("Server.js is runing on PORT 8080")
})



//Bull Board Setup
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues: [new BullMQAdapter(articleTitleQueue)],
    serverAdapter:serverAdapter,
})

app1.use('/admin/queues',serverAdapter.getRouter());

app1.listen(3000,() => {
    console.log("Bull board is runing on http://localhost:3000/admin/queues")
})