// const express = require('express');
// const Queue = require('bullmq');
// const { createBullBoard } = require("@bull-board/api");
// const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
// const { ExpressAdapter } = require("@bull-board/express");
// const articleTitleQueue = require('./queues/articleTitle.queue');

// //Bull Board Setup
// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath('/admin/queues');

// createBullBoard({
//     queues: [new BullMQAdapter(articleTitleQueue)],
//     serverAdapter:serverAdapter,
// })

// const app = express();
// app.use('/admin/queues',serverAdapter.getRouter());

// app.listen(3000,() => {
//     console.log("Bull board is runing on http://localhost:3000/admin/queues")
// })