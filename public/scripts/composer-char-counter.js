

$(document).ready(function() {
  $("textarea[name='text']").on('input', function() {
    let total = 140;
    let length = $( this ).val().length;
    let count = total - length;
    $('output[name="counter"]').text(count)

    if (count < 0 ) {
      $('output[name="counter"]').css({'color': 'red'})
    } else {
      $('output[name="counter"]').css({'color': 'black'})

    }
  })

  
});