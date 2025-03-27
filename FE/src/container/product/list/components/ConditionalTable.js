import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useGetClothesDataMutation } from '../../../../store/slice/API/systemAPI';
import { useSearchParams } from 'react-router';
import './ConditionalTable.scss'
function ConditionalTable(props) {

    const [getClothesDataService, { data, isLoading }] = useGetClothesDataMutation()
    const [clothesData, setClothesData] = useState([])
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let allFor = searchParams.get('allFor')
        let type = searchParams.get('type')
        handleGetClothesData('');
    }, [])

    useEffect(() => {
        if (isLoading === false && data && data.EC === 0 && data.DT) {
            setClothesData(data.DT)
        }
    }, [isLoading])

    const handleGetClothesData = async (type, page, pageSize) => {
        await getClothesDataService({
            type: type,

        });
    }
    return (
        <div className='conditional-table-container'>
            Table goes here
        </div>
    );
}

export default ConditionalTable;