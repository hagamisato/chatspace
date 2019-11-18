
$(function(){
  function buildHTML(message){
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""
    var html = `<div class="message__upper">
                 <div class="message__upper__name">
                    ${message.user_name}
                 </div>
                 <div class="message__upper__date"></div>
                   ${message.created_at}
                </div>
                 <div class="message__lower">
                <p class="message__lower__message">
                  ${message.content}
                  </p>
                  ${image}
                </div>
                </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);  
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.message').append(html);
    
      $('.form__box__submit-btn').prop('disabled', false);
      $('.new_message')[0].reset();
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    });
  });
})
