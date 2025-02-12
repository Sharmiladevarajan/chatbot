import os
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from Services.prompts import intent_checker_prompt,greeting_prompt
from Services.constant_functions import get_llm


def check_intent(content):
    try:
        
        llm=get_llm()
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    intent_checker_prompt,
                ),
                ("human", "{input}"),
            ]
        )

        chain = prompt | llm
        response=chain.invoke(
            {
                
                "input": content,
            }
        )
        return response.content
    except Exception as e:
        print(e)



def get_greeting(content):
    try:
        llm=get_llm()

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    greeting_prompt,
                ),
                ("human", "{input}"),
            ]
        )

        chain = prompt | llm
        response=chain.invoke(
            {
                
                "input": content,
            }
        )
        return response.content
    except Exception as e:
        print(e)


