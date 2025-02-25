import React from 'react';
import './MyAccount.scss';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
function MyAccount(props) {

    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: '35px',
            height: '35px',
            borderRadius: '100px',
            left: '50%',
            bottom: '10px',
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <>
            <div className='my-account-container'>


                <div className='title-content'>
                    <h5 className='title'>Personal Information</h5>
                </div>

                <div className='profile-content'>

                    <div className='content-left'>

                        <div className='change-avt'>
                            <IconButton aria-label="cart">
                                <StyledBadge
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={<ChangeCircleIcon />} color="primary">
                                    <img className='avt' src={userData.avatar}></img>
                                </StyledBadge>
                            </IconButton>
                        </div>

                    </div>

                    <div className='content-right'>
                        <div className='change-btn'>

                            <RateReviewIcon />
                            <span>Change Profile Information</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MyAccount;