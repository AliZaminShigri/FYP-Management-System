const express = require('express');
const route = express.Router();
 const mongoose=require('mongoose');
 const event_Schema = new mongoose.Schema({
    start_date: String,
    end_date: String,
    title: String,
    location_of_event: String,
  
    ticket_type: [
      {
        type: String,
      },
    ],
    discount: Number,
    event_dates: [
      {
        type: String,
      },
    ],
    capacity: Number,
    who_can_join: [
      {
        type: String,
      },
    ],
    ticket_price: Number,
    l_desc: String,
  
    tags: [
      {
        type: String,
      },
    ],
    s_desc: String,
    duration: String,});
  //const Event = new mongoose.model("Event", event_Schema);
//   app.listen(9002, () => {
//     console.log("Back end started at port 9002");});
  module.exports=mongoose.model("Event", event_Schema);