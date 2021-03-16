import Vue from "vue";

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
