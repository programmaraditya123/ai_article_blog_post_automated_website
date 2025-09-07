from fastapi import FastAPI
import requests
from pydantic import BaseModel
# from .services.article_generator import generateArticle
from .Workflows.MainWorkflow import workflow
from .Workflows.MainWorkflow import initial_state
from .api.articles import getTitles
from typing import Literal
from .services.pinecone_retreiver.pinecone_retreiver import vector_search
app = FastAPI()

 
 

class TopicRequest(BaseModel):
    title: str
    type: Literal["article","blog","post"]


@app.get('/')
def read_root():
    return {"Hello" : "World"}
 

@app.get('/get-title')
def read_root():
    return getTitles()
    
     

# @app.post('/generateArticle')
# async def read_root(topic:dict):
#     return generateArticle(topic)

@app.post('/generateArticle')
async def read_root(req:TopicRequest):
    print(req.model_dump(),"666666666666666")
    state =  initial_state(title=req.title,type=req.type)
    result = workflow.invoke(state)
    return result
    

@app.get('/recommendation')
async def read_root(query:str):
    return vector_search(query)
