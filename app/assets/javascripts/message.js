
$(function(){

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message__upper" data-message_id="${message.id}">
                 <div class="message__upper__name">
                    ${message.user_name}
                 </div>
                 <div class="message__upper__date">
                   ${message.created_at}
                 </div>
               </div>
               <div class="message__lower">
                 <p class="message__lower__message">
                  ${message.content}
                 </p>
                  ${image}
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

  var reloadMessages = function() {
    if(document.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message__upper').last().data('message_id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id}
    })
  
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message); 
      $('.message').append(insertHTML);
      });
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
    })

    .fail(function() {
      alert('error');
    });
  }
  };
  setInterval(reloadMessages, 7000);
});

