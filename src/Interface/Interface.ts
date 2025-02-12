export interface userDetails 
{
    organization_id: string,
    bot_id: string,
}
  
export interface RecordProps {
  value: string; // Adjust the type based on the actual type of 'value' in your components
}

export interface ChatMessage {
  Order: number;
  role: string;
  metaData: {
    name: string;
    timeStamp: any;
  };
  inputconfig: {
    hiddenText: number;
    disableText: number;
    hiddenVoice: number;
    disableVoice: number;
    hiddenEmjio: number;
    disableEmjio: number;
    hiddenAttachment: number;
    disableAttachement: number;
  };
  data: any
}



export interface ChatConversation {
  chatConversation: ChatMessage[];
  metaData: {
    userData: object;
    intent: string;
    conversationID: number;
    entities:object
  };
}

export interface BotConfig {
  chatbot_name: string;
  chatbot_logo: string;
  enable_file_attachment: boolean;
  enable_voice: boolean;
  enable_emoji: boolean;
}

export interface BindBotResponseProps {
  data: {
    contentType: string;
    content: string;
    choices?: string[];
  };
}

