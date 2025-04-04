import React, { useEffect, useState, useRef } from 'react';
import './MyOrders.scss'
import { useGetBillMutation, useGetReviewMutation, useUpdateBillMutation } from '../../../../store/slice/API/userAPI';
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
import LinearProgress from '@mui/material/LinearProgress';

function MyOrders(props) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);
    const [getBillService, { isLoading: getBillIsLoading, data: billData }] = useGetBillMutation();
    const [updateBillService, { isLoading: updateBillIsLoading }] = useUpdateBillMutation();
    const [getReviewService, { data: reviewData, isLoading: getReviewIsLoading }] = useGetReviewMutation();
    const defaultFormState = {
        billDataArr: [],
        pagination: {
            page: 0,
            pageSize: 3,
        },
        isOpenRatingModal: false,
        dataRatingModal: '',

    }
    const [formState, setFormState] = useState(defaultFormState)
    const listInnerRef = useRef();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        handleGetBill(formState.pagination.page, formState.pagination.pageSize);

        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);

    }, [])

    useEffect(() => {

        if (offset + 800 >= listInnerRef.current.clientHeight) {
            console.log('reached', getBillIsLoading)
            if (getBillIsLoading !== true && billData && billData.DT && !_.isEmpty(billData.DT)) {

                handleOnChange(
                    'pagination',
                    { page: +(formState.pagination.page) + 1, pageSize: formState.pagination.pageSize }
                )
                handleGetBill(+(formState.pagination.page) + 1, formState.pagination.pageSize);


            }
        }
    }, [offset])

    useEffect(() => {
        console.log("billda", billData)
        if (getBillIsLoading === false && billData && billData.DT && !_.isEmpty(billData.DT)) {
            handleOnChange('billDataArr', billData.DT);
        }
    }, [getBillIsLoading])

    console.log('state', formState);
    console.log('userData', userData);

    //function

    const handleGetBill = async (page, pageSize) => {
        await getBillService({
            type: 'SCROLL',
            id: 0,
            page: page,
            pageSize: pageSize,
            userId: userData.id,
            status: ['Done', 'Pending']
        })
    }

    const handleGetReviewDataByClothesId = async (clothesId, userId) => {
        let res = await getReviewService({
            type: 'Other',
            reviewId: '',
            page: '',
            pageSize: '',
            clothesId: clothesId,
            userId: userId
        })
        if (res && res.data && res.data.EC === 0) {
            return res.data.DT
        }

    }

    const handleOnChange = async (name, value) => {
        let _formState = _.cloneDeep(formState);
        if (name === 'billDataArr') {
            console.log('value', value)
            value.map(async (item1) => {
                let isValid = true;
                formState.billDataArr.map(item2 => {

                    // handleGetReviewId(item2.Color_Size.Clothe.id);
                    if (item2.id === item1.id) {
                        isValid = false
                    }
                })
                if (isValid === true) {

                    let billIsValid = await asignBillHaveIsRatingValue(item1);
                    _formState.billDataArr.push(billIsValid);
                }
            })
        }
        else {
            _formState[name] = value;
        }

        setFormState(_formState);
    }

    const asignBillHaveIsRatingValue = async (isValidBill) => {
        let newBill = _.cloneDeep(isValidBill);
        if (newBill && newBill.ShoppingCarts) {
            let billArr = []
            newBill.ShoppingCarts.map(async (item) => {
                let obj = _.cloneDeep(item);
                obj.isRated = false;
                let clothesId = item.Color_Size.Clothe.id;
                let reviewData = await handleGetReviewDataByClothesId(clothesId, userData.id);
                if (reviewData && reviewData.clothesId === clothesId && reviewData.userId === userData.id) {
                    obj.isRated = true;
                }
                billArr.push(obj);
            })
            newBill.ShoppingCarts = billArr;
            return newBill
        }

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

    const handleShippingCases = (status, time, isRated) => {

        if (status === 'Done' && isRated === false) {
            return (
                <>{handleTime(7, time)}</>
            )
        }
        else if (status === 'Done' && isRated === true) {
            return (
                <>Rated!</>
            )
        }
        else if (status === 'Ordering') {
            return (
                <span>Your items are delivering...</span>
            )
        }
    }

    const handleOnClickRating = async (productData, billId) => {
        let _formState = _.cloneDeep(formState);
        if (formState.isOpenRatingModal === false) {
            _formState.dataRatingModal = { ...productData, billId: billId };
        }
        _formState.isOpenRatingModal = !formState.isOpenRatingModal;
        setFormState(_formState);
    }

    return (
        <div
            ref={listInnerRef}
            className='my-orders-container'>
            {
                formState && formState.billDataArr.map(item1 => {

                    return (
                        item1 && item1.status !== 'Pending' && item1.status !== 'EXPIRED' && item1.ShoppingCarts && item1.ShoppingCarts.map(item2 => {
                            // console.log('item2', item2)
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

                                                        <span className='inf-bottom'>{handleShippingCases(item1.status, item1.time, item2.isRated)}</span>

                                                    </div>
                                                </div>


                                                <div className='right'>
                                                    <div className='price-groups'>
                                                        <span className='dis-price'> {(+product.price).toFixed(3)} $</span>
                                                        <span className='bare-price'> {(product.price - (discount * (+product.price))).toFixed(3)} $</span>
                                                    </div>

                                                    <div className='action-group'>
                                                        {
                                                            checkIfTimeRatingIsValid(item1.time) === true && item1.status === 'Done' && item2.isRated === false ?
                                                                <button
                                                                    onClick={() => handleOnClickRating(product, item1.id)}
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


                                                        <button
                                                            onClick={() => { navigate('/') }}
                                                            className='btn1'>Ask for return</button>

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
            <div className='isLoading-container'>
                {
                    getBillIsLoading === true && <LinearProgress style={{ width: '100%' }} color="inherit" />
                }
            </div>


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
                            userId={userData.id}
                        ></RatingModal>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}

export default MyOrders;