/**
  MailerBot - Client
  
  Provides different jobs for sending email with invoice data, etc.
  
  (c) 2013 OptimalBits - MIT Licensed.
*/
"use strict";

var Queue = require('bull');

var JOB_QUEUE_NAME = 'MailerBot';

function MailerBotClient(opts){
  this.clientId = opts.clientId || 'default';
  this.jobQueue = Queue(JOB_QUEUE_NAME, opts.redisPort, opts.redisHost);
  this.resultsQueueName = 'MailerBot-client-'+this.clientId;
  this.resultsQueue = Queue(this.resultsQueueName);
}

/**
  Places a request to send an email with optional pdf attachment.
  
  opts = {
    sender: 'economy@optimalbits.com',
    user: { 
      name: '',
      email: ''
    },
    attachment: '<body></body>',
    attachmentName: 'invoice January',
    subject: 'subject',
    html: '<body></body>',
    text: 'plain text'
  }
*/
MailerBotClient.prototype.send = function(opts){
  return this.jobQueue.add(opts);   
}

module.exports = MailerBotClient;


