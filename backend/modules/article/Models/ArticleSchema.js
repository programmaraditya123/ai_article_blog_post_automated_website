const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({
  subheading: { type: String, required: true },
  text: { type: String, required: true },
  list_items: [{ type: String }],
  tables: [
    {
      title: String,
      headers: [String],
      rows: [{ columns: [String] }]
    }
  ]
});

const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  summary: { type: String },
  details: { type: String, required: true },
  types: [String],
  advantages: [String],
  disadvantages: [String],
  subsections: [subsectionSchema],
  tables: [
    {
      title: String,
      headers: [String],
      rows: [{ columns: [String] }]
    }
  ]
});

const commentReplySchema = new mongoose.Schema({
  user: String,
  text: String,
  created_at: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  created_at: { type: Date, default: Date.now },
  replies: [commentReplySchema]
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "AI Generator" },
  created_at: { type: Date, default: Date.now },
  introduction: { type: String, required: true },
  sections: [sectionSchema],
  conclusion: { type: String, required: true },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  comments: {
    comments: [commentSchema]
  },
  views: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    churn_rate: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("Article", articleSchema,"articles");
