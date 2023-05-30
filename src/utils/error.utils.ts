import { ErrorResponse } from "../types/base";

export type Error = {
  id: string;
  code: string;
  details: string;
};

/**
 * Generates a deriv ws compliant error object.
 * @param error
 * @param req
 * @returns
 */
export const generateError = (
  error: Error,
  req: any
): ErrorResponse<typeof req> => {
  const { id, code, details } = error;

  return {
    echo_req: req,
    error: {
      code,
      details: {
        [id]: details,
      },
    },
    msg_type: id,
  };
};
