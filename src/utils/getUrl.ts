import {
  ADMIN_SERVICE_URL,
  SUBMISSION_SERVICE_URL,
  USER_SERVICE_URL,
} from "@config/server-config";

const getAdminServiceURL = (originalUrl: string) => {
  return `${ADMIN_SERVICE_URL}${originalUrl}`;
};
const getUserServiceURL = (originalUrl: string) => {
  return `${USER_SERVICE_URL}${originalUrl}`;
};
const getSubmissionServiceURL = (originalUrl: string) => {
  return `${SUBMISSION_SERVICE_URL}${originalUrl}`;
};

export { getAdminServiceURL, getUserServiceURL, getSubmissionServiceURL };
