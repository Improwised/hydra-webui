import Vue from "vue";

const moment = require("moment");

Vue.filter("formatValues", function (value) {
  let filter;

  if (value !== undefined) {
    filter = value
      ? value
          .split("_")
          .join(" ")
          .replace(/^./, (match) => match.toUpperCase())
      : "-";
  } else {
    filter = "-";
  }

  return filter;
});

Vue.filter("filterValues", (value, index) => {
  if (value) {
    if (index === "created_at" || index === "updated_at") {
      return `${moment(value).local().format("DD/MM/YYYY, h:mm:ss A")}`;
    } else if (Array.isArray(value)) {
      return value.length ? value.join() : "-";
    } else if (index === "jwks" || index === "metadata") {
      if (Object.values(value).length) {
        return Object.values(value).join(",");
      } else return "-";
    }

    return value;
  } else {
    return "-";
  }
});
