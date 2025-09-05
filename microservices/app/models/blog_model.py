from pydantic import BaseModel, Field
from typing import List


# class BlogRequest(BaseModel):
#     topic: str = Field(
#         ...,
#         description="The central theme or subject of the blog (e.g., 'React.js for Beginners').",
#         example="Mastering Next.js in 2026"
#     )
#     audience: str = Field(
#         ...,
#         description="The primary readers the blog targets (e.g., students, developers, entrepreneurs).",
#         example="Junior web developers"
#     )
#     tone: str = Field(
#         ...,
#         description="The overall writing style (e.g., friendly, professional, persuasive, storytelling).",
#         example="Friendly and engaging"
#     )
#     length: int = Field(
#         ...,
#         ge=300,
#         le=3000,
#         description="Desired word count for the blog (minimum 300, maximum 3000).",
#         example=1200
#     )


class BlogSection(BaseModel):
    heading: str = Field(
        ...,
        description="The section title or sub-heading of the blog.",
        example="Why Next.js is the Future of Web Development"
    )
    content: str = Field(
        ...,
        description="The main written content of this section.",
        example="Next.js has revolutionized web development by introducing server-side rendering and static site generation..."
    )
    bullets: List[str] = Field(
        default_factory=list,
        description="Supporting bullet points or highlights for this section.",
        example=["Improved SEO", "Faster performance", "Better developer experience"]
    )


class BlogResponse(BaseModel):
    title: str = Field(
        ...,
        description="An eye-catching and SEO-friendly blog title.",
        example="5 Reasons Why Next.js Will Dominate Web Development in 2026"
    )
    introduction: str = Field(
        ...,
        description="A compelling introduction to hook the reader.",
        example="Web development is evolving faster than ever, and Next.js is at the forefront of this transformation..."
    )
    sections: List[BlogSection] = Field(
        ...,
        description="The main body of the blog, divided into structured sections."
    )
    conclusion: str = Field(
        ...,
        description="A closing statement that summarizes the key points and reinforces the blog's message.",
        example="Next.js isn’t just another framework—it’s shaping the future of web development. Now is the best time to learn it!"
    )
    key_takeaways: List[str] = Field(
        ...,
        description="A concise list of the most important points readers should remember.",
        example=["Next.js improves SEO", "It offers hybrid rendering", "The community is rapidly growing"]
    )
