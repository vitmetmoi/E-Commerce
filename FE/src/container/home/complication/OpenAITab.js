import React, { useState, useEffect, useRef } from 'react';
import './OpenAITab.scss';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import _ from 'lodash';
import SendIcon from '@mui/icons-material/Send';
import { useGetOpenAIMsgMutation } from '../../../store/slice/API/userAPI';

function OpenAITab(props) {


    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [getOpenAIMsgService, { data, isLoading }] = useGetOpenAIMsgMutation();
    const divRef = useRef(null);


    console.log('userData', userData)
    console.log('messages', messages)

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (isLoading === false && data && data.EC === 0) {
            console.log('data', data);

            setMessages((prevState) => [...prevState, {
                role: data.DT.role,
                content: data.DT.content,
            }]);

            divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLoading])

    const handleGetOpenAIMsg = async (msg) => {
        await getOpenAIMsgService(msg);
    }

    const handleSendMessage = () => {

        if (inputValue) {
            handleGetOpenAIMsg(inputValue)
        }

        setMessages((prevState) => [...prevState, {
            role: 'user',
            content: inputValue,
        }]);

        setInputValue('')

        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={props.isOpenAITab === true ? 'openAI-container is-open' : 'openAI-container'}>
            <div className='content-top'>
                <h3>AI help desk</h3>

                <IconButton
                    onClick={() => props.setIsOpenChatTab(false)}
                >
                    <CloseFullscreenIcon></CloseFullscreenIcon>
                </IconButton>

            </div>

            <div ref={divRef} className='content-middle'>
                <div className={'msg-container left'}>
                    <span className={'msg left'}>How can I help you, sir?</span>
                </div>

                {
                    messages && messages.length > 0 && messages.map(item => {

                        return (
                            <>
                                <div className={item.role === 'user' ? 'msg-container right' : 'msg-container left'}>
                                    <span className={item.role === 'user' ? 'msg right' : 'msg left'}>{item.content}</span>
                                </div>
                            </>
                        )
                    })
                }

                {
                    isLoading === true &&

                    <div className={'msg-container left'}>
                        <span className={'msg left'}>AI generating...</span>
                    </div>
                }

            </div>
            <div className='content-bottom'>


                <div className='text-input'>
                    <TextField
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSendMessage()
                            }
                        }}
                        autoComplete='off'
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        color="warning"
                        fullWidth
                        id="standard-basic"
                        label="..."
                        variant="standard" />
                </div>

                <IconButton
                    className='btn-content'
                    onClick={() => handleSendMessage()}>
                    <SendIcon></SendIcon>
                </IconButton>
            </div>
        </div>
    );
}

export default OpenAITab;