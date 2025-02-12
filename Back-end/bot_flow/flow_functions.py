import base64,os
from Services.constant_functions import extract_text_from_pdf,extract_text_from_docx
from ai_helper.resume_processer import resume_score_ai,continue_convo
from Model.chatbot_functions import handle_success_response_text,clear_after_all_steps,handle_success_response_html




def file_upload(payload):
    try:
        data = payload["metaData"]["entities"]
        UPLOAD_FOLDER = "uploads"
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        print("came")
        if 'file' not in data or 'filename' not in data:
            return {"message": "No file data or filename provided", "status_code": 400}
        
        file_data = data['file']
        filename = data['filename']
        email = payload["metaData"]["userData"]["email"]
        file_data = file_data.split(',')[1]
        file_bytes = base64.b64decode(file_data)
        print(file_data, filename.split(".")[-1].lower())
        upload_path = os.path.join(UPLOAD_FOLDER, f"{email.split('@')[0]}.{filename.split('.')[-1].lower()}")

        # Check if the file exists and remove it if it does
        if os.path.exists(upload_path):
            os.remove(upload_path)
            print(f"Existing file {upload_path} removed.")

        with open(upload_path, 'wb') as file:
            file.write(file_bytes)
        payload["metaData"]["entities"]["file_uploaded"] = True
        payload["metaData"]["entities"]["filename"] = filename
        payload["metaData"]["entities"]["file"] = ""
        return handle_success_response_text("Enter your Job Description", payload, 1,True)
    except Exception as e:
        print(e, "upload file")
def get_job_description(payload):
    try:
        print(payload)
        if payload["chatConversation"][-1]["data"]["content"]:
            payload["metaData"]["entities"]["job_description"]=payload["chatConversation"][-1]["data"]["content"]
            print("before llm")
            llm_summary=chatbot_conversation(payload)

            return handle_success_response_html(llm_summary,payload,2,True)
        
            
    except Exception as e:
        print(e)
def chatbot_conversation(payload):
    print("came")
    try:
        if payload["metaData"]["entities"]["file_uploaded"]==True:
            print("came2")
            email=payload["metaData"]["userData"]["email"]
            print(email)
            filename=payload["metaData"]["entities"]["filename"]
            print(filename,email)
            if filename.split(".")[-1].lower()=="pdf":
                resume_content=extract_text_from_pdf(f'uploads/{email.split("@")[0]+"."+filename.split(".")[-1].lower()}')
            elif filename.split(".")[-1].lower()=="docx":
                resume_content=extract_text_from_docx(f'uploads/{email.split("@")[0]+"."+filename.split(".")[-1].lower()}')

            print("came before llm")
            call_resume_llm=resume_score_ai(payload["metaData"]["entities"]["job_description"],resume_content)
            return call_resume_llm
    except Exception as e:
        print(e)
def continues_conversation(payload):
    try:
        if payload["chatConversation"][-1]["data"]["content"]:
            chat_history=get_chat_history(payload)
            call_resume_llm=continue_convo(payload["metaData"]["entities"]["job_description"],chat_history,payload["chatConversation"][-1]["data"]["content"])
            return handle_success_response_text(call_resume_llm,payload,2,True)
    except Exception as e:
        print(e)
def get_chat_history(data):
    try:
        hitory = [
            {"role": item["role"], "content": item["data"]["content"]}
            for item in data["chatConversation"]
        ]
        return hitory
    except Exception as e:
        print(str(e))