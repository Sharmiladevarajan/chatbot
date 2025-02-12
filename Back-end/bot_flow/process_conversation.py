import base64,os
from Services.constant_functions import extract_text_from_pdf
from ai_helper.find_intent import check_intent,get_greeting
from Model.chatbot_functions import process_functions
from bot_flow.flow_functions import file_upload,get_job_description,continues_conversation
from Model.chatbot_functions import handle_success_response_text


def process_conversation(payload):
    try:
        intent=""
        print(payload)
        
        intent=check_intent(payload["chatConversation"][-1]["data"]["content"])

        print(intent)
        if intent=="greeting":
            greeting_message=get_greeting(payload["chatConversation"][-1]["data"]["content"])
            return handle_success_response_text(greeting_message,payload,payload["metaData"]["conversationID"],True)
        elif intent=="irrelevent":
            return handle_success_response_text("Sorry,Couldn't able to process your request",payload,payload["metaData"]["conversationID"],True)
        else:
            return process_functions([file_upload,get_job_description,continues_conversation],payload["metaData"]["conversationID"],payload)
    except Exception as e:
        print(e)




    