import axios from "axios";

async function client(endpoint: string, body: any, requestType: string, ) {
  
  try {
    let url = `${endpoint}`;

  
    let config = {
      method: requestType,
      url: endpoint,
      data: body,
      headers: {
    
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        
      },
    };


    const results = await axios(config);



    return results;

  } catch (error:any) {
    console.log(error.message);
    return error
  
  }
}
export default client;
