
    function getData(){

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth()+1;


    const app = document.getElementById('root')

    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)

    var request = new XMLHttpRequest()

    request.open('GET', 'https://byabbe.se/on-this-day/'+month+'/'+day+'/events.json', true);
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    var fulldate = data.date;
    /*var circuits = data.MRData.CircuitTable.Circuits;*/

  console.log(data);
  var events = data.events;

  if (request.status >= 200 && request.status < 400) {
    $('#fixed').css("display","block");
    $('.dummy').css("display","none");
    $('#fixed').text(fulldate);

     events.forEach(events => {

      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      container.appendChild(card)

      const p1 = document.createElement('p')
      p1.textContent = events.description;
         
      const h3 = document.createElement('h5')
      h3.textContent = "Year "+events.year;

      container.appendChild(card)
      card.appendChild(h3)
      card.appendChild(p1)
    
     })



  } else {
    console.log('error')
  }

}

request.send()

}

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
        return false;
    });


})