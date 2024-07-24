type DateFormat = "YYYY/MM/DD" | "MM/DD/YYYY" | "DD/MM/YYYY";

export default function formatDate(
  date: string | undefined,
  format: DateFormat = "YYYY/MM/DD"
): string {
  if (!date) return undefined;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);

  switch (format) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return `${year}/${month}/${day}`;
  }
}