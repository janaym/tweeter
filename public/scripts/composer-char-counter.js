$(document).ready(function() {


  $("#tweet-text").on('input', function() {
    const currentTweet = $(this).val();
    const tweetLen = currentTweet.length;


    //target counter
    const counter = $(this).parent().children('footer').children('output');

    if (tweetLen < 140) {
      counter.css('color', '#545149');
      counter.text(tweetLen);
      return;
    }
    
    const charOverflow = 140 - tweetLen;
    counter.css('color', 'red');
    counter.text(charOverflow);
  });
  



});


