import React from 'react';
import './CardTypeList.scss';
import { useNavigate } from 'react-router';
function CardTypeList(props) {

    const categoryList = {
        MEN: ['ALL', 'TOP', 'BOTTOM', 'SHOES', 'ACC'],
        WOMEN: ['ALL', 'TOP', 'BOTTOM', 'SHOES', 'ACC'],
        ALL: ['ALL', 'TOP', 'BOTTOM', 'SHOES', 'ACC'],
        BEST: [''],
        TOP: ['T-Shirt', 'Jacket', 'Hoodie', 'Sweater', 'Cardigan'],
        BOTTOM: ['Long-Pants', 'Short', 'Skirt'],
        ACC: ['Shoes', 'Hat', 'Backpack', 'Shoes'],
        SHOES: []
    }
    const navigate = useNavigate();
    console.log('cardprop', props)
    const handleOnClickCard = (type, category) => {
        navigate(`/list?type=${type}&category=${category}`)
    }

    return (
        <div className='card-type-list-container'>

            <div className='header-group'>
                <h3 className='card-header'>{props.category ? props.category : props.type}</h3>
                <div className='category-group'>
                    {
                        props.type && categoryList[props.category ? props.category : props.type]
                        && categoryList[props.category ? props.category : props.type].map(item => {
                            return (
                                <h4
                                    onClick={() => handleOnClickCard(props.type, item)}
                                    className='item'>{item}</h4>
                            )
                        })
                    }




                </div>
            </div>

            {props.category && props.category !== 'ALL' ? '' :
                <div className='card-groups'>
                    <div
                        onClick={() => handleOnClickCard(props.type, 'TOP')}
                        className='type-card'>
                        <img
                            src={props.type === 'WOMEN' ? 'https://whoau.com/web/upload/NNEditor/20250212/e0e29b6c794a159c998ae8813a790b05.jpg' : 'https://whoau.com/web/upload/NNEditor/20250212/17cffb7128da6a889e77e51f64ac702d.jpg'}
                            className='card-image'></img>
                        <span className='card-text'>TOP</span>
                    </div>

                    <div
                        onClick={() => handleOnClickCard(props.type, 'BOTTOM')}
                        className='type-card'>
                        <img
                            src={props.type === 'WOMEN' ? 'https://whoau.com/web/upload/NNEditor/20250212/8510ea61e2fd5d5d441fafc4530264d2.jpg' : '	https://whoau.com/web/upload/NNEditor/20250212/4130f6d5392f69811ebd8172370decdf.jpg'}
                            className='card-image'></img>
                        <span className='card-text'>BOTTOM</span>
                    </div>

                    <div
                        onClick={() => handleOnClickCard(props.type, 'SHOES')}
                        className='type-card'>
                        <img
                            src={props.type === 'WOMEN' ? 'https://whoau.com/web/upload/NNEditor/20250212/41df1a4a25f9aa6bf8102b5359b8dda0.jpg' : 'https://whoau.com/web/upload/NNEditor/20250212/ca6dc902ebc2a7f0fd5815ff14405da4.jpg'}
                            className='card-image'></img>
                        <span className='card-text'>SHOES</span>
                    </div>

                    <div
                        onClick={() => handleOnClickCard(props.type, 'ACC')}
                        className='type-card'>
                        <img
                            src={props.type === 'WOMEN' ? 'https://whoau.com/web/upload/NNEditor/20250212/f1a79d6b06552a3a1dd45b38ae580fbe.jpg' : 'https://whoau.com/web/upload/NNEditor/20250212/8622fa990a6c9825352dc26c42cda77f.jpg'}
                            className='card-image'></img>
                        <span className='card-text'>ACC</span>
                    </div>
                </div>
            }


        </div>
    );
}

export default CardTypeList;