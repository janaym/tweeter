/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//takes in a tweet data structure and returns a snippet of html that will display the tweet on our webpage
const createTweetElement = function(tweet) {

  //extract info from tweet
  const userName = tweet.user.name;
  const userHandle = tweet.user.handle;
  const userAvatar = tweet.user.avatars;
  const tweetContent = tweet.content.text

  //get date difference

  const tweetDate = tweet.created_at;
  const timeAgo = timeago.format(tweetDate);

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
      <span>${timeAgo}</span>
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
  console.log(tweets)
  for(tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('.tweet-container').append($tweetElement);
  }
}



$(document).ready(function (){
  
  console.log('hello! from outside');
  const loadTweets = function () {
    const data = $.get('/tweets', function (data, status) {
    renderTweets(data);
    })
    
    
  };
  loadTweets();

});