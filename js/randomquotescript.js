function getData() {

        $.ajax({
            url: 'https://api.quotable.io/random',
            
            success: function(data) {

              console.log(data);


              $('#advice').html('"'+data.content+'"'+"<br>"+"<span>"+"- "+data.author+"</span>");

              $('#twitterlink').attr("href","https://twitter.com/share?text="+'"'+data.content+'"'+" - "+data.author);
              $('#whatsapplink').attr("href","whatsapp://send?text="+'"'+data.content+'"'+" - "+data.author);
              $('.dummy').css("display","none");
              $('.social').fadeIn();
              $('.container').css("display","block");
              

              //$('#facebooklink').attr("href","https://www.facebook.com/sharer/sharer.php?u="+data.content+" - "+data.author);
            }
         
     })

    }

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();

}

function showMessage(){

  $('header').text("COPIED!!");
  $('header').css("color","#FFF");
  //$('header').css("backgroundColor","#f0002f");
  $('header').css("backgroundColor","#53a653");
  

  setTimeout(hideMessage, 1500)
}

function hideMessage(){

  $('header').text("RANDOM QUOTE");
  $('header').css("color","#f0002f");
  $('header').css("backgroundColor","#000");


}

