import React from "react";

const Debounce = (callback, time = 0) => {
  return function () {
    let timer;
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      callback();
    }, time);
  };
};

export default Debounce;
