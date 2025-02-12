import client from "./Client";
import { Urls } from "./Api-Constant";

export async function makeAgentRequest(body: object) {
  let result = await client(
    Urls.processConversation,
    body,
    "POST",
  );
  return result;
}
