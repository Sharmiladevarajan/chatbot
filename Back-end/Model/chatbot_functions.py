from Model.output_components import (
    chat_conversation_response,
    txt_response,
    input_config_response,
)


def clear_after_all_steps(payload):
    try:

        # Validate that the required keys exist in the payload to avoid KeyError
        required_keys = ["metaData"]
        for key in required_keys:
            if key not in payload:
                # Optionally raise an exception or handle it as per your logic
                raise KeyError(f"Payload is missing the required key: '{key}'")

        conversation_keys = ["conversationID", "intent", "usecase_intent", "entities"]
        for key in conversation_keys:
            if key in payload["metaData"]:
                if key == "conversationID":
                    payload["metaData"][key] = 0
               
            else:
            
                pass

        return payload
    except Exception as e:
        print("error in clering the data",str(e))

def process_functions(functions, conversationId, payload):
    try:
        print(functions[conversationId])
        result = functions[conversationId](payload)
        return result
    except Exception as e:
        print("error in process function",str(e))




def generate_shallow_copy(payload,show):
    chat_conversation = {**chat_conversation_response}
    txt = {**txt_response}
    chat_conversation.update(
        {
            "order": payload["chatConversation"][-1]["order"] + 1,
            "data": txt,
            "show":show,
            
            "inputConfig": input_config_response,
        }
    )
    return chat_conversation


def handle_success_response_text(success_message, payload, conversationID=0,show=True):
    chat_conversation = generate_shallow_copy(payload,show)
    chat_conversation.update(
        {"data": {"contentType": "txt", "content": success_message}}
    )
    payload["metaData"]["conversationID"] = conversationID
    payload["chatConversation"].append(chat_conversation)
    return payload

def handle_success_response_html(success_message, payload, conversationID=0,show=True):
    chat_conversation = generate_shallow_copy(payload,show)
    chat_conversation.update(
        {"data": {"contentType": "html", "content": success_message}}
    )
    payload["metaData"]["conversationID"] = conversationID
    payload["chatConversation"].append(chat_conversation)
    return payload




def handle_options(text,content):
    result_array = [
        {"options": option.capitalize(), "selected": None} for option in content
    ]
    return {"text":text,"options":result_array}


def handle_success_response_button(text,content, payload, conversationID=0,show=True):
    chat_conversation = generate_shallow_copy(payload,show)
    input_config = {**input_config_response}
    input_config.update({"disableText": 1})

    chat_conversation.update(
        {
            "data": {"contentType": "btn", "content": handle_options(text,content)},
            "input_config": input_config,
        }
    )

    payload["metaData"]["conversationID"] = conversationID
    payload["chatConversation"].append(chat_conversation)
    return payload






