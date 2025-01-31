import React, { useEffect } from 'react';
import _ from 'lodash'
import { useNavigate, Outlet } from 'react-router';
import { useLazyAccountQuery } from '../../../store/slice/API/userAPI';
import { useSelector, useDispatch } from 'react-redux'
import { clearUserData } from '../../../store/slice/Reducer/userSlice';
function AccountLayout(props) {
    const [accountService, { data, isLoading }] = useLazyAccountQuery()
    const dispatch = useDispatch();

    useEffect(() => {
        checkAccount();
    }, [])

    const checkAccount = async () => {
        return new Promise(async (resolve, reject) => {
            let res = await accountService();
            console.log('res', res);
            if (res && res.data && res.data.EC === 0 && res.status !== 'pending') {
                console.log('check user account!')
            }
            else if (res && res.data && res.data.EC !== 0) {
                console.log('clear user data!')
                dispatch(clearUserData())
            }

        })
    }

    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default AccountLayout;