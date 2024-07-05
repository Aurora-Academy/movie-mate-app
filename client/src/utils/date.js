import moment from "moment";

export const dateFormatter = (date, format = "lll") =>
  moment(new Date(date)).format(format);
