//////////////// NAVIGATION ////////////////

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

$('#btn_close_gallerylist').click(function(){
  $('#page_gallery_list').hide()
  $('#page_list').fadeIn(300)
})

$('#btn_close_gallery').click(function(){
  $('#page_gallery').hide()
  $('#page_gallery_list').fadeIn(300)
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

  window.onload = timerReset;
  document.onkeypress = timerReset;
  document.onmousemove = timerReset;
  document.onmousedown = timerReset;
  document.ontouchstart = timerReset;
  document.onclick = timerReset;
  document.onscroll = timerReset;
  document.onkeypress = timerReset;

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


//////////////// GALLERY ////////////////
var indexDisplay = 1
var galleryLength = $('.gallery_item').length

// NEXT
$('#btn_next').click(function(){
  indexDisplay ++
  if (indexDisplay>galleryLength){indexDisplay=1}
  gotoIndex(indexDisplay)
})

function gotoIndex(index){
  $('.gallery_item.active').fadeOut(200,function(){
    $(this).removeClass('active');
    $('.gallery_item:nth-child('+index+')').addClass('active');
    $('.gallery_item:nth-child('+index+')').fadeIn(200);
  })
}

//////////////// INIT GALLERY ////////////////
$('#page_gallery_list .list_item').click(function(){

  $('#page_gallery_list').hide()
  $('#page_gallery').fadeIn(300)

  indexDisplay = $(this).attr('galleryIndex');
  $('.gallery_item').hide();
  $('.gallery_item:nth-child('+indexDisplay+')').addClass('active');
  $('.gallery_item:nth-child('+indexDisplay+')').fadeIn(200);

  attachPinch(indexDisplay);
})


//////////////// PINCH ZOOM ////////////////

// DON'T WORK
// https://stackoverflow.com/questions/10802176/pinch-to-zoom-with-css3
// -- ?
// pinch enabled ? sur wrapper ou sur div ? à débugger depuis touch device

// var hamObj = new Hammer($('body')[0]);
// hamObj.get('pinch').set({ enable: true });
// $('body').data("hammer", hamObj);
// $('body').hammer().on("pinch", function(event) {
//   console.log('pinching');
// });

// var hammertime = new Hammer($('body')[0]);
// hammertime.get('pinch').set({ enable: true });
// hammertime.on("pinch", function(e) { });


function attachPinch(indexDisplay){


  var wrapper = $('.gallery_item:nth-child('+indexDisplay+')')
  var image = $(wrapper).children('img')

  var  width = image.width();
  var  height = image.height();
  console.log(width);
  var  newX = 0;
  var  newY = 0;
  var  offset = wrapper.offset();

  // ENABLE PINCH
  // var hamObj = new Hammer($(wrapper)[0]);
  // hamObj.get('pinch').set({ enable: true });
  // $(wrapper).data("hammer", hamObj);
  // ENABLE PINCH
  var hamObj2 = new Hammer($(image)[0]);
  hamObj2.get('pinch').set({ enable: true });
  $(image).data("hammer", hamObj2);


  $(image).hammer().on("pinch", function(event) {
    console.log('pinching');
    var photo = $(this);

    newWidth = photo.width() * event.gesture.scale;
    newHeight = photo.height() * event.gesture.scale;

    // Convert from screen to image coordinates
    var x;
    var y;
    x -= offset.left + newX;
    y -= offset.top + newY;

    newX += -x * (newWidth - width) / newWidth;
    newY += -y * (newHeight - height) / newHeight;

    photo.css('-webkit-transform', "scale3d("+event.gesture.scale+", "+event.gesture.scale+", 1)");
    wrapper.css('-webkit-transform', "translate3d("+newX+"px, "+newY+"px, 0)");

    width = newWidth;
    height = newHeight;
  });

}
