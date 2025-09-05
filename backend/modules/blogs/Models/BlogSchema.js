const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  "properties": {
    "title": {
      "title": "Title",
      "description": "An eye-catching and SEO-friendly blog title.",
      "type": "string",
      "example": "5 Reasons Why Next.js Will Dominate Web Development in 2026"
    },
    "introduction": {
      "title": "Introduction",
      "description": "A compelling introduction to hook the reader.",
      "type": "string",
      "example": "Web development is evolving faster than ever, and Next.js is at the forefront of this transformation..."
    },
    "sections": {
      "title": "Sections",
      "description": "The main body of the blog, divided into structured sections.",
      "type": "array",
      "items": {
        "$ref": "#/definitions/BlogSection"
      }
    },
    "conclusion": {
      "title": "Conclusion",
      "description": "A closing statement that summarizes the key points and reinforces the blog's message.",
      "type": "string",
      "example": "Next.js isn’t just another framework—it’s shaping the future of web development. Now is the best time to learn it!"
    },
    "key_takeaways": {
      "title": "Key Takeaways",
      "description": "A concise list of the most important points readers should remember.",
      "type": "array",
      "items": {
        "type": "string"
      },
      "example": ["Next.js improves SEO", "It offers hybrid rendering", "The community is rapidly growing"]
    }
  },
  "required": ["title", "introduction", "sections", "conclusion", "key_takeaways"],
  "definitions": {
    "BlogSection": {
      "title": "BlogSection",
      "type": "object",
      "properties": {
        "heading": {
          "title": "Heading",
          "description": "The section title or sub-heading of the blog.",
          "type": "string",
          "example": "Why Next.js is the Future of Web Development"
        },
        "content": {
          "title": "Content",
          "description": "The main written content of this section.",
          "type": "string",
          "example": "Next.js has revolutionized web development by introducing server-side rendering and static site generation..."
        },
        "bullets": {
          "title": "Bullets",
          "description": "Supporting bullet points or highlights for this section.",
          "type": "array",
          "items": {
            "type": "string"
          },
          "example": ["Improved SEO", "Faster performance", "Better developer experience"]
        }
      },
      "required": ["heading", "content"]
    }
  }
}
)

module.exports = mongoose.model("blog",BlogSchema)