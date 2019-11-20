
$(function(){

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}">` : "";
    var html = `<div class="message__upper data-message_id:"${message.id}">
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



  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = `<div class="message__upper data-message_id:"${message.id}" >
          <div class="message__upper__name">
            ${message.user_name}
          </div>
          <div class="message__upper__date">
            ${message.created_at }
          </div>
        </div>
        <div class="lmessage__lower">
          <p class="message__lower__message">
            ${message.content} 
          </p>
          <img src=" ${ message.image.url }" class="lower-message__image" >
        </div>
      </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message__upper data-message_id:"${message.id}" >
      <div class="message__upper__name">
        message.user_name
      </div>
      <div class="message__upper__date">
        message.created_at 
      </div>
    </div>
    <div class="lmessage__lower">
      <p class="message__lower__message">
        message.content 
      </p>
        </div>
      </div>`
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html =`<div class="message__upper data-message_id:"${message.id}" >
          <div class="message__upper__name">
            message.user_name 
          </div>
          <div class="message__upper__date">
            message.created_at
          </div>
        </div>
        <div class="message__lower">
          <img src="${ message.image.url }" class="lower-message__image" >
        </div>
      </div>`
    };
    return html;
  };


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message__upper').last().data('message_id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {last_message_id: last_message_id}
    })
  
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        console.log(message);
        insertHTMl = buildMessageHTML(message); 
      $('.message__upper').append(insertHTML);
      });
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
    })

    .fail(function() {
      console.log('error');
    });
  };
   
  setInterval(reloadMessages, 7000);
})
