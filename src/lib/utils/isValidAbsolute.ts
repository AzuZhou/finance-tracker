import { MAXIMUM_TRANSACTION_ABSOLUTE } from "../contants";

const isValidAbsolute = (amount: number) => {
  return Math.abs(amount) <= MAXIMUM_TRANSACTION_ABSOLUTE;
};

export default isValidAbsolute;
