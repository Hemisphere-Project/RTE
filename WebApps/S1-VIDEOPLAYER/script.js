//////////////// NAVIGATION ////////////////

$('.page').hide()
$('#page_home').show()

$('#page_home').click(function(){
  $(this).hide()
  $('#page_list').fadeIn(300)
})

$(".list_item").click(function(){
  var vid = $(this).attr('vid');
  console.log(vid);
  $("#videoplayer")[0].setAttribute('src', '/medias/S1/'+vid);
  $('#page_list').hide()
  $('#page_video').fadeIn(300,function(){
    playFilm();
  })
})

// LANGUE
$('.video_en').hide();

$('#btn_fr_home, #btn_fr_list').click(function(){
  $('.video_en').hide();
  $('.video_fr').show();
})
$('#btn_en_home, #btn_en_list').click(function(){
  $('.video_fr').hide();
  $('.video_en').show();
})


//////////////// VIDEO PLAYER ////////////////

var scrollBarUpdate;

function playFilm(){
  $("#videoplayer")[0].play();
  //SCROLLBAR INTERVAL
  scrollBarUpdate = setInterval(function(){
    var currentTime = $('#videoplayer')[0].currentTime
    var videoDuration = $("#videoplayer")[0].duration
    var percent = currentTime*100/videoDuration
    $('#scrollbar').css('width', percent+'%')
  }, 20)
}

//SCROLLBAR AUTO
// $('#videoplayer').on('timeupdate', function(e){
//   var currentTime = e.target.currentTime
//   var videoDuration = $("#videoplayer")[0].duration
//   var percent = currentTime*100/videoDuration
//   $('#scrollbar').css('width', percent+'%')
// })

//SCROLLBAR CLICK
$('#scrollbarContainer').on('click',function(e){
  var offset = $(this).offset()
  var relX = e.pageX - offset.left
  var percent = ( relX / $(this).width() )*100
  var videoDuration = $("#videoplayer")[0].duration
  var time2Seek=percent*videoDuration/100
  $('#videoplayer')[0].currentTime = time2Seek
  $('#scrollbar').css('width', percent+'%')
});

// END || CLOSE
$('#videoplayer').on('ended',function(){
  stopFilm();
});
$('#btn_close_video').click(function(){
  stopFilm();
})
function stopFilm(){
  $('#page_video').hide()
  $('#page_list').fadeIn(300)
  clearInterval(scrollBarUpdate)
  $('#scrollbar').css('width', '0%')
  $("#videoplayer")[0].currentTime = 0
  $("#videoplayer")[0].pause()
}

//AUTO HIDE CONTROLS
var idleTime = 3000;
var autoHideControls = function() {
  var timer;

  // window.onload = timerReset;
  // document.onkeypress = timerReset;
  // document.onmousemove = timerReset;
  // document.onmousedown = timerReset;
  // document.ontouchstart = timerReset;
  // document.onclick = timerReset;
  // document.onscroll = timerReset;
  // document.onkeypress = timerReset;
  $('body').mousemove(function(){ timerReset(); })
  $('body').click(function(){ timerReset(); })

  function timerElapsed() {
    hideControls();
  };
  function timerReset() {
    showControls();
    clearTimeout(timer);
    timer = setTimeout(timerElapsed, idleTime);
  }
  function hideControls(){
    $('#scrollbarContainer, #btn_close_video').fadeOut(300);
  }
  function showControls(){
    $('#scrollbarContainer, #btn_close_video').fadeIn(300);
  }
};
autoHideControls();
