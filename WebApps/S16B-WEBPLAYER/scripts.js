
$('.page').hide()
$('#page_home').show()


$('#btn_home').click(function(){
  $('#page_list').fadeIn(300)
})

$('.site_item').click(function(){
  var site = $(this).attr('href')
  $('#iframe').attr('src',site)
  $('#page_web').fadeIn(300)
})

$('#btn_close').click(function(){
  $('#iframe').attr('src','')
  $('#page_web').fadeOut(300)
})
