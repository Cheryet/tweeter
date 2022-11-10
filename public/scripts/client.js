/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  //Prevents XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Fills in HTML template with new tweet data
  const createTweetElement = function(object) {
    const $tweet = $(
      `<article class="tweet-container">
          <header class="tweet-container-header">
            <div class="user-firstname">
              <img class='profile-pic' src="${object.user.avatars}" alt="user profile image">
              <p class="firstname">${object.user.name}</p>
            </div>
            <p class="user-name">${object.user.handle}</p>
          </header>
          <p class="posted-tweet">${escape(object.content.text)}</p>
          <hr>
          <footer class="tweet-container-footer">
            <p class="date-text">${timeago.format(object.created_at)}</p>
            <div class="icons">
              <i class="fa-solid fa-flag fa-2xs"></i>
              <i class="fa-solid fa-retweet fa-2xs"></i>
              <i class="fa-solid fa-heart fa-2xs"></i>
            </div>
          </footer>
        </article>`
    );
    return $tweet;
  };

  //pushes all tweets through to new tweet html template
  const renderTweets = function(array) {

    //empties tweet feed to prevent duplicates
    $('.tweet-feed').empty();

    //loads all tweets to feed in chronological order
    for (let obj of array) {
      const $tweet = createTweetElement(obj);
      $('.tweet-feed').prepend($tweet);
    }
  };

  //Gets Json data and returns it in html on browser
  const loadTweets = () => {
    $.get('/tweets', function(data) {
      return renderTweets(data);
    });
  };
  

  //reasign our form to a variable
  const tweetForm = $('#tweet-form');
    

  //handler function for our form submit
  const handleTweetForm = (event) => {
    //prevents submit to happen through browser
    event.preventDefault();
    
    //reasigns textarea input value
    const tweetInput = $('#tweet-text').val();

    //Shows error message if input is null/empty
    if (tweetInput === '' || tweetInput === null) {
      return $('.error-text').text('Error: Input field is empty, add a Tweet');
    }

    //Shows error message if input is too long
    if (tweetInput.length > 140) {
      return $('.error-text').text('Error: Tweet is too long');
    }

    //Post route for form data to Json file/tweets
    $.post("/tweets", tweetForm.serialize());

    //clears errror text from screen if present
    $('.error-text').empty();

    //clears counter after submition
    const inputArea = $("textarea[name='text']");
    inputArea.val('');
    inputArea.trigger('input');

    loadTweets();
    
  };

  
  //Async loads tweets into feed upon form submition
  tweetForm.submit(handleTweetForm);

  //inital Load of tweets from database
  loadTweets();
  
});



