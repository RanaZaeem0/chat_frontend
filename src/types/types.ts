export interface UserDataType {
    _id: string;
    fullName: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    avatar: {
      url: string;
      public_id: string;
    };
  }

 export interface AlertData {
    chatId: string;
    message: string;
  }
  
  // Define the type for a message
 export interface AlertMessageType {
    content: string;
    chatId:string;
    message:[],
    sender: {
      _id: string;
      name: string;
    };
    chat: string;
    createdAt: string;
  }

export   interface Attachment {
    URL: string;
    "public-url": string;
  }
  
  export interface SendMessageType {
    content: string;
    _id: string;
    chat: string;
    attachments: Attachment[];
    createdAt: string;
    updatedAt: string;
    _v: 0;
  }