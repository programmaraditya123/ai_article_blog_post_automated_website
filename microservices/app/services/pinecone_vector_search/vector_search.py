import os
import pinecone
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

load_dotenv()
pinecone_api_key = os.getenv("PINECONE_API_KEY")

# Init Pinecone
pc = pinecone.Pinecone(api_key=pinecone_api_key)
index_name = "my-embeddings-index"

# Create index if not exists (dimension must match embedding model)
if index_name not in [i["name"] for i in pc.list_indexes()]:
    pc.create_index(
        name=index_name,
        dimension=3072,   # for text-embedding-3-large
        metric="cosine",
        spec=pinecone.ServerlessSpec(  # ✅ new API requires this
            cloud="aws",               # or "gcp"
            region="us-east-1"         # choose region available in your Pinecone project
        )
    )

# Init embeddings + vector store
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings)
