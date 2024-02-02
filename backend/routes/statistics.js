const express = require('express');
const router = express.Router();
const TollData = require('../models/TollDataSch');
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

router.get('/stats',async(req,res)=>{
    try{
      
      const cracked = await TollData.countDocuments({'tyreStatus': {
        $elemMatch: {
          class: 'Cracked',
        },
      }});
      const normal = await TollData.countDocuments({'tyreStatus': {
        $elemMatch: {
          class: 'Normal',
        },
      }});
      let list1 = [];
      list1.push(cracked);
      list1.push(normal);
      res.send(list1);
    }
    catch(err){
      console.log(err);
    }
  });

module.exports = router;