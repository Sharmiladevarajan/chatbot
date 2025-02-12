import os
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from Services.prompts import intent_checker_prompt,greeting_prompt

def get_llm():
    return ChatOpenAI(
        temperature=0,
            model="gpt-4o-mini",
            api_key="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",
        )

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


