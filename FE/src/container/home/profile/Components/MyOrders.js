import React, { useEffect, useState } from 'react';
import './MyOrders.scss'
import { useGetBillMutation, useUpdateBillMutation } from '../../../../store/slice/API/userAPI';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import dayjs from 'dayjs'
import { useNavigate } from 'react-router';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Box, IconButton } from '@mui/material';
import RatingModal from './RatingModal';
function MyOrders(props) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [getBillService, { isLoading: getBillIsLoading, data: billData }] = useGetBillMutation();
    const [updateBillService, { isLoading: updateBillIsLoading }] = useUpdateBillMutation();
    const defaultFormState = {
        billDataArr: [],
        pagination: {
            page: 24,
            pageSize: 3,
        },
        isOpenRatingModal: false,
        dataRatingModal: ''

    }
    const [formState, setFormState] = useState(defaultFormState)

    const arr = [1, 2, 3, 4, 5]

    useEffect(() => {
        handleGetBill();
    }, [])

    useEffect(() => {
        if (getBillIsLoading === false && billData && billData.DT) {
            handleOnChange('billDataArr', billData.DT);
        }
    }, [getBillIsLoading])

    console.log('state', formState);
    console.log('userData', userData)

    //function

    const handleGetBill = async () => {
        await getBillService({
            type: 'SCROLL',
            id: 0,
            page: formState.pagination.page,
            pageSize: formState.pagination.pageSize,
            userId: userData.id
        })
    }

    const handleOnChange = (name, value) => {
        let _formState = _.cloneDeep(formState);
        if (name === 'billDataArr') {
            value.map(item1 => {
                let isValid = true;
                formState.billDataArr.map(item2 => {
                    if (item2.id === item1.id) {
                        isValid = false
                    }
                })
                if (isValid === true) {
                    _formState.billDataArr.push(item1);
                }
            })
        }
        else {
            _formState[name] = value;
        }

        setFormState(_formState);
    }

    const checkIfTimeRatingIsValid = (time) => {
        let now = dayjs();
        let order = time.split('/')
        let _dayjs = dayjs(order[0] + '-' + (+order[1] + 1) + '-' + order[2]).add(7, 'day');
        let resultTime = _dayjs.diff(now);
        if (resultTime > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleTime = (addDays, orderDate) => {
        let time = [];
        let order = orderDate.split('/')
        let _dayjs = dayjs(order[0] + '-' + (+order[1] + 1) + '-' + order[2]).add(addDays, 'day');
        //calc

        if (checkIfTimeRatingIsValid(orderDate) === true) {
            time.push(_dayjs.get('y'));
            time.push(_dayjs.get('M') + 1);
            time.push(_dayjs.get('D'));
            return (
                <>
                    Rating product before <span> {time[2]}</span>/<span>{time[1]}</span>/<span>{time[0]}</span>
                </>
            );
        }
        else {
            return (
                <>
                    <span>Time for rating is excessed</span>
                </>
            )
        }
    }

    const handleShippingCases = (status, time) => {
        if (status === 'Done') {
            return (
                <>{handleTime(7, time)}</>
            )
        }
        else if (status === 'Ordering') {
            return (
                <span>Your items are delivering...</span>
            )
        }
    }

    const handleOnClickRating = (productData) => {
        let _formState = _.cloneDeep(formState);
        if (formState.isOpenRatingModal === false) {
            _formState.dataRatingModal = productData;
        }
        _formState.isOpenRatingModal = !formState.isOpenRatingModal;
        setFormState(_formState);
    }

    return (
        <div className='my-orders-container'>
            {
                formState && formState.billDataArr.map(item1 => {

                    return (
                        item1 && item1.status !== 'Pending' && item1.status !== 'EXPIRED' && item1.ShoppingCarts && item1.ShoppingCarts.map(item2 => {
                            console.log('item2', item2)
                            let product = item2.Color_Size.Clothe
                            let discount = +product.Discounts[0].value / 100;
                            return (
                                <div className='bill-item' >
                                    <div className='bill-item-content'>

                                        <div className='title'>
                                            <div className='content-left'>
                                                <div className='hight-light'>
                                                    <span>Favourite+</span>
                                                </div>
                                                <span className='name'>{product.name}</span>
                                                <div className='chat-btn'>
                                                    <QuestionAnswerIcon
                                                        fontSize='13px' />
                                                    <span>Chat</span>
                                                </div>
                                            </div>
                                            <div className='content-right'>
                                                {
                                                    item1.status === 'Done' &&
                                                    <div className='delivery'>
                                                        <LocalShippingIcon
                                                            style={{ marginRight: '5px' }}
                                                        />
                                                        Delivery completed
                                                    </div>
                                                }

                                                <span>{item1.status}</span>
                                            </div>

                                        </div>

                                        <div className='item-info'>
                                            <div className='content'>


                                                <div className='left'>
                                                    <img src={product.RelevantImages[0].image} className='image'></img>
                                                    <div className='info'>
                                                        <div className='inf-top'>
                                                            <span className='name'>{product.name}</span>
                                                            <span className='des'>Category: {product.category} type: {product.type}</span>
                                                            <span className='total'>x{item2.total}</span>
                                                        </div>

                                                        <span className='inf-bottom'>{handleShippingCases(item1.status, item1.time)}</span>

                                                    </div>
                                                </div>


                                                <div className='right'>
                                                    <div className='price-groups'>
                                                        <span className='dis-price'> {(+product.price).toFixed(3)} $</span>
                                                        <span className='bare-price'> {(product.price - (discount * (+product.price))).toFixed(3)} $</span>
                                                    </div>

                                                    <div className='action-group'>
                                                        {
                                                            checkIfTimeRatingIsValid(item1.time) === true && item1.status === 'Done' ?
                                                                <button
                                                                    onClick={() => handleOnClickRating(product)}
                                                                    className='btn2'>Rating
                                                                </button>
                                                                :
                                                                <button
                                                                    onClick={() => {
                                                                        navigate(`/product?id=${product.id}`)
                                                                    }}
                                                                    className='btn2'>Buy again
                                                                </button>
                                                        }


                                                        <button className='btn1'>Ask for return</button>

                                                    </div>
                                                </div>



                                            </div>

                                        </div>


                                    </div>
                                </div>
                            )
                        })
                    )

                })

            }

            <Modal
                style={{ width: "100%" }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={formState.isOpenRatingModal}
                onClose={handleOnClickRating}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={formState.isOpenRatingModal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                    }}>
                        <RatingModal
                            handleOnClose={handleOnClickRating}
                            ratingData={formState.dataRatingModal}
                        ></RatingModal>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}

export default MyOrders;