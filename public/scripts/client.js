/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (object) {
  const $tweet = $(
    `<article class="tweet-container">
        <header class="tweet-container-header">
          <div class="user-firstname">
            <img class='profile-pic' src="${object.user.avatars}" alt="user profile image">
            <p class="firstname">${object.user.name}</p>
          </div>
          <p class="user-name">${object.user.handle}</p>
        </header>
        <p class="posted-tweet">${object.content.text}</p>
        <hr>
        <footer class="tweet-container-footer">
          <p class="date-text">${object.created_at}</p>
          <div class="icons">
            <i class="fa-solid fa-flag fa-2xs"></i>
            <i class="fa-solid fa-retweet fa-2xs"></i>
            <i class="fa-solid fa-heart fa-2xs"></i>
          </div>
        </footer>
      </article>`
  )
}



// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
