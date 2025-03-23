import React, { useEffect, useState } from 'react';
import './MyOrders.scss'
import { useGetBillMutation, useUpdateBillMutation } from '../../../../store/slice/API/userAPI';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

function MyOrders(props) {
    const userData = useSelector((state) => state.user.userData);
    const [getBillService, { isLoading: getBillIsLoading, data: billData }] = useGetBillMutation();
    const [updateBillService, { isLoading: updateBillIsLoading }] = useUpdateBillMutation();
    const defaultFormState = {
        billDataArr: [],
        pagination: {
            page: 5,
            pageSize: 3,
        }
    }
    const [formState, setFormState] = useState(defaultFormState)

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

    return (
        <div className='my-orders-container'>
            {
                formState && formState.billDataArr.map(item => {
                    return (
                        <div className='bill-item'>
                            <div className='bill-item-content'>
                                <div className='title'>
                                    <div className='content-left'>
                                        <div className='hight-light'>Favourite</div>
                                        <span>{item.name}</span>
                                    </div>
                                    <div className='content-right'></div>

                                </div>
                                {item.id}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default MyOrders;