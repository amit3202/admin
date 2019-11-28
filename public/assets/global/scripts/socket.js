$(function () {

    var socket = io('', {transports: ['polling', 'websocket']});
    var roomid = $('#roomid').val();
    (function() {
        var cont = $('#chats');
        var list = $('.chats', cont);
        var form = $('.chat-form', cont);
        var input = $('input', form);
        var btn = $('.btn', form);
        var chatData = null;
        var handleClick = function(e) {
            e.preventDefault();

            var text = input.val();
            if (text.length == 0) {
                return;
            }

            var time = new Date();
            var time_str = (time.getHours() + ':' + time.getMinutes());

            var tpl =  generateMessageTemplate('out',time_str,text);

            var msg = list.append(tpl);
            input.val("");

            var getLastPostPos = function() {
                var height = 0;
                cont.find("li.out, li.in").each(function() {
                    height = height + $(this).outerHeight();
                });

                return height;
            }

            cont.find('.scroller').slimScroll({
                scrollTo: getLastPostPos()
            });
            chatData = {msg : text,roomid:roomid}
            socket.emit('sendMessage', chatData);
            
        }

        $('body').on('click', '.message .name', function(e) {
            e.preventDefault(); // prevent click event

            var name = $(this).text(); // get clicked user's full name
            input.val('@' + name + ':'); // set it into the input field
            App.scrollTo(input); // scroll to input if needed
        });

        btn.click(handleClick);

        input.keypress(function(e) {
            if (e.which == 13) {
                handleClick(e);
                return false; //<---- Add this line
            }
        });
    })()


     socket.on('newMessage', function(msg){
        var cont = $('#chats');
        var list = $('.chats', cont);
        var time = new Date();
        var time_str = (time.getHours() + ':' + time.getMinutes());
        var tpl = generateMessageTemplate('in',time_str,msg.message)
        list.append(tpl)

        var getLastPostPos = function() {
            var height = 0;
            cont.find("li.out, li.in").each(function() {
                height = height + $(this).outerHeight();
            });

            return height;
        }

        cont.find('.scroller').slimScroll({
            scrollTo: getLastPostPos()
        });
        
        });

});

function generateMessageTemplate(msgType,time_str,text){

            
            var tpl = '';
            tpl += '<li class="'+msgType+'">';
            tpl += '<img class="avatar" alt="" src="https://via.placeholder.com/350x150">';
            tpl += '<div class="message">';
            tpl += '<span class="arrow"></span>';
            tpl += '<a href="#" class="name">Bob Nilson</a>&nbsp;';
            tpl += '<span class="datetime">at ' + time_str + '</span>';
            tpl += '<span class="body">';
            tpl += text;
            tpl += '</span>';
            tpl += '</div>';
            tpl += '</li>';
            return tpl;
}
