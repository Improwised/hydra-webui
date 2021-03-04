/* eslint-disable no-console */
import Vue from 'vue'

// function parseObject(data) {
//   let errors = ''

//   for (const k in data) {
//     if (Object.prototype.hasOwnProperty.call(data, k)) {
//       errors += `${k}: ${data[k][0]}  \n`
//     }
//   }

//   return errors
// }

export default function ({ $axios, store, redirect, route, env, app }) {
  $axios.onResponse((response) => {
    return response
  })
  $axios.onError((error) => {
    console.log(error)
    Vue.toasted.show(error, {
      theme: 'bubble',
      position: 'top-right',
      duration: 5000,
    })
  })
}
