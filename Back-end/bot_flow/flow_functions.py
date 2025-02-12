import base64, os
from Services.constant_functions import extract_text_from_pdf, extract_text_from_docx
from ai_helper.resume_processer import resume_score_ai, continue_convo
from Model.chatbot_functions import handle_success_response_text, handle_success_response_html

def file_upload(payload):
    try:
        data, email = payload["metaData"]["entities"], payload["metaData"]["userData"]["email"]
        if 'file' not in data or 'filename' not in data:
            return {"message": "No file data or filename provided", "status_code": 400}
        
        os.makedirs("uploads", exist_ok=True)
        filename, file_data = data['filename'], base64.b64decode(data['file'].split(',')[1])
        upload_path = f"uploads/{email.split('@')[0]}.{filename.split('.')[-1].lower()}"
        
        if os.path.exists(upload_path): os.remove(upload_path)
        with open(upload_path, 'wb') as file: file.write(file_data)
        
        data.update({"file_uploaded": True, "filename": filename, "file": ""})
        return handle_success_response_text("Enter your Job Description", payload, 1, True)
    except Exception as e:
        print(e, "upload file")
        raise ValueError(e)

def get_job_description(payload):
    try:
        content = payload["chatConversation"][-1]["data"].get("content", "")
        if content:
            payload["metaData"]["entities"]["job_description"] = content
            return handle_success_response_html(chatbot_conversation(payload), payload, 2, True)
    except Exception as e:
        print(e)
        raise ValueError(e)

def chatbot_conversation(payload):
    try:
        if payload["metaData"]["entities"].get("file_uploaded"):
            email, filename = payload["metaData"]["userData"]["email"], payload["metaData"]["entities"]["filename"]
            filepath = f'uploads/{email.split("@")[0]}.{filename.split(".")[-1].lower()}'
            extract_func = extract_text_from_pdf if filename.endswith("pdf") else extract_text_from_docx
            return resume_score_ai(payload["metaData"]["entities"]["job_description"], extract_func(filepath))
    except Exception as e:
        print(e)
        raise ValueError(e)

def continues_conversation(payload):
    try:
        content = payload["chatConversation"][-1]["data"].get("content", "")
        if content:
            return handle_success_response_text(continue_convo(payload["metaData"]["entities"]["job_description"], get_chat_history(payload), content), payload, 2, True)
    except Exception as e:
        print(e)
        raise ValueError(e)

def get_chat_history(data):
    try:
        return [{"role": item["role"], "content": item["data"]["content"]} for item in data["chatConversation"]]
    except Exception as e:
        print(e)
        raise ValueError(e)
