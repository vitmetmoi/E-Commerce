import React from 'react';
import './OpenAITab.scss';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';

function OpenAITab(props) {
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
        </div>
    );
}

export default OpenAITab;