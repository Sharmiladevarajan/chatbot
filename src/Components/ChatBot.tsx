import React, { useState, useEffect, useRef } from "react";
import {  makeAgentRequest } from "../Service/Api";
import {
  userDetails,
  ChatMessage,
  ChatConversation,
  BotConfig,
} from "../Interface/Interface";
import BindBotResponse from "./BindBotResponse";
import LoadingIndicator from "../OtherComponents/Loader";
import { log } from "console";


export function Chatbot() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [inputVal, setInputVal] = useState<any>("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
  
  const [chatMessages, setChatMessages] = useState<any>({
    chatConversation: [
      {
        data: {
          content: 'Hello, How can i help you',
          contentType: "txt",
        },
        inputConfig: {
          disableAttachment: 0,
          disableEmoji: 0,
          disableText: 0,
          disableVoice: 0,
          hiddenAttachment: 0,
          hiddenEmoji: 1,
          hiddenText: 0,
          hiddenVoice: 0,
        },
        meta: {
          name: "customerBot",
          timeStamp: new Date(),
        },
        order: 1,
        role: "bot",
        show:true
      },
      
      {
        data: {
         
          contentType: "doc",
          content:"file"
        },
        inputConfig: {
          disableAttachment: 0,
          disableEmoji: 0,
          disableText: 0,
          disableVoice: 0,
          hiddenAttachment: 0,
          hiddenEmoji: 1,
          hiddenText: 0,
          hiddenVoice: 0,
        },
        meta: {
          name: "customerBot",
          timeStamp: new Date(),
          show:true
        },
        order: 2,
        role: "bot",
        show:false
      },

    ],
    metaData: {
      conversationID: 0,
      entities: {},
      intent: "",
      userData: {
        phoneNo: "9876543210",
        email: "sharmiladevarajan@gmail.com",
      
      },
    },
  });



  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef?.current?.scrollHeight;
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }


 

  const addUserRequest = (
    value: string,
    type: string,
    role: string
  ): boolean => {
    const lastMessage =
      chatMessages?.chatConversation[chatMessages.chatConversation.length - 1];
    const duplicatedMessage = {
      ...lastMessage,
      order: lastMessage.order + 1,
      role: role,
      show:role=="bot"?true:true,
      meta: {
        ...lastMessage.metaData,
        timeStamp: new Date(),
        show:true
      },
      inputConfig: {
        ...lastMessage.inputConfig,
        
      },
      data: {
        ...lastMessage.data,
        content: value,
        contentType: "txt",
      },
    };
    if (
  
      type == "btn"
    ) {
      if (Array.isArray(lastMessage?.data?.content)) {
        lastMessage?.data?.content?.forEach((choice: any) => {
          choice.selected = choice.options === value;
        });
      }
    }
    chatMessages?.chatConversation.push(duplicatedMessage);
    setChatMessages({ ...chatMessages });

    return true;
  };
  
  const BotMessage = ({ val }:any) => {
    const { show, data, meta } = val;
    console.log(val.role);
    
    return (
      <div className={`ai-bot-response-container ${!show ? "mrg" : ""}`}>
        {show && (
          <img
            className="ai-bot-avatar"
            src="images/chatbot-avatar.svg"
            alt="chatbot avatar icon"
          />
        )}
        <div className="ai-bot-response">
          <div className={`ai-bot-content ${!show ? "ai-bot-content-btn" : ""}`}>
            <BindBotResponse
              record={{
                value: data,
                func: handleResponseBinding,
                message: chatMessages,
                role: val.role,
                file_func: handleFileUpload,
              }}
            />
          </div>
          {meta.show && (
            <span className={show ? "bot-time" : "lft"}>
              {convertTime(meta.timeStamp, "bot")}
            </span>
          )}
        </div>
      </div>
    );
  };
  
  const UserMessage = ({ val }:any) => {
    const { data, meta } = val;
    return (
      <div className="ai-user-response-container">
        <div className="ai-user-response">
          <div className="ai-user-content">
            <BindBotResponse
              record={{
                value: data,
                func: handleResponseBinding,
                role: val.role,
                file_func: handleFileUpload,
              }}
            />
          </div>
          <span className="user-time">
            {convertTime(meta.timeStamp, "bot")}
          </span>
        </div>
      </div>
    );
  };
  
  const bindChatMessages = () => {
    try {
      if (Object.keys(chatMessages).length === 0) return null;
  
      return chatMessages.chatConversation.map((val:any, index:number) => {
        switch (val.role) {
          case "bot":
            return <BotMessage key={index} val={val} />;
          case "user":
            return <UserMessage key={index} val={val} />;
          default:
            return null;
        }
      });
    } catch (error) {
      addUserRequest(
        "Something went wrong, try again after some time.",
        "txt",
        "bot"
      );
      return null;
    }
  };
  

  const convertTime = (dateTime: any, role: string) => {
    if (dateTime) {
      const datetimeObj1 = new Date(dateTime);
      const formattedTime1 = datetimeObj1.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return formattedTime1;
    } else {
      let time = new Date();
      const datetimeObj1 = new Date(time);
      const formattedTime1 = datetimeObj1.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return formattedTime1;
    }

  };
 
  const executeSendActions = async (
    value: string,
    type: string,
    role: string
  ) => {
    setLoader(true);
    if (addUserRequest(value, type, role)) {
      if (await executeAgentRequest(chatMessages)) {
        return true;
      }
    } else {
      addUserRequest(
        "Something went wrong Try again after sometimes",
        "txt",
        "bot"
      );
    }
    return false;
  };

  const executeAgentRequest = async (chatMessages:any): Promise<boolean> => {
    try {
      debugger
      const response = await makeAgentRequest({ body: chatMessages });
      debugger
      console.log(response.data.data,response.status,"099876543");
      
      if (
        response.data.data.status_code==200
      ) {
        setChatMessages(response.data.data);
        setLoader(false);
        return true;
      } else {
        setLoader(false);
        addUserRequest("Something went wrong try again", "txt", "bot");
        return false;
      }
    } catch (error) {
      console.error("Error executing agent request:", error);
      return false;
    }
  };
 
  const handleResponseBinding = (value: any, type: string) => {
    if (value != "") {
      if (type == "multchc") {
        let val = value.join(",");
        executeSendActions(val, type, "user");
      } else {
        executeSendActions(value, type, "user");
      }
    }
  };


   // Handle file selection
   const handleFileUpload = (event: any) => {
    if (event.target.files) {
      
      setSelectedFile(chatMessages?.metaData?.entities?.file_uploaded?"Uploaded":event.target.files[0]);
      fileSubmitHandler(event.target.files[0])
    }
  };


  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Handle form submission
  const fileSubmitHandler = async (fileData:any) => {
  
    
    if (!fileData) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      // Convert the file to base64
      const fileBase64 = await toBase64(fileData);

      // Create the updated metaData object
const newMetaData = {
  ...chatMessages.metaData,
  entities: {
    ...chatMessages.metaData.entities,
    file: fileBase64,
    filename: fileData.name,
  },
};

// Create the new chatMessages object with the updated metaData
const newChatMessages = {
  ...chatMessages,
  metaData: newMetaData,
};

// Update the state with the new chatMessages object
debugger
setChatMessages(newChatMessages);
addUserRequest("Uploaded Successfully","txt","user")
      const response =  executeAgentRequest(chatMessages)
      console.log(response,"099876543");
      
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file');
    }
  };
  
