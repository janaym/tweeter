/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//fake tweets
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//takes in a tweet data structure and returns a snippet of html that will display the tweet on our webpage
const createTweetElement = function(tweet) {

  //extract info from tweet
  const userName = tweet.user.name;
  const userHandle = tweet.user.handle;
  const userAvatar = tweet.user.avatars;
  const tweetContent = tweet.content.text

  //get date difference
  const currDate = new Date().getTime();
  const tweetDate = tweet.created_at;
  //const daysElapsed = Math.floor((currDate - tweetDate) / 86400000);

  const $tweet = `
    <article>
      <header>
        <span class="user-header">
          <img src='${userAvatar}'></i>
          <span>${userName}</span>
        </span>
        <span class="user-id">${userHandle}</span>
      </header>

    <p>${tweetContent}</p>

    <footer>
      <span>${tweetDate}</span>
      <span class="icon-bar">
        <i class="fa-solid fa-flag" style="color: #"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  
  </article> 
  `;

  return $tweet
}

//takes in an array of tweets and appends them to the tweet container in our index.html file
const renderTweets = function (tweets){
  for(tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('.tweet-container').append($tweetElement);
  }
}


$(document).ready(function (){
  renderTweets(data)
});