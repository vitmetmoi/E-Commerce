import React, { useEffect, useState } from 'react';
import './ReviewList.scss'
import Pagination from '@mui/material/Pagination';
import { useGetReviewMutation } from '../../../store/slice/API/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useSearchParams } from 'react-router';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
function ReviewList(props) {

    const defaultSizeOptions = [
        { title: 'S' },
        { title: 'M' },
        { title: 'L' },
        { title: 'XL' },
    ]

    const defaultStarOptions = [
        { title: '★★★★★ Very good', value: '5' },
        { title: '★★★★☆ I like it', value: '4' },
        {
            title: '★★★☆☆ It is normal', value: '3'
        },
        { title: '★★☆☆☆ Jut like that', value: '2' },
        { title: '★☆☆☆☆ Not good', value: '1' }
    ]

    const defaultFormState = {
        pagination: {
            page: 0,
            pageSize: 3
        },
        size: [],
        star: [],
        onFilter: false,
    }

    const [formState, setFormState] = useState(defaultFormState);
    const [reviewData, setReviewData] = useState();
    const [getReviewService, { data, isLoading }] = useGetReviewMutation();
    const [searchParams] = useSearchParams();
    console.log('reviewData', reviewData)
    console.log('formState', formState)

    useEffect(() => {
        handleGetReviewService('PAGINATION')
    }, [])

    useEffect(() => {
        if (isLoading === false && data && data.EC === 0 && data.DT) {
            setReviewData(data.DT)
        }
    }, [isLoading])

    useEffect(() => {
        handleGetReviewService('PAGINATION')
    }, [formState.pagination])

    const handleGetReviewService = async (type) => {

        let productId = searchParams.get('id')
        let sizeParams = [];
        let starParmas = [];

        if (formState.onFilter === true) {
            if (formState.size) {
                formState.size.map(item => {
                    sizeParams.push(item.title)
                })
            }

            if (formState.star) {
                formState.star.map(item => {
                    starParmas.push(item.value)
                })
            }
        }


        await getReviewService({
            type: type,
            clothesId: productId,
            page: formState.pagination.page,
            pageSize: formState.pagination.pageSize,
            userId: '',
            reviewId: '',
            size: sizeParams,
            star: starParmas
        });
    }

    const handleOnChange = (name, value) => {

        let _formState = _.cloneDeep(formState);
        if (name === 'size' || name === 'star') {
            let isValid = true;

            if (value.length >= formState[name].length) {
                formState[name].map(item => {
                    if (value[value.length - 1].title === item.title) {
                        isValid = false;
                    }
                })
            }


            if (isValid === true) {
                _formState[name] = value;
            }
        }
        else {
            _formState[name] = value;
        }
        setFormState(_formState)

    }

    const handleRenderStar = (star) => {

        return (
            <>
                {
                    [...Array(+star)].map((x, i) => {
                        return (
                            <StarIcon style={{ width: '25px', height: '25px', color: '#a18672' }}></StarIcon>
                        )
                    })
                }
                {
                    [...Array(5 - (+star))].map((x, i) => {
                        return (
                            <StarBorderIcon style={{ width: '25px', height: '25px', color: '#707070' }}></StarBorderIcon >
                        )
                    })
                }
                {star === 5 && <span style={{ fontWeight: '600' }}> Very good</span>}
                {star === 4 && <span> I like it</span>}
                {star === 3 && <span> It's normal</span>}
                {star === 2 && <span> It just like that</span>}
                {star === 1 && <span> Not good</span>}

            </>
        )

    }

    const handleReloadConditionalButton = () => {
        handleOnChange('size', [])
        handleOnChange('star', [])
    }

    return (
        <div className='list-container'>
            <div className='conditional-groups'>
                <div className='item'>
                    <Autocomplete
                        size={'small'}
                        multiple
                        limitTags={4}
                        id="fixed-tags-demo"
                        options={defaultSizeOptions}
                        value={formState.size}
                        onChange={(event, newValue) => handleOnChange('size', newValue)}
                        getOptionLabel={(option) => option.title}
                        // defaultValue={ }
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                    <Chip
                                        key={key}
                                        label={option.title}
                                        {...tagProps}
                                    />
                                );
                            })
                        }
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                border: "1px solid black",
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder='Choose sizes'
                            />
                        )}
                    />
                </div>

                <div className='item'>
                    <Autocomplete
                        size={'small'}
                        multiple
                        limitTags={1}
                        id="fixed-tags-demo"
                        options={defaultStarOptions}
                        value={formState.star}
                        onChange={(event, newValue) => handleOnChange('star', newValue)}
                        getOptionLabel={(option) => option.title}
                        // defaultValue={ }
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                    <Chip
                                        key={key}
                                        label={option.title}
                                        {...tagProps}
                                    />
                                );
                            })
                        }
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                border: "1px solid black",
                                // backgroundColor: 'white'
                            },
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size='small'
                                placeholder='Choose rating stars'
                            />
                        )}
                    />
                </div>

            </div>

            <div className='conditional-buttons'>
                <button
                    onClick={() => handleReloadConditionalButton()}
                    className='btn1'><RotateLeftIcon style={{ marginRight: '3px' }} />Reload</button>
                {
                    formState.onFilter === false ?
                        <button
                            onClick={() => handleOnChange('onFilter', true)}
                            className='btn2'><FilterAltIcon style={{ marginBottom: '3px' }} />Turn On Filter</button>
                        :
                        <button
                            onClick={() => handleOnChange('onFilter', false)}
                            className='btn3'><FilterAltOffIcon style={{ marginBottom: '3px' }} />Turn Off Filter</button>
                }

            </div>

            <div className='rating-table'>

                {reviewData && reviewData.data.map(item => {
                    return (
                        <div className='item'>
                            <div className='left'>

                                <div className='rating-star'>
                                    <div className='stars'>{handleRenderStar(+item.star)}</div>
                                    <span className='time'>{(item.createdAt).slice(0, 10)}</span>
                                </div>

                                <div className='review-text'>{item.comment}</div>
                                <div className='images'>
                                    <PhotoProvider>
                                        {item.ReviewImages && item.ReviewImages.map(item => {
                                            return (
                                                <PhotoView
                                                    src={`${item.image}`}>
                                                    <img src={item.image}></img>
                                                </PhotoView>
                                            )
                                        })}
                                    </PhotoProvider>
                                </div>

                            </div>
                            <div className='right'>

                                <div className='text-box'>

                                    <div className='text-group'>
                                        <span className='text-1'>{item.User.firstName + item.User.lastName}</span>
                                        <span className='text-2'> rated</span>
                                    </div>

                                    <div className='text-group'>
                                        <span className='text-1'>Size: </span>
                                        <span className='text-2'>{item.Bill.ShoppingCarts.map(item2 => { return (<>{item2.Color_Size.size} </>) })}</span>
                                    </div>

                                    <div className='text-group'>
                                        <span className='text-1'>Color: </span>
                                        <span className='text-2'>{item.Bill.ShoppingCarts.map(item2 => { return (<>{item2.Color_Size.color} </>) })}</span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    )
                })}

            </div>

            <div className='pagination-page'>
                {reviewData &&
                    <Pagination
                        size='large'
                        count={(reviewData.rowCount / formState.pagination.pageSize) + 1}
                        defaultPage={1}
                        page={formState.pagination.page}
                        onChange={(event) => handleOnChange('pagination', { page: +event.target.textContent - 1, pageSize: formState.pagination.pageSize })}
                        shape="rounded" />
                }
            </div>

        </div>
    );
}

export default ReviewList;