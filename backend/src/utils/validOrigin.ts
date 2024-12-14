/**
 * @description Function to check if the origin contains 'foodd-mern'
 * @param origin : string
 * @returns boolean | string
 */

import { FRONTEND_URL } from "../configs/env.js";

const isValidOrigin = (origin: string): boolean | string => {
  if (process.env.NODE_ENV === "production") {
    return Boolean(origin && {FRONTEND_URL});
  }
  return Boolean(origin && /https?:\/\/.*localhost.*/.test(origin));
};

export default isValidOrigin;
