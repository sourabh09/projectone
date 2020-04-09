$(document).ready(function() {
  
function getJoke() {
$.getJSON("https://icanhazdadjoke.com/", function(json) { 
  let dadJoke = json.joke;
  console.log(dadJoke);
   $("#quote").html(dadJoke);
   $("#getJoke").css('display','inline-block');
   $(".container").css('display','block');
      });
}
  
  getJoke();
  $("#getJoke").on("click", getJoke);


});



