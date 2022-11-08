$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.getElementById('tweet-text')
  $(textArea).on('input', function() {
    console.log(this)
  })
  
});