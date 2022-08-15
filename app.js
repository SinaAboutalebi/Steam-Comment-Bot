//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Import Packages 

const moment = require('moment');
const util = require("util");
const axios = require('axios');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const config = require('./src/config.json');
const comments = require('./src/comments.json');

const client = new SteamUser();
const community = new SteamCommunity();

const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: 'en'
});

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Functions

function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

 async function postComment(steamID ,comment){

    /* Api Get data */
    const GetData = async () => {
        const options = {
            method: 'GET',
            url: 'https://steamcommunity.com/groups/Jdm_loverss/memberslistxml/?xml=1'
        };
        const result = await axios.request(options)
        return result.data
    }
    /* ------------ */
    const data = await GetData()
    if (data.includes(steamID)){client.chatMessage(steamID, "OKi Doki,\n I'll comment your profile!😇")
    community.postUserComment(steamID, comment)
    console.log(comment)}else{
      client.chatMessage(steamID, "😪I can't find you in my group\nplz join my group then try again!😇\nhttps://steamcommunity.com/groups/Jdm_loverss")
    }
  
}

function sendStatus(steamID){
  var uptime = process.uptime();
  client.chatMessage(steamID, `Hey Admin ✋\n\n 🕗Server Uptime : ${format(uptime)}\n 📓Admin ID :  ${config.admin}`); //🗒️Comments Length: ${comment.length}
}

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//LogOn Options

const logOnOptions = {
    accountName : config.username,
    password : config.password
};

util.log("Logged on.");
//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Start

client.on("loggedOn", function() {


    console.log(`Logged in as ${config.username}  at ${moment().format("DD MMMM YYYY, HH:mm:ss")}\n DeVeLoPeD By 'Zer0Power`);
    client.setPersona(SteamUser.EPersonaState.Online, "-/ᴇʟɪ ᴛʜᴇ ᴤʟᴇᴇᴘ ᴅᴇᴀʟᴇʀ");
    // client.gamesPlayed("Listening To !help");
    client.gamesPlayed(730)
    
    
    })

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//Command 

client.on("friendMessage", function(steamID, message) {


  //Prefix Setting =========================================
  const Prefix = "!";
  if (!message.startsWith(Prefix)) {
    client.chatMessage(steamID, "❌Invalid Command, Type !help to see all of my commands") 
  return;
}
  const commandBody = message.slice(Prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
//========================================================= 

    if (command === "status"){
      if (config.admin!=steamID){
        client.chatMessage(steamID, "⚠️Sorry ,You Are Not Allowed To Use This Command!"); 
        return;
          }else{
      sendStatus(steamID)
    }
    }

    if(command === "help"){
      client.chatMessage(steamID,`💫 1x1 :\n!random : I'll choose a comment for you =)\n!niceday : Have a nice day\n!heart1 : Random small heart\n!bigheart1 : Random Big heart\n\n💫 6x6 :\n!heart6 : Random small heart\n!bigheart6 : Random big heart\n\n💫 +REP :\n!rep1 : +rep\n!rep2 : +rep Friendly 🤍\n!rep3 : +rep Kind person 🖤\n!rep4 : +rep Good player 💙\n!rep5 : +rep Amazing profile ❤️\n\n!group : Join my group to find new friends.\n`)
    }
    if (command === "group"){
      client.chatMessage(steamID,"🌹Feel Free To join :)\nhttps://steamcommunity.com/groups/Jdm_loverss")
    }
//comments ============================================================
    if (command === "random") {
      const rr = Math.floor(Math.random() * Math.floor(comments.all.length))
     postComment(steamID,comments.all[rr])
    }
    if (command === "niceday"){
      const rr = Math.floor(Math.random() * Math.floor(comments.niceday.length))
      postComment(steamID,comments.niceday[rr])
    }
    if (command === "heart1"){
      const rr = Math.floor(Math.random() * Math.floor(comments.heart.length))
      postComment(steamID,comments.heart[rr])
    }
    if (command === "bigheart1"){
      const rr = Math.floor(Math.random() * Math.floor(comments.bigheart.length))
      postComment(steamID,comments.bigheart[rr])
    }
//6x6 comments =========================================
    if (command === "heart6"){
      const rr = Math.floor(Math.random() * Math.floor(comments.heart.length))
      let i = 0
      while (i<6){
        i++
        postComment(steamID,comments.heart[rr])
      }
    }
    if (command === "bigheart6"){
      const rr = Math.floor(Math.random() * Math.floor(comments.bigheart.length))
      let i = 0
      while (i<6){
        i++
        postComment(steamID,comments.bigheart[rr])
      }
    }
//+Rep Comments =========================================
    if (command === "rep1"){
      postComment(steamID,comments.rep[0])
    }
    if (command === "rep2"){
      postComment(steamID,comments.rep[1])
    }
    if (command === "rep3"){
      postComment(steamID,comments.rep[2])
    }
    if (command === "rep4"){
      postComment(steamID,comments.rep[3])
    }
    if (command === "rep5"){
      postComment(steamID,comments.rep[4])
    }

});

client.on('friendRelationship', function(steamID, relationship) {

      client.addFriend(steamID);
      client.chatMessage(steamID,"Hellowwwwwww ,Nice to meet you 🌹\n\n\n\nType !help to see all of my commands😇");
  
});

//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//webSession 

client.on('webSession', function(sessionid, cookies) {

  manager.setCookies(cookies);

  community.setCookies(cookies);
  community.startConfirmationChecker(20000, config.identitySecret);

});
//---------------------------💔🚬 ᶻᵉʳᵒ༄ᴩᴏᴡᴇʀ💔🚬---------------------------//
//LogOn

client.logOn(logOnOptions);
client.setOption("PromptSteamGuardCode", false);