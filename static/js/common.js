//屏幕大于992
// window.onresize = function () {
//     resize()
// }
// function resize() {
//     var rem = 0;
//     var htmlDOM = document.documentElement;
//     var currentWidth = htmlDOM.clientWidth;
//     if (currentWidth > 992) {
//         rem = currentWidth / 12;
//         htmlDOM.style.fontSize = rem + 'px';
//     }
// }

//返回顶部
$(window).scroll(function () {
  if ($(this).scrollTop() > 500) {
    $('.backtop').fadeIn();
  } else {
    $('.backtop').fadeOut();
  }
});
$(".backtop").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 1000);
  return false;
});

//头部卷门帘
$('#navbar .dropdown').mouseenter(function () {
  $(this).find('div').stop().slideDown();
});
$('#navbar .dropdown').mouseleave(function () {
  $(this).find('div').stop().slideUp();
});

//点击马上体验
$('.nav-right-advisory').click(function () {
  $('.mask').removeClass('hide');
  $('.public-advisory').removeClass('hide');
})
//点击隐藏
$('.public-form-exit').click(function () {
  $('.mask').addClass('hide');
  $('.public-form').addClass('hide');
})
//马上体验表单验证
$('#attemptForm input').bind('keyup blur', function () {
  var name = $("#name").val();
  var phone = $("#phone").val();
  if ($.trim(name) == '' || $.trim(phone) == '') {
    $("#submit").attr('disabled', 'true');
  } else {
    $("#submit").removeAttr('disabled');
  }
});
$("#submit").click(function () {
  var name = $("#name").val();
  var phone = $("#phone").val();
  var content = $('#content').val();

  $.ajax({
    type: "post",
    url: "/shuangchuangboost/save_mgx",
    data: { name: name, phone: phone, content: content },
    dataType: 'json',
    beforeSend: function () {
      if (!/^([a-zA-Z]{1,20}|[\u4e00-\u9fa5]{2,10})$/.test(name)) {
        $('#name').next().removeClass('hidden');
        return false;
      } else if (!/^1\d{10}$/.test(phone)) {
        $('#name').next().addClass('hidden');
        $('#phone').next().removeClass('hidden');
        return false;
      } else {
        $('#phone').next().addClass('hidden');
      }
    },
    success: function (data) {
      console.log(data);
      if (data.status == "success") {
        $('.public-form').addClass('hide');
        $("#name").val('');
        $("#phone").val('');
        $("#content").val('');
        $('.public-tips').text('留言成功！工作人员会在24小时内和您联系，请耐心等待～').show(600).delay(3000).hide(600);
      } else {
        $('.public-tips').addClass('red').text(data.message).show(600).delay(3000).hide(600);
      }
    },
    error: function () {

    }
  });

})