import dayjs from "dayjs";

export function getDate(date: Date) {
  return dayjs(date).format("DD/MM/YYYY");
}
