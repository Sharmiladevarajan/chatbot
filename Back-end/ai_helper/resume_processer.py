import os
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from Services.constant_functions import get_llm
from Services.prompts import resume_checker_prompt,chat_history_prompt



def resume_score_ai(jd,content):
    try:
        
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    resume_checker_prompt,
                ),
                ("human", "{jd}"),
            ]
        )

        chain = prompt | get_llm()
        response=chain.invoke(
            {
                "resume_content":content,
                "jd":jd,
               
            }
        )
        return response.content
    except Exception as e:
        print(e)



def continue_convo(jd,content,user_query):
    try:
        
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    chat_history_prompt,
                ),
                ("human", "{query}"),
            ]
        )

        chain = prompt | get_llm()
        response=chain.invoke(
            {
                "input":content,
                "query":user_query
            }
        )
        return response.content
    except Exception as e:
        print(e)



