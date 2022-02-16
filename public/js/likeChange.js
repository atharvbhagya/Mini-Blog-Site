


$(function(){
  $('.post-likes').on('click', (event)=>{
    event.preventDefault();
    console.log(event);
    let currlike= $(event.delegateTarget);
    
    //  let self= this;
   
      $.ajax({
        url: currlike.attr('href'),
        type:'POST'
        //'dataType': "json"
      })
      .done(function(data){
        console.log("Message is-->", data.message);
        if(data.error==undefined){
          
          console.log("New Likes on post-->",data.data.count);
          console.log('I was in the likeChange script!--> href val', currlike.attr('href'));
          console.log("Initial Likes on post--->", currlike.attr('like-Count'));
          currlike.html(` <button class="like" >
                
          <i class="far fa-thumbs-up" ></i>
          ${data.data.count}
        </button>`);
        currlike.attr('like-Count', parseInt(data.data.count));
        }else{
          console.log("I was here in the toastr part!");
          toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': false,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'showDuration': '1000',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut',
          }
          toastr.error(`${data.message}`);
        }
      })
      .fail(function(errData) {
        if(errData){
          console.log('error in completing the request');

        }
    });


    
  });
});

