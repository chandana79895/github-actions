import * as yup from "yup";

// Define validation schema using Yup
const schema = yup.object().shape({
  transactionAmount: yup
    .number()
    .required()
    .typeError("transactionAmountValidation"),
  taxAssumedAmount: yup.number(),
  amountEligibleForEarningPoints: yup.number(),
});
export default schema;
