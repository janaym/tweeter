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
  const tweetContent = tweet.content.text;


  //get date difference
  const tweetDate = tweet.created_at;
  const timeAgo = timeago.format(tweetDate);

  //create tweet
  const $tweet = `
    <article>
      <header>
        <span class="user-header">
          <img src='${userAvatar}'></i>
          <span>${userName}</span>
        </span>
        <span class="user-id">${userHandle}</span>
      </header>

    <p>${escape(tweetContent)}</p>

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

  return $tweet;
};


//takes in a string and escapes it to prevent cross-site scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//takes in an array of tweets and appends them to the tweet container in our index.html file
const renderTweets = function(tweets) {
  for (tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('.tweet-container').append($tweetElement);
  }
};


//takes in tweet content string. Returns false if it is either empty or over 140 characters. Returns true otherwise
function validateForm(tweet) {
  event.preventDefault();

  $error = $('.error-message');

  if (!tweet) {
    $error.children('span').text("Looks like you forgot to say something!");
    $error.slideDown();
    return false;
  }

  if (tweet.length > 140) {
    $error.children('span').text("Oops! Too many characters!");
    $error.slideDown();
    return false;
  }
  return true;
}


//fetches all tweets from the /tweets endpoint and sends them to be rendered.
const loadTweets = function() {
  const data = $.get('/tweets', function(data, status) {
    renderTweets(data);
  });
};




$(document).ready(function() {

  //post new tweets to /tweets
  $('#new-tweet').on('submit', function() {
    event.preventDefault();

    //get rid of any previous error messages
    $('.error-message').slideUp();

    const $text = $('#tweet-text').val();
 
    if (!validateForm($text))    {
      $('#tweet-text').val('');
      return;
    }
    //send serialized data to server
    $.post('/tweets', { text: $text}, function(data, status) {
      //console.log('success!', data);
      const tweets = $.get('/tweets', function(data, status) {
        console.log(data, typeof(data))
        const mostRecentTweet = data.reverse()[0];
        console.log(mostRecentTweet);
        renderTweets([mostRecentTweet])
      })
      
      $('#tweet-text').val('');
    });
  });
  
  //loads all tweets currently in the /tweets endpoint
  loadTweets();
});