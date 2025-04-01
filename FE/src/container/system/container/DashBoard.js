import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useGetBillMutation, useLazyGetUserDataQuery } from '../../../store/slice/API/userAPI';
import { useGetClothesDataMutation } from '../../../store/slice/API/systemAPI';
import { useSelector, useDispatch } from 'react-redux'
import './DashBoard.scss';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
function DashBoard(props) {
    const defaultFormState = {

    }

    const userData = useSelector((state) => state.user.userData);
    const [formState, setFormState] = useState(defaultFormState);
    const [getBillService, { data, isLoading }] = useGetBillMutation();
    const [getCustomerDataService, { data: data1, isLoading: isLoading1 }] = useLazyGetUserDataQuery();
    const [getClothesDataService, { data: data2, isLoading: isLoading2 }] = useGetClothesDataMutation();
    const [billData, setBillData] = useState([])
    const [customerData, setCustomerData] = useState([])
    const [clothesData, setClothesData] = useState([]);

    console.log('billDta', billData);
    console.log('customerData', customerData);
    console.log('clothesData', clothesData);

    useEffect(() => {
        handleGetBillService();
        handleGetCustomerService();
        handleGetClothesService();
    }, [])

    useEffect(() => {
        if (isLoading === false && data && data.DT) {
            setBillData(data.DT)
        }
    }, [isLoading])

    useEffect(() => {
        if (isLoading1 === false && data1 && data1.DT) {
            setCustomerData(data1.DT)
        }
    }, [isLoading1])

    useEffect(() => {
        if (isLoading2 === false && data2 && data2.DT) {
            setClothesData(data2.DT)
        }
    }, [isLoading2])

    const handleGetBillService = async () => {
        await getBillService({ type: 'ALL' });
    }

    const handleGetCustomerService = async () => {
        await getCustomerDataService({ type: 'ALL' })
    }
    const handleGetClothesService = async () => {
        await getClothesDataService({ type: 'BEST' })
    }

    const calcTotalRevenue = () => {
        let sum = 0;
        billData.map(item => {
            sum = sum + +item.amount;
        })
        return sum
    }

    const calcStockStatus = (stockArr) => {
        let inStock = true;
        let sum = 0;
        stockArr.map(item => {
            sum = sum + (+item.stock)
        })
        if (sum === 0) {
            inStock = false;
        }
        return inStock;
    }


    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2400, 1398, 7000,];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 6000,];
    const xLabels = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'NOV',
        'DEC'
    ];


    return (
        <>
            <div className='dashboard-container'>
                <div className='content-left'>

                    <div className='title-content'>
                        <h3 className='title'>Welcome back {userData.firstName} {userData.lastName}!</h3>
                        <span className='sub-title'>Here's what happening with your store today</span>
                    </div>

                    <div className='card-group'>

                        <div className='card-item'>
                            <h5 className='price'>{customerData && customerData.length}</h5>
                            <span className='detail'>Total customer</span>
                            <div className='line-group'>

                                <div className='revenue-group'>
                                    <span className='revenue'>+30%</span>
                                    <span className='detail'>this month</span>
                                </div>

                                <div className='line'>
                                    <img src='https://cdn-icons-gif.flaticon.com/7211/7211797.gif'></img>
                                </div>

                            </div>
                        </div>

                        <div className='card-item'>
                            <h5 className='price'>${calcTotalRevenue().toFixed(2)}</h5>
                            <span className='detail'>Total revenue</span>
                            <div className='line-group'>

                                <div className='revenue-group'>
                                    <span className='revenue'>+15%</span>
                                    <span className='detail'>this month</span>
                                </div>

                                <div className='line'>
                                    <img src='https://cdn-icons-gif.flaticon.com/6172/6172509.gif'></img>
                                </div>

                            </div>
                        </div>

                        <div className='card-item'>
                            <h5 className='price'>{billData && billData.length}</h5>
                            <span className='detail'>Total deals</span>
                            <div className='line-group'>

                                <div className='revenue-group'>
                                    <span className='revenue'>+23%</span>
                                    <span className='detail'>this month</span>
                                </div>

                                <div className='line'>
                                    <img src='https://cdn-icons-gif.flaticon.com/15547/15547243.gif'></img>
                                </div>

                            </div>
                        </div>


                    </div>


                    <h5 className='header-content'>Earnings</h5>


                    <div className='chart'>
                        <LineChart
                            width={1100}
                            height={300}
                            series={[
                                { data: pData },
                                { data: uData },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                        />
                    </div>

                    <h5 className='header-content'>Top selling products</h5>

                    <div className='top-selling'>
                        <div className='product'>
                            <div className='avt-content title'>S/NO 01</div>
                            <span className='name'>Product Name</span>
                            <span className='category'>Category</span>
                            <span className='stock'>Stock</span>
                            <span className='total-sale'>Total sales</span>
                        </div>
                        {clothesData && clothesData.map(item => {
                            return (
                                <div className='product'>
                                    <div className='avt-content'><img src={item.RelevantImages[0].image}></img></div>
                                    <span className='name'>{item.name}</span>
                                    <span className='category'>{item.category}</span>
                                    <span className='stock'>{calcStockStatus(item.Color_Sizes) === true ? <span style={{ color: '#28a745' }}>In Stock</span> : <span style={{ color: '#ffc107' }}>Out Of Stock</span>}</span>
                                    <span className='total-sale'>{item.total}</span>
                                </div>
                            )
                        })}



                    </div>
                </div>


            </div>

        </>
    );
}

export default DashBoard;