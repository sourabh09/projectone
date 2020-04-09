function getData() {

          

        $.ajax({
            
            url: 'https://horoscope-api.herokuapp.com/horoscope/today/leo',
            
            success: function(data) {

              console.log(data);


              /*$('#word').html(data.word+"<br>"+"<span>"+data.definitions[0].text+"<br>"+"( "+data.note+" )"+"</span>"); 
              $('.dummy').css("display","none");*/     

            }
         
     })

    }


