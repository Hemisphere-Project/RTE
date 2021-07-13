$('.page').hide()
$('#page_home').show()


$('#page_home').click(function(){
  $(this).hide()
  $('#page_list').fadeIn(300)
})

$('#goGallery').click(function(){
  $('#page_list').hide()
  $('#page_gallery_list').fadeIn(300)
})

$('#goVideo').click(function(){
  $('#page_list').hide()
  $('#page_video').fadeIn(300,function(){
    playFilm();
  })
})



//////////////// VIDEO PLAYER ////////////////


function playFilm(){

  $("#videoplayer")[0].play();
}


//SCROLLBAR
///////////////////////////////////////////////////////////

  $('#scrollbarContainer').on('click',function(e){
    var offset = $(this).offset();
    var relX = e.pageX - offset.left;
    var percent = ( relX / $(this).width() )*100;
    var videoDuration = $("#videoplayer")[0].duration;
    var time2Seek=percent*videoDuration/100;
    $('#videoplayer')[0].currentTime = time2Seek;
    // $('#scrollbar').css('margin-left', percent+'%');
    $('#scrollbar').css('width', percent+'%');
  });

  $('#videoplayer').on('timeupdate', function(e){
    var currentTime = e.target.currentTime;
    var videoDuration = $("#videoplayer")[0].duration;
    var percent = currentTime*100/videoDuration;
    // $('#scrollbar').css('margin-left', percent+'%');
    $('#scrollbar').css('width', percent+'%');
  });
