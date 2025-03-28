import React, { useEffect, useState } from 'react';
import CardTypeList from './components/CardTypeList';
import ConditionalTable from './components/ConditionalTable';
import TableProduct from './components/TableProduct';
import './ListAllProduct.scss'
import _ from 'lodash';
import { useSearchParams } from 'react-router';
import NavigationHome from '../../home/NavigationHome';
import AdsHome from '../../home/AdsHome';
import Footer from '../../home/Footer';

function ListAllProduct(props) {
    const defalutFormState = {
        type: '',
        category: '',
        size: '',
        color: '',
        priceRange: 0
    }
    const [formState, setFormState] = useState(defalutFormState);
    const [searchParams] = useSearchParams();
    console.log('formState', formState)
    useEffect(() => {

        let type = searchParams.get('type')
        handleOnChange('type', type);

    }, [])

    useEffect(() => {
        if (formState.type) {
            let category = searchParams.get('category')
            handleOnChange('category', category);
        }

    }, [formState.type])



    const handleOnChange = (name, value) => {
        if (value) {
            let _formState = _.cloneDeep(formState);
            _formState[name] = value;
            setFormState(_formState)
        }
    }

    return (

        <>
            <AdsHome></AdsHome>
            <NavigationHome></NavigationHome>
            <div className='list-all-product-container'>

                <div>
                    <CardTypeList
                        type={formState.type}
                        category={formState.category}
                    />
                </div>

                <div>
                    <ConditionalTable
                    />
                </div>
            </div>

        </>
    );
}

export default ListAllProduct;