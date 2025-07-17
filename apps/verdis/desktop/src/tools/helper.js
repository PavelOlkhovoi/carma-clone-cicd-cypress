import dayjs from "dayjs";

export const getNonce = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayString = yyyy + mm + dd;
  const todayInt = parseInt(todayString);
  return todayInt + Math.random();
};

export const compare = (a, b) => {
  if (a === undefined || a === null) {
    a = "";
  }
  if (b === undefined || a === null) {
    b = "";
  }

  return (
    isFinite(b) - isFinite(a) ||
    a - b ||
    (a?.length === b?.length && a.toString().localeCompare(b)) ||
    a?.length - b?.length
  );
};

export const formatDate = (date) => {
  if (date) {
    return dayjs(date).format("DD.MM.YYYY");
  } else {
    return null;
  }
};
