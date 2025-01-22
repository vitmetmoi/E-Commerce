import React from 'react';
import './ManageAddNewClothes.scss'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
function ManageAddNewClothes(props) {
    return (
        <>
            <div className='create-clothes-container'>
                <div className='create-clothes-content'>

                    <div className='header-content'>
                        <div className='content-left'>
                            <div className='title-box'>
                                <AutoAwesomeIcon className='icon'></AutoAwesomeIcon>
                                <span className='title'>Add new product</span>
                            </div>
                        </div>
                        <div className='content-right'>

                            <button className='button-container btn1'>
                                <DoneIcon style={{ fontSize: "130%" }}></DoneIcon>
                                <span>Save draft</span>
                            </button>

                            <button className='button-container'>
                                <DoneIcon style={{ fontSize: "130%" }}></DoneIcon>
                                <span>Add product</span>
                            </button>
                        </div>
                    </div>

                    <div className='body-content'>
                        <div className='box-left'>
                            <span className='title'>General Information</span>
                            <div className='section'>
                                <span className='section-title'>Name Product</span>
                                <TextField
                                    required
                                    id="filled-required"
                                    // label=""
                                    variant="filled"

                                />
                            </div>
                            <div className='section'>
                                <span className='section-title'>Description Product</span>
                                <TextField
                                    id="filled-multiline-static"
                                    // label=""
                                    multiline
                                    rows={4}
                                    variant="filled"
                                />
                            </div>
                        </div>
                        <div className='box-right'>box2</div>
                        <div className='box-left'>box3</div>
                        <div className='box-right'>box4</div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ManageAddNewClothes;