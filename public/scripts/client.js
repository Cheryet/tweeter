/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  console.log('Hello From APP.JS')

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (object) {
    //Fills in HTML template below with new tweet data
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
    )
    return $tweet;
  }

  const renderTweets = function (array) {
    //pushes all tweets through to new tweet html template
    for (let obj of array) {
      const $tweet = createTweetElement(obj);
      $('.tweet-feed').prepend($tweet);
    }

  }

  //takes json data with GET route to /tweets and returns them in browser
  const loadTweets = () => {
    $.get('/tweets', function(data) {
      console.log('Data Type: ' ,typeof data)
      console.log(data)
      return renderTweets(data)
    })
  }
  

  //reasign our form to a variable
  const tweetForm = $('#tweet-form')
    

  //handler function for our form submit
  const handleTweetForm = (event) => {
    //prevents submit to happen through browser
    event.preventDefault();
    console.log('Hello from SUBMIT!!')
    
    //reasigns textarea input value
    const tweetInput = $('#tweet-text').val()
    console.log(tweetInput)

    //Shows error message if input is null/empty
    if (tweetInput === '' || tweetInput === null){
      return $('.error-text').text('Error: Input field is empty, add a Tweet')
      
    }
    
    //error message if input is too long
    if (tweetInput.length > 140) {
      return $('.error-text').text('Error: Tweet is too long')
    }

    //send input data post route to convert to json
    $.post( "/tweets", tweetForm.serialize() );
    console.log(tweetForm)
    $('.error-text').text('')

    //clears counter after submition
    const inputArea = $("textarea[name='text']")
    inputArea.val('')
    inputArea.trigger('input')

    loadTweets();




    
  }

  
  
  tweetForm.submit(handleTweetForm)
  loadTweets()
  
})



