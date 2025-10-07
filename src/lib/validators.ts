import isValidAbsolute from "@/lib/utils/isValidAbsolute";

const validators = {
  description: (value: string) => {
    const isValid = value.trim().length > 0;
    return isValid ? null : "Please add a description for your transaction";
  },
  amount: (value: string) => {
    const amount = parseFloat(value);
    if (value && isNaN(amount)) return "An amount needs to be specified";
    const isValidAmount = isValidAbsolute(parseFloat(value));
    if (!isValidAmount) return "This amount exceeds the transaction limit";

    return null;
  },
  category: (value: string | null) => {
    return value ? null : "Please select a category.";
  }
};

export default validators;
