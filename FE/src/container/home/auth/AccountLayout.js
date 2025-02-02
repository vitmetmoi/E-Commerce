import React, { useEffect } from 'react';
import _ from 'lodash'
import { useNavigate, Outlet } from 'react-router';
import { useLazyCheckUserAccountQuery } from '../../../store/slice/API/userAPI';
import { useSelector, useDispatch } from 'react-redux'
import { clearUserData } from '../../../store/slice/Reducer/userSlice';
function AccountLayout(props) {
    const [checkUserAccountService, { data, isLoading, isUninitialized }] = useLazyCheckUserAccountQuery()
    const dispatch = useDispatch();

    useEffect(() => {
        getAcc();
    }, [])

    const getAcc = async () => {
        if (isUninitialized) {
            let res = await checkUserAccountService();
            console.log('res', res);
            if (res && res.data && res.data.EC === 0) {
                console.log('check user account!')
            }
            else {
                console.log('clear user data!')
                dispatch(clearUserData())
            }
        }

    }

    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default AccountLayout;