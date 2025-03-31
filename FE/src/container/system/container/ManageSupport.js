import React, { useEffect, useState } from 'react';
import './ManageSupport.scss'
import { socket } from '../../../service/socketService';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useLazyGetUserDataQuery } from '../../../store/slice/API/userAPI';
import Badge from '@mui/material/Badge';
import { alpha, styled } from '@mui/material/styles';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import _ from 'lodash';

function ManageSupport(props) {

    const [messages, setMessages] = useState([]);
    const userData = useSelector((state) => state.user.userData);
    const [getUserDataService, { data, isLoading, currentData, isFetching }] = useLazyGetUserDataQuery()
    const [customerData, setCustomerData] = useState([]);
    const [inputValue, setInputValue] = useState('')
    console.log('customer data', customerData)

    useEffect(() => {
        socket.connect();

        socket.on("NEW_MESSAGE", (message) => {
            console.log('new message', message);

            if (message && message.type && message.type === 'room') {
                let customerIdArr = []

                message.data.map((item) => {
                    customerIdArr.push(item.customerId)
                })

                getCustomerData(customerIdArr)

            }

            if (message && message.type && message.type === 'msg') {

                if (messages.some(item => item.id === message.id) !== true) {
                    setMessages((prevState) => [...prevState, message]);
                }


            }
        });

        socket.emit('FIND_ALL_ROOM')

    }, [])

    useEffect(() => {

        if (isLoading === false && data && data.DT) {
            data.DT.map(item1 => {
                if (customerData.some(item => item.id === item1.id) !== true) {
                    let dataToStore = { ...item1, isSelected: false }
                    console.log('data to stor', dataToStore)
                    setCustomerData((prevState) => [...prevState, dataToStore])
                }
            })



        }
    }, [isFetching])


    const getCustomerData = async (customerId) => {
        await getUserDataService({ type: 'SOME', id: customerId });
    }

    const handleOnClickReload = () => {


    }

    const handleOpenChat = (customerId) => {
        setMessages([]);
        let _customerData = _.cloneDeep(customerData);

        _customerData = _customerData.map(item => {
            if (item.id === customerId) {
                item.isSelected = true;

            }
            else {
                item.isSelected = false;
            }
            return item;
        })
        setCustomerData(_customerData)

        socket.emit('JOIN_ROOM', customerId)
    }

    const handleSendMessage = () => {
        if (inputValue !== '') {
            let customerId = 0;

            customerData.map(item => {
                if (item.isSelected === true) {
                    customerId = item.id;
                }
            })

            socket.emit('NEW_MESSAGE', userData.id, customerId, inputValue)
            setInputValue('')
        }

    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: '12px',
            height: '12px',
            borderRadius: '10px',
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <div className='manage-support-container'>

            <div className='chat-room-container'>
                {/* <div className='title-group'>
                    <MessageIcon />
                    <h3 className='title'>Messages</h3>
                </div> */}
                <div className='room-content'>
                    {
                        messages && messages.length > 0 && messages.map(item => {

                            return (
                                <>
                                    <div className={item.senderId === userData.id ? 'msg-container right' : 'msg-container left'}>
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
                            color="primary"
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

            </div>




            <div className='list-user-container'>
                <div className='title-group'>
                    <h3 className='title'>List cumstomers</h3>
                    <IconButton
                        onClick={() => handleOnClickReload()}
                    >
                        <CachedIcon />
                    </IconButton>
                </div>

                <div className='list-user'>
                    {customerData && customerData.length > 0 && customerData.map(item => {
                        return (
                            <div
                                onClick={() => handleOpenChat(item.id)}
                                className={item.isSelected === false ? 'user-tag' : 'user-tag is-selected'}>

                                <div className='avatar'>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot">
                                        <img className='avt' src={item.avatar}></img>
                                    </StyledBadge>

                                </div>

                                <div className='infors'>
                                    <span className='name'>{item.firstName} {item.lastName}</span>
                                    <span className='email'>email: {item.email}</span>
                                    <span className='email'>phone: {item.phoneNumber}</span>
                                </div>

                            </div>
                        )
                    })}

                </div>


            </div>



        </div>
    );
}

export default ManageSupport;