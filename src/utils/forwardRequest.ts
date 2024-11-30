import axios from "axios";
import { IncomingHttpHeaders } from "http";
import { EMAIL_HEADER, ROLE_HEADER } from "./strings";

const forwardRequest = async (
  url: string,
  method: string,
  data: any,
  headers: IncomingHttpHeaders,
): Promise<[any, number]> => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        [EMAIL_HEADER]: headers["x-user-email"],
        [ROLE_HEADER]: headers["x-user-role"],
      },
    });
    return [response.data, response.status];
  } catch (error) {
    throw error;
  }
};
export default forwardRequest;
