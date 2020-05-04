/* eslint-disable no-console */
import Vue from 'vue';

function parseObject(data) {
  let errors = '';

  for (const k in data) {
    if (Object.prototype.hasOwnProperty.call(data, k)) {
      errors += `${k}: ${data[k][0]}  \n`;
    }
  }

  return errors;
}

export default function({ $axios, store, redirect, route, env, app }) {
  // timeout for API
//   $axios.defaults.timeout = 1000 * 59; // 59 seconds

  $axios.onResponse(response => {
    return response
    // console.log(response)
    // if (process.server) {
    //   console.log(`[${response && response.status}] ${response && response.request && response.request.path}`);
    //   console.log(`  `);
    // }
  });

  // // log
  // $axios.onError(error => {
  //   console.log(error)
  // });
}
