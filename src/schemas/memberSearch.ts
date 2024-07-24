import * as yup from "yup";

const memberSearchSchema = yup.object({
  memberID: yup.string().max(11, "inputExceededLimit"),
});

export default memberSearchSchema;
