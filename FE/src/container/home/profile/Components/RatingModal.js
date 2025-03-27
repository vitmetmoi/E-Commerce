import React, { useState } from 'react';
import './RatingModal.scss';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { useCreateReviewMutation, useGetReviewMutation } from '../../../../store/slice/API/userAPI';


function RatingModal(props) {
    const defaultFormState = {
        note: '',
        arrImg: []
    }
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(-1);
    const [formState, setFormState] = useState(defaultFormState);
    const [createReviewService, { data, isLoading }] = useCreateReviewMutation();
    const labels = {

        1: 'Terrible',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const handleOnChange = (name, value) => {
        let _formState = _.cloneDeep(formState);
        _formState[name] = value;
        setFormState(_formState);
    }

    const handleAddImage = (img) => {
        if (img) {
            if (formState.arrImg.length < 4) {
                let _formState = _.cloneDeep(formState);
                var reader = new FileReader();
                reader.readAsDataURL(img);
                setTimeout(() => {
                    _formState.arrImg.push(reader.result);
                    setFormState(_formState)
                }, 500);
            }
            else {
                toast('Reached maximum length!')
            }


        }

    }

    const handleCreateReview = async () => {
        let data = {
            star: value,
            imgArr: formState.arrImg,
            comment: formState.note,
            clothesId: props.ratingData.id,
            billId: props.ratingData.billId,
            userId: props.userId
        }
        console.log('da', data)
        let res = await createReviewService(data);
        if (res && res.data && res.data.EC === 0) {
            toast('Rating completed!')
            props.handleOnClose();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else {
            toast(res.data.EM ? res.data.EM : 'Error!')
        }
    }

    console.log('props', props)
    return (
        <div className='rating-modal-container'>

            <div className='rating-content'>
                <span className='header'>Rating product</span>

                <div className='left'>
                    <img src={props.ratingData.RelevantImages[0].image} className='image'></img>
                    <div className='info'>
                        <div className='inf-top'>
                            <span className='name'>{props.ratingData.name}</span>
                            <span className='des'>Category: {props.ratingData.category} type: {props.ratingData.type}</span>
                        </div>
                    </div>
                </div>

                <div className='star'>
                    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={1}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </div>


                <div className='rating-box'>

                    <div className='content'>
                        <TextField
                            fullWidth={true}
                            id="outlined-multiline-static"
                            label="Share your opinions about this product for other customers..."
                            multiline
                            rows={8}
                            defaultValue=""
                            onChange={(event) => handleOnChange('note', event.target.value)}
                        />
                    </div>
                </div>

                <div className='arrImg-container'>
                    <PhotoProvider>
                        {formState.arrImg && formState.arrImg.map(item => {
                            return (

                                <PhotoView
                                    src={`${item}`}>
                                    <img src={item} className='img-review'></img>
                                </PhotoView>

                            )
                        })}
                    </PhotoProvider>


                    <button className='btn3'>
                        <input
                            type='file'
                            className='img-input'
                            onChange={(event) => handleAddImage(event.target.files[0])}
                        >
                        </input>
                        <AddAPhotoIcon />
                        <span>{formState.arrImg.length}/4</span>
                    </button>
                </div>

                <div className='group-btn'>

                    <button
                        onClick={() => props.handleOnClose()}
                        className='btn1'>Back
                    </button>

                    <button
                        onClick={() => handleCreateReview()}
                        className='btn2'>
                        <span>Send review</span>
                        <SendIcon />
                    </button>

                </div>


            </div>
        </div>
    );
}

export default RatingModal;