import React, { useEffect, useState } from 'react';
import './ChatTab.scss';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../../service/socketService'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import _ from 'lodash'
function ChatTab(props) {
    const defaultMessageArr = [
        {
            senderId: 0,
            msg: 'What can we help you ?'
        },

    ]

    const [messages, setMessages] = useState(defaultMessageArr);
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    console.log('userData', userData)
    console.log('messages', messages)

    useEffect(() => {
        if (props.isOpenChatTab === true) {
            socket.connect();

            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err}`);
            });

            if (userData.id) {
                console.log('join room')
                socket.emit("JOIN_ROOM", userData.id)
            }

            socket.on("NEW_MESSAGE", (message) => {
                console.log('new message', message);
                if (message && message.type && message.type === 'msg') {
                    let _messages = _.cloneDeep(messages);
                    let obj = {}
                    obj.senderId = message.senderId;
                    obj.msg = message.msg;
                    _messages.push(obj);
                    setMessages(_messages);
                }
            });
        }
    }, [props.isOpenChatTab])

    const handleSendMessage = () => {
        console.log('clicked')
        if (messages.length === 1) {
            socket.connect();
            socket.emit('CREATE_ROOM', 0, userData.id)
            socket.emit('NEW_MESSAGE', 0, userData.id, inputValue)
        }
        else {
            socket.emit('NEW_MESSAGE', 0, userData.id, inputValue)
        }

    }

    return (
        <div
            className={props.isOpenChatTab === true ? 'chat-tab-container is-open' : 'chat-tab-container'}>



            <div className='content-top'>
                <h3>Support</h3>

                <IconButton
                    onClick={() => props.setIsOpenChatTab(false)}
                >
                    <CloseFullscreenIcon></CloseFullscreenIcon>
                </IconButton>

            </div>

            {
                userData.authenticated === false ?
                    <div className='non-login'>
                        <span className='tex'>Please login before contact us...</span>
                        <Button
                            onClick={() => { navigate('/login') }}
                            color="warning"
                            variant="outlined"
                            endIcon={<LoginIcon />} >Login</Button>
                    </div>

                    :
                    <>
                        <div className='content-middle'>
                            {
                                messages && messages.length > 0 && messages.map(item => {

                                    return (
                                        <>
                                            <div className={'msg-container'}>
                                                <span className={item.senderId === userData.id ? 'msg right' : 'msg left'}>{item.msg}</span>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className='content-bottom'>


                            <div className='text-input'>
                                <TextField
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.target.value)}
                                    color="warning"
                                    fullWidth
                                    id="standard-basic"
                                    label="..."
                                    variant="standard" />
                            </div>
                            <IconButton
                                onClick={() => handleSendMessage()}>
                                <SendIcon></SendIcon>
                            </IconButton>
                        </div>

                    </>

            }







        </div>
    );
}

export default ChatTab;