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
  console.log(tweetContent)

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

function validateForm(tweet) {
  event.preventDefault()

  if (!tweet) {
    alert("Name must be filled out");
    return false;
  }
  if (tweet.length > 140) {
    //console.log('failed validation')
    alert("Tweet is too long");
    return false;
  }
  //console.log('validation passed')
  return true;
}

const loadTweets = function () {
  const data = $.get('/tweets', function (data, status) {
    //console.log(data)
    renderTweets(data);
  })
  
  
};


$(document).ready(function (){

  //post new tweets to /tweets
  $('#new-tweet').on('submit', function () {
    event.preventDefault();
    
    const $text = $('#tweet-text').val();
    //console.log( $text);

    if(!validateForm($text))    {
      $('#tweet-text').val('')
      return;
    }
    //send serialized data to server
    $.post('/tweets', { text: $text}, function(data, status) {
      //console.log('success!', data);
    })
  })

  loadTweets();

});