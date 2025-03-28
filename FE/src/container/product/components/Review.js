import React, { useEffect, useState } from 'react';
import './Review.scss';
import { useGetReviewMutation } from '../../../store/slice/API/userAPI';
import _ from 'lodash';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import ReviewList from './ReviewList';
import { useSearchParams } from 'react-router';
function Review(props) {
    let defaultFormState = {
        ratingNumber: {
            '5': 0,
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0,
            'sum': 0
        }
    }
    const [formState, setFormState] = useState(defaultFormState);
    const [reviewData, setReviewData] = useState();
    const [getReviewService, { data, isLoading }] = useGetReviewMutation();
    const [searchParams] = useSearchParams();
    // console.log('review state', formState)
    // console.log('reviewData', reviewData)

    useEffect(() => {
        let productId = searchParams.get('id')
        handleGetReviewService('ALL', productId)
    }, [])

    useEffect(() => {
        if (isLoading === false && data && data.EC === 0 && data.DT) {
            setReviewData(data.DT)
            let ratingNumber = handleRatingNumber(data.DT);
            handleOnChange('ratingNumber', ratingNumber)

        }
    }, [isLoading])

    const handleGetReviewService = async (type, clothesId) => {
        await getReviewService({
            type: type,
            clothesId: clothesId,
            page: '',
            pageSize: '',
            userId: '',
            reviewId: ''
        });
    }

    const handleRatingNumber = (ratingData) => {
        let ratingNumber = defaultFormState.ratingNumber
        if (ratingData) {
            ratingData.map(item => {
                ratingNumber[item.star] = ratingNumber[item.star] + 1;
                ratingNumber['sum'] = ratingNumber['sum'] + 1
            })
        }
        return ratingNumber
    }

    const handleOnChange = (name, value) => {
        if (value) {
            let _formState = _.cloneDeep(formState);
            _formState[name] = value;
            setFormState(_formState)
        }
    }

    const calcSumStars = (type) => {
        if (type === 'STAR') {
            let avg = ((5 * formState.ratingNumber['5']) + (4 * formState.ratingNumber['4']) + (3 * formState.ratingNumber['3']) + (2 * formState.ratingNumber['2']) + (1 * formState.ratingNumber['1'])) / formState.ratingNumber['sum'];
            if (avg) {
                return avg
            }
            else {
                return 0;
            }

        }
        else if (type === 'PERCENT') {
            let percent = (formState.ratingNumber['5']) / (formState.ratingNumber['sum']) * 100
            if (percent) {
                return percent.toFixed(0)
            }
            else {
                return 0;
            }

        }

    }


    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        width: '187px',
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800],
            }),
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: 'black',
            ...theme.applyStyles('dark', {
                backgroundColor: '#308fe8',
            }),
        },
    }));

    return (
        <div className='review-content'>
            <h3 className='review-header'>Review
                <span> ({reviewData && reviewData.length})</span>
            </h3>

            <div className='review-average'>
                <div className='left'>

                    <div className='star-group'>
                        <StarIcon style={{ width: '60px', height: '60px', color: '#a18672' }}></StarIcon>
                        <span>{calcSumStars('STAR')}</span>
                    </div>

                    <div className='percent-text'>
                        <span className='percent'>
                            {calcSumStars('PERCENT')}%
                        </span>
                        <span> of customers love this product</span>
                    </div>

                </div>
                <div className='right'>
                    <div className='item-left'>
                        <span className='first'>Very good</span>
                        <span>I like it</span>
                        <span>It's normal</span>
                        <span>Jut like that</span>
                        <span>Not good</span>
                    </div>

                    <div className='item-right'>
                        <div className='item first'>
                            <BorderLinearProgress variant="determinate" value={(formState.ratingNumber['5'] / formState.ratingNumber['sum']) * 100} />
                            <span className='amount first'>{formState.ratingNumber['5']}</span>
                        </div>

                        <div className='item'>
                            <BorderLinearProgress variant="determinate" value={(formState.ratingNumber['4'] / formState.ratingNumber['sum']) * 100} />
                            <span className='amount'>{formState.ratingNumber['4']}</span>
                        </div>
                        <div className='item'>
                            <BorderLinearProgress variant="determinate" value={(formState.ratingNumber['3'] / formState.ratingNumber['sum']) * 100} />
                            <span className='amount'>{formState.ratingNumber['3']}</span>
                        </div>
                        <div className='item'>
                            <BorderLinearProgress variant="determinate" value={(formState.ratingNumber['2'] / formState.ratingNumber['sum']) * 100} />
                            <span className='amount'>{formState.ratingNumber['2']}</span>
                        </div>
                        <div className='item'>
                            <BorderLinearProgress variant="determinate" value={(formState.ratingNumber['1'] / formState.ratingNumber['sum']) * 100} />
                            <span className='amount'>{formState.ratingNumber['1']}</span>
                        </div>
                    </div>


                </div>
            </div>

            <div className='review-list'>
                <ReviewList>
                </ReviewList>
            </div>

        </div>
    );
}

export default Review;