import client from "./Client";
import { Urls } from "./Api-Constant";

/**
 * PC_CB_1.55 to PC_CB_1.62 call client to get the response from API and return the response
 * @param body
 * @returns the bot response
 */
export async function makeAgentRequest(body: object) {
  let result = await client(
    Urls.processConversation,
    body,
    "POST",
  );
  return result;
}
export async function uploadFile(body: object) {
  let result = await client(
    Urls.uploadFile,
    body,
    "POST",
  
  );
  return result.data;
}
