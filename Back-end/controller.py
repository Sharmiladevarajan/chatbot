from flask import Flask, request, jsonify
from flask_cors import CORS
from bot_flow.process_conversation import process_conversation

app = Flask(__name__)
CORS(app) 


@app.route('/process_conversation', methods=['POST'])
def process_chat_conversation(): 
    try:
        return jsonify({"data":process_conversation(request.get_json()["body"]),"status_code":200})
    except Exception as e:
        return jsonify({"data":e,"status_code":400})

if __name__ == "__main__":
   app.run(port=8080)
