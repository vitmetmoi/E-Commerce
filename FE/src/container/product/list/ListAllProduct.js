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
import { useLocation } from 'react-router-dom';
function ListAllProduct(props) {
    const defalutFormState = {
        type: '',
        category: '',
        keyWord: '',
        size: [],
        color: [],
        priceRange: [0, 300],
        onFilter: 1,
    }
    const [formState, setFormState] = useState(defalutFormState);
    const [searchParams] = useSearchParams();
    const location = useLocation();
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
        let keyWord = searchParams.get('keyWord')

        if (keyWord) {
            handleOnChange('keyWord', keyWord);
        }
    }, [location])

    useEffect(() => {
        if (formState.type) {
            let category = searchParams.get('category')
            handleOnChange('category', category);
        }

    }, [formState.type])



    const handleOnChange = (name, value) => {
        let _formState = _.cloneDeep(formState);
        if (name === 'color' || name === 'size') {
            if (_formState[name].includes(value)) {
                _formState[name] = _formState[name].filter((item) => { return item !== value })
            }
            else {
                _formState[name].push(value);
            }

        }
        else if (name === 'clear') {
            _formState.color = [];
            _formState.size = [];
            _formState.priceRange = [0, 300]
        }
        else {
            _formState[name] = value;
        }
        setFormState(_formState)

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
                        keyWord={formState.keyWord}
                    />
                </div>

                <div>
                    <ConditionalTable
                        priceRange={formState.priceRange}
                        color={formState.color}
                        size={formState.size}
                        handleOnChange={handleOnChange}
                        onFilter={formState.onFilter}
                    />
                </div>

                <div>
                    <TableProduct
                        priceRange={formState.priceRange}
                        color={formState.color}
                        size={formState.size}
                        keyWord={formState.keyWord}
                        onFilter={formState.onFilter}
                    />
                </div>



            </div>

            <Footer />

        </>
    );
}

export default ListAllProduct;