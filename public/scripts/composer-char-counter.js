

$(document).ready(function() {
  //Counts total input on text area and pushes to page
  $("textarea[name='text']").on('input', function() {
    let total = 140;
    let length = $( this ).val().length;
    let count = total - length;
    $('output[name="counter"]').text(count)

    //adjusts colour of counter
    if (count < 0 ) {
      $('output[name="counter"]').css({'color': 'red'})
    } else {
      $('output[name="counter"]').css({'color': 'black'})

    }
  })

  
});