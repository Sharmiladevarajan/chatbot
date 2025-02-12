

from flask import Flask, request, jsonify
from flask_cors import CORS
from bot_flow.process_conversation import process_conversation

app = Flask(__name__)
CORS(app) 




@app.route('/process_conversation', methods=['POST'])
def process_chat_conversation(): 
    return jsonify(process_conversation(request.get_json()["body"]))

if __name__ == "__main__":
   app.run(port=8080)
