from langgraph.graph import StateGraph,START,END
from typing import TypedDict,Literal
from dotenv import load_dotenv
from ..services.article_generator import generateArticle
from ..services.contentGenerator.Blog_generator import generateBlog
from ..services.contentGenerator.post_generator import generatePost
load_dotenv()

class TitleType(TypedDict):
    title:str
    type:Literal["article","blog","post"]
    content:dict

def condition_checker(state:TitleType) -> Literal["generate_article","generate_blog","generate_post"]:
    if state["type"] == "article":
        return "generate_article"
    elif state["type"] == "post":
        return "generate_post"
    elif state["type"] == "blog":
        return "generate_blog"
     



def generate_article(state:TitleType):
    content = generateArticle(state["title"])
    return {"content":content}

def generate_blog(state:TitleType):
    content = generateBlog(state["title"])
    return {"content":content}

def generate_post(state:TitleType):
    content = generatePost(state["title"])
    return {'content':content}

graph = StateGraph(TitleType)



#add sequential nodes of Writing Article
graph.add_node("generate_article",generate_article)

#add sequential nodes of writing blogs
graph.add_node("generate_blog",generate_blog)

#add sequential node of writing posts
graph.add_node("generate_post",generate_post)

#add first conditional edge
graph.add_conditional_edges(START,condition_checker)

#add article flow edges
graph.add_edge("generate_article",END)

#add blog flow edges
graph.add_edge("generate_blog",END)


#add post flow edges
graph.add_edge("generate_post",END)

workflow = graph.compile()

 

def initial_state(title:str,type:str):
    return {"title":title,"type":type}

 