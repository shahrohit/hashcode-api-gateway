import axios from "axios";
import { IncomingHttpHeaders } from "http";
import { USERNAME_HEADER, ROLE_HEADER } from "./strings";

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
        [USERNAME_HEADER]: headers[USERNAME_HEADER],
        [ROLE_HEADER]: headers[ROLE_HEADER],
      },
    });
    return [response.data, response.status];
  } catch (error) {
    throw error;
  }
};
export default forwardRequest;