console.log(chatMessages);

  return (
    <>
      <div className="ai-container" >
        {/* <div className="ai-header ai-header-icon"></div> */}
        <div className="ai-body">
          <div className="ai-content-container" ref={chatContainerRef}>
            <></>
            {Object.keys(chatMessages).length ? bindChatMessages() : null}
            {loader ? <LoadingIndicator /> : null}
            {error ? <span>{error}</span> : null}
          </div>
          <div className="ai-downarrow">
            <i className="fa-solid fa-arrow-down"></i>
          </div>
        </div>
        <div className="chat-input">
        <input
          type="text"
          className="footer-icons"
          placeholder="Type a message..."
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              if (inputVal != "") {
                executeSendActions(inputVal, "txt", "user");
                setInputVal("");
              }
            }
          }}
        />

<img
              className="footer-icons"
              src="images/send-icon.svg"
              alt="Send icon"
             
              style={{
                cursor: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableText == 1
                    ? "not-allowed"
                    : chatMessages?.chatConversation[
                        chatMessages?.chatConversation?.length - 1
                      ]?.inputConfig?.disableText == 0
                    ? "pointer"
                    : "not-allowed"
                  : "not-allowed",
                opacity: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableText == 1
                    ? 0.5
                    : chatMessages?.chatConversation[
                        chatMessages?.chatConversation?.length - 1
                      ]?.inputConfig?.disableText == 0
                    ? 1
                    : 0.5
                  : 0.5,
              }}
              onClick={(e) => {
                if (inputVal != "") {
                  executeSendActions(inputVal, "txt", "user");
                  setInputVal("");
                }
              }}
              
              />
              <input
  type="file"
  ref={fileInputRef}
  style={{ display: 'none' }}
    onChange={handleFileUpload}
  />
              <img
              className="footer-icons"
              src="images/attachment-icon.svg"
              alt="Audio icon"
              onClick={(current) => {
                
                fileInputRef.current?.click();
                
              }}
              hidden={
                Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.hiddenAttachment == 1
                    ? true
                    : chatMessages?.chatConversation[
                        chatMessages?.chatConversation?.length - 1
                      ]?.inputConfig?.hiddenAttachment == 0
                    ? false
                    
                    : true
                  : false
              }
              style={{
                cursor: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableAttachment == 1
                    ? "not-allowed"
                    : "pointer"
                  : "not-allowed",
                opacity: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableAttachment == 1
                    ? 0.5
                    : 1
                  : 1,
              }}
              /> 

<img
              className="footer-icons"
              src="images/voice-input-icon.svg"
              alt="Audio icon"
              hidden={
                Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.hiddenVoice == 1
                    ? true
                    : chatMessages?.chatConversation[
                        chatMessages?.chatConversation?.length - 1
                      ]?.inputConfig?.hiddenVoice == 0
                    ? false
                   
                    : true
                  : false
              }
              style={{
                cursor: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableVoice == 1
                    ? "not-allowed"
                    : "pointer"
                  : "not-allowed",
                opacity: Array.isArray(chatMessages?.chatConversation)
                  ? chatMessages?.chatConversation[
                      chatMessages?.chatConversation?.length - 1
                    ]?.inputConfig?.disableVoice == 1
                    ? 0.5
                    : 1
                  : 1,
              }}
              /> 
       
      </div>
       
      </div>
    </>
  );
}
