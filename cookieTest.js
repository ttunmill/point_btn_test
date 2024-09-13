$(function() {
  toggleMainPopup();
});

$('.point_btn').on('click', function() {
  let point = Math.floor(Math.random() * 101);
  let popup = `<div class="point_pop_bg" name="point_popup"><div class="point_pop_container"><span class="point_pop_close"><i class="fa-solid fa-xmark"></i></span><div class="popup_contents"><p><span class="point_num"></span> 포인트 획득하셨습니다.</p><div class="point_btn_wrap"><button type="button" class="point_submit">확인</button></div></div></div></div>`;
  
  let point_box = chk_bg();
  if(point_box) {
      $(this).after(popup)
      $('.point_num').text(point)
  }
  
  function chk_bg() {
      if($(document).find('.point_pop_bg').length == 0) {
          return true
      } else {
          return false
      }
  }
  
});

close_bg('.point_pop_close')
close_bg('.point_submit')
function close_bg(name) {
  $(document).on('click', name, function() {
      $(this).parents().find('.point_pop_bg').remove();
  })
  return true;
}

var toggleMainPopup = function() {

  /* 스토리지 제어 함수 정의 */
  var handleStorage = {
    // 스토리지에 데이터 쓰기(이름, 만료일)
  setStorage: function (name, exp) {
      // 만료 시간 구하기(exp를 ms단위로 변경)
      var date = new Date();
      date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      // 로컬 스토리지에 저장하기
      // (값을 따로 저장하지 않고 만료 시간을 저장)
      localStorage.setItem(name, date)
  },
    // 스토리지 읽어오기
  getStorage: function (name) {
      var now = new Date();
      now = now.setTime(now.getTime());
      // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
      // 시간이 남아 있으면 true, 아니면 false 리턴
      return parseInt(localStorage.getItem(name)) > now
      }
  };
  
  
  // 쿠키 읽고 화면 보이게
  if (handleStorage.getStorage("today")) {
      $('.point_btn').off()
      $('.point_btn').css('background-color', '#2944ff');
      $('.point_btn').text('지급 완료');
  }
  
  $(".point_wrap").on("click", ".point_pop_close", function () {
      handleStorage.setStorage("today", 1);
      $(this).parents().find('.point_btn').css('background-color', '#2944ff');
      $('.point_btn').text('지급 완료');
      $('.point_btn').off()
  });

  // 일반 버튼
  $(".point_wrap").on("click", ".point_submit", function () {
      handleStorage.setStorage("today", 1);
      $(this).parents().find('.point_btn').css('background-color', '#2944ff');
      $('.point_btn').text('지급 완료');
      $('.point_btn').off()
  });
}


// var toggleMainPopup = function() {
//     /* 쿠키 제어 함수 정의 */
//     var handleCookie = {
//       // 쿠키 쓰기
//       // 이름, 값, 만료일
//     setCookie: function (name, val, exp) {
//         var date = new Date();
        
//         // 만료 시간 구하기(exp를 ms단위로 변경)
//         date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
//         console.log(name + "=" + val + ";expires=" + date.toUTCString() + ";path=/");
        
//         // 실제로 쿠키 작성하기
//         document.cookie = name + "=" + val + ";expires=" + date.toUTCString() + ";";
//     },
//       // 쿠키 읽어오기(정규식 이용해서 가져오기)
//     getCookie: function (name) {
//         var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
//         return value ? value[2] : null;
//         }
//     };
    
//     console.log(handleCookie.getCookie("today"));
    
//     // 쿠키 읽고 화면 보이게
//     if (handleCookie.getCookie("today") == "y") {
//         // $(".point_wrap").remove();
//         // $(".point_wrap").remove();
//         $('.point_btn').off()
//         $('.point_btn').css('background-color', '#2944ff');
//         $('.point_btn').text('지급 완료');
//     } else {
//         // $(".main_popup").addClass("on");
//     }

//     // 오늘하루 보지 않기 버튼
//     $(".point_wrap").on("click", ".point_pop_close", function () {
//         handleCookie.setCookie("today", "y", 1);
//         $(this).parents().find('.point_btn').css('background-color', '#2944ff');
//         // $(this).parents().find('.point_wrap').remove();
//         $('.point_btn').text('지급 완료');
//         $('.point_btn').off()
//     });

//     // 일반 버튼
//     $(".point_wrap").on("click", ".point_submit", function () {
//         handleCookie.setCookie("today", "y", 1);
//         $(this).parents().find('.point_btn').css('background-color', '#2944ff');
//         $('.point_btn').text('지급 완료');
//         $('.point_btn').off()
//     });
// }