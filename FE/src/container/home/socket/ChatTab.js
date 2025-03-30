import React, { useEffect, useState } from 'react';
import './ChatTab.scss';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../../service/socketService'
function ChatTab(props) {
    const [messages, setMessages] = useState('');

    useEffect(() => {

        // socket.on('NEW_MESSAGE', (message) => {
        //     setMessages((prevState) => [...prevState, message]);
        // });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err}`);
        });
    }, [])

    const handleSendMessage = () => {
        console.log('clicked')
        socket.connect();

        // socket.emit('connection')
        // socket.emit('TEST_CONNECT', '')
    }

    return (
        <div
            className={props.isOpenChatTab === true ? 'chat-tab-container is-open' : 'chat-tab-container'}>
            <div className='content-top'>
                <h3>Support</h3>

                <IconButton>
                    <CloseFullscreenIcon></CloseFullscreenIcon>
                </IconButton>

            </div>
            <div className='content-middle'>

            </div>
            <div className='content-bottom'>


                <div className='text-input'>
                    <TextField
                        color="warning"
                        fullWidth
                        id="standard-basic"
                        label="What can we help you ?"
                        variant="standard" />
                </div>
                <IconButton
                    onClick={() => handleSendMessage()}>
                    <SendIcon></SendIcon>
                </IconButton>
            </div>
        </div>
    );
}

export default ChatTab;