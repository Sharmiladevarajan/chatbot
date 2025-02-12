from ai_helper.find_intent import check_intent, get_greeting
from Model.chatbot_functions import process_functions, handle_success_response_text
from bot_flow.flow_functions import file_upload, get_job_description, continues_conversation

def process_conversation(payload):
    try:
        content = payload["chatConversation"][-1]["data"]["content"]
        intent = check_intent(content)
        if intent == "greeting":
            greeting_message = get_greeting(content)
            return handle_success_response_text(greeting_message, payload, payload["metaData"]["conversationID"], True)
        elif intent == "irrelevant":
            return handle_success_response_text("Sorry, couldn't process your request.", payload, payload["metaData"]["conversationID"], True)
        else:
            return process_functions([file_upload, get_job_description, continues_conversation], payload["metaData"]["conversationID"], payload)
    except Exception as e:
        print(e)
