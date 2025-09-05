import React from "react";

// Define the props interface for ArticleCard
export interface ArticleCardProps {
  icon: React.FC<SvgIconProps>; // Expecting a React functional component for the main icon
  primaryButtonText: string;
  primaryButtonColor: 'blue'; // Enforce specific color options
  title: string;
  description: string;
  link?: string; // Optional link
  secondaryButtonText?: string; // Optional secondary button text
}

export interface BlogCardProps{
  icon ?: React.FC<SvgIconProps>;
  title : string;
  description : string;
  link ?: string;
  secondaryButtonText?: string;
}

export interface PostCardProps{
  icon ?: React.FC<SvgIconProps>;
  title : string;
  // body : string;
  link ?: string;
  secondaryButtonText?: string;
}

export interface Articles{
  _id:string;
  title:string;
  introduction:string;
}

export interface Blogs{
  _id:string;
  title:string;
  introduction:string
}

export interface BlogResponse{
  blogs:Blogs[];
  lastId?:string;
  hasMore : boolean
}

export interface Posts{
  _id:string;
  title : string;
  body ?:string;
  hashtags ?: Array[string]
}

export interface PostResponse{
    posts:Posts[];
    lastId ?: string;
    hasMore : boolean;
}

export interface ArticleResponse{
  articles:Articles[];
  lastId?: string;
  hasMore : boolean;
}

export interface Section {
  _id: string;
  heading: string;
  summary?: string;
  details?: string;
  types?: string[] | null;
  advantages?: string[] | null;
  disadvantages?: string[] | null;
  subsections?: {
    subheading: string;
    text: string;
  }[] | null;
  tables?: {
    title: string;
    headers: string[];
    rows: { columns: string[] }[];
  }[] | null;
  conclusion ?: string;
}

export interface ArticleSection{
  sections:Section[];
}