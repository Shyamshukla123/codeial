const express= require('express');
const router = express.Router();

router.use('/comments',require('./comments_api'));

module.exports=router;