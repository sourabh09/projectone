function getData() {

          var api_key = "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

        $.ajax({
            
            url: 'https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key='+api_key,
            
            success: function(data) {

              console.log(data);


              $('#word').html(data.word+"<br>"+"<span>"+data.definitions[0].text+"<br>"+"( "+data.note+" )"+"</span>"); 
              $('.dummy').css("display","none");     
              $('.container').css("display","block");  
            }
         
     })

    }


