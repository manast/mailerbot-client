/**
  MailerBot - Client
  
  Provides different jobs for sending email with invoice data, etc.
  
  (c) 2013 OptimalBits - MIT Licensed.
*/
"use strict";

var Queue = require('bull');
var util = require('util');

var JOB_QUEUE_NAME = 'MailerBot';
var RESULTS_QUEUE_PREFIX = 'MailerBot-client-';

/**
  MailerBotClient.

  Returns an instance of a mailerbot client.

  opts: {
    redis: {
      port: 6379,
      host: localhost
      opts: {}
    }
  }
*/
function MailerBotClient(opts){
  if(!this){
    return new MailerBotClient(opts);
  }
  this.clientId = opts.clientId || 'default';
  this.jobQueue = Queue(JOB_QUEUE_NAME, opts);

  this.resultsQueueName = RESULTS_QUEUE_PREFIX+this.clientId;
  this.resultsQueue = Queue(this.resultsQueueName, opts);
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
module.exports.JOB_QUEUE_NAME = JOB_QUEUE_NAME;
module.exports.RESULTS_QUEUE_PREFIX = RESULTS_QUEUE_PREFIX;


