import React, { useState } from 'react';
import './ChatSupport.scss'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useNavigate } from 'react-router';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ChatTab from './ChatTab'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import OpenAITab from './OpenAITab';

function ChatSupport(props) {

    const navigate = useNavigate();
    const [isOpenChatTab, setIsOpenChatTab] = useState(false);
    const [isOpenOpenAITab, setIsOpenAITab] = useState(false);

    const actions = [
        {
            icon:
                <ContactSupportIcon
                    onClick={() => { setIsOpenChatTab(true) }}
                />
            , name: 'Contact for support'
        },
        {
            icon:
                <AutoAwesomeIcon
                    onClick={() => { setIsOpenAITab(true) }
                    }
                />
            , name: 'Open help tab from AI'
        },
        {
            icon:
                <AcUnitIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => { navigate('/system') }}
                ></AcUnitIcon>
            , name: 'System ( Admin only )'
        },
    ];



    return (
        <div className='chat-support-container'>
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>


            <ChatTab
                isOpenChatTab={isOpenChatTab}
                setIsOpenChatTab={setIsOpenChatTab}
            />

            <OpenAITab
                isOpenAITab={isOpenOpenAITab}
                setIsOpenChatTab={setIsOpenAITab}
            />




        </div>
    );
}

export default ChatSupport;