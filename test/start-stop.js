const BotTester = require('messenger-bot-tester');
const Alana = require('@alana/core');
const FB = require('../lib/index').default;
const request = require('request-promise');

describe('start & stop', function() {
  // webHookURL points to where yout bot is currently listening
  // choose a port for the test framework to listen on
  const testingPort = Math.round(Math.random()*1000) + 4000;
  const botPort = Math.round(Math.random()*1000) + 4000;
  const webHookURL = 'http://localhost:' + botPort + '/webhook';
  const tester = new BotTester.default(testingPort, webHookURL);
  const bot = new Alana.default();
  bot.turnOnDebug();
  const platform = new FB(bot, botPort, 'access_token', '/webhook', 'verify_me');

  before(function(){
    // start your own bot here or having it running already in the background
    // redirect all Facebook Requests to http://localhost:3100/v2.6 and not https://graph.facebook.com/v2.6
    platform.graph_url = `http://localhost:${testingPort}`;
    bot.start();
    return tester.startListening();
  });
  
  it('start', function(){
    return bot.start();
  });

  it('stop', function(){
    return bot.stop();
  });
})