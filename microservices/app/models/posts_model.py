from pydantic import BaseModel, Field
from typing import List


class PostRequest(BaseModel):
    """Request schema for generating a post"""
    topic: str = Field(..., description="The main topic or theme of the post")


class PostResponse(BaseModel):
    """Response schema for generated posts"""
    title: str = Field(
        ...,
        description="Catchy title or headline for the post. Must be a short sentence."
    )
    body: str = Field(
        ...,
        description="Main content of the post. Should be engaging, scannable, and audience-friendly."
    )
    hashtags: List[str] = Field(
        default_factory=list,
        description="Relevant hashtags for engagement. Provide only words starting with '#'."
    )
