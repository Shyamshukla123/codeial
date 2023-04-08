const Queue = require('../config/kue');
const commentMailer= require('../mailers/comments_mailer');
const kue = require('kue');
const queue = kue.createQueue();
queue.process('emails',function(job,done){
    console.log('emails worker is working fine ',job.data);
    commentMailer.newComment(job.data);
    done();

})