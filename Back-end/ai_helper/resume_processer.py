import os
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai.chat_models import ChatOpenAI
from Services.prompts import resume_checker_prompt,chat_history_prompt



def resume_score_ai(jd,content):
    try:
        llm=ChatOpenAI(
        temperature=0,
            model="gpt-4o-mini",
            api_key="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",
        )
        print("in")
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    resume_checker_prompt,
                ),
                ("human", "{jd}"),
            ]
        )

        chain = prompt | llm
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
        llm=ChatOpenAI(
        temperature=0,
            model="gpt-4o-mini",
            api_key="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",
        )
        print("in")
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    chat_history_prompt,
                ),
                ("human", "{query}"),
            ]
        )

        chain = prompt | llm
        response=chain.invoke(
            {
                "input":content,
                "query":user_query
            }
        )
        return response.content
    except Exception as e:
        print(e)



