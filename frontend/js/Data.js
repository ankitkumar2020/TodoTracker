// import axios from 'axios';

import { getData } from "./Fetch.js";


let res = await getData();
let data = [];

if (res != "No response" ) {
   if(res){
      for (let obj of res) {
    data.push(obj);
  }
   }
  console.log(res);
}

export { data };


