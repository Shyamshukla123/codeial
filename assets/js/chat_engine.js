class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        // this.socket = io('http://localhost:5000');

        this.socket =io.connect('http://localhost:80');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        
        // emit is used to send the message to client/server
        this.socket.emit("join_room",{
            userEmail:this.userEmail,
            chatroom:"codeial"
        });

        this.socket.on('user_joined',function(data){
            console.log("a user joined", data);
        })

        // document.getElementById('send-message').addEventListener('click',function(){
        //     let msg= document.getElementById('chat-message-input');
        //     console.log("msg printed",msg);
        //     if(msg!=''){
        //         this.socket.emit('send_message',{
        //             message:msg,
        //             userEmail:this.userEmail,
        //             chatroom:'codeial'
        //         })
        //     }
        // });

        // this.socket.on('receive_message',function(data){
        //     console.log('message recieved',data.message);
        //     let newMessage = document.createElement('li');
        //     let messageType='other-message';
        //     if(data.userEmail==this.userEmail){
        //         messageType="self-message";
        //     }
        //     let span = document.createElement('span');
        //     span.innerHTML=data.message;
        //     newMessage.append(span);
        //     let sub = document.createElement('sub');
        //     sub.innerHTML=data.userEmail;
        //     newMessage.classList.add(messageType);
        //     document.getElementById('chat-messages-list').append(newMessage);
        // })



        // CHANGE :: send a message on clicking the send message button
        var self= this;
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    userEmail: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.userEmail == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
       
    }
}