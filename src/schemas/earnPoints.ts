import * as yup from "yup";

const earnPointsSchema = yup.object({
  location: yup.string().required("locationMandatory"),
  date: yup.string(),
  time: yup.string(),
  transactionAmount: yup
    .number()
    .typeError("validAmount")
    .positive("validAmount")
    .integer("amountNotWholeNumber"),
  taxAssumedAmount: yup.string(),
  goToPassPointsUsed: yup
    .mixed()
    .test(
      "is-empty-or-greater-than-zero",
      "passPoints",
      (value) => value === "" || +value >= 0
    )

    .test(
      "is-less-than-or-equal-to-loyalty-points",
      "currentPoints",
      function (value) {
        return value === "" || +value <= this.options.context.points;
      }
    )
    .test(
      "is-less-than-or-equal-to-transaction-amount",
      "amountExceed",
      function (value) {
        return value === "" || +value <= +this.parent.transactionAmount;
      }
    )
    .test(
      "is-whole-number",
      "pointsNotWholeNumber",
      (value) => value === "" || Number.isInteger(+value)
    ),

  amountEligibleForEarningPoints: yup.string(),
  notes: yup.string(),
});

export default earnPointsSchema;
