import React, { useState } from 'react';
import './MyFitSize.scss';
import StraightenIcon from '@mui/icons-material/Straighten';
function MyFitSize(props) {
    const [height, setHeight] = useState();
    const [weigh, setWeigh] = useState();
    const [sizeFit, setSizeFit] = useState();

    useState(() => {
        if (weigh || height) {

        }
    }, [height, weigh])

    const compareFit = (weigh, height) => {
        let fitSize = '';
        if ((height >= 150 && height <= 160) && (weigh >= 45 && weigh <= 50)) {
            fitSize = 'S'
        }
        else if ((height >= 160 && height <= 168) && (weigh >= 50 && weigh <= 58)) {
            fitSize = 'M'
        }
        else if ((height >= 168 && height <= 175) && (weigh >= 60 && weigh <= 68)) {
            fitSize = 'L'
        }
        else if ((height >= 175 && height <= 180) && (weigh >= 68 && weigh <= 75)) {
            fitSize = 'XL'
        }
        else if ((height >= 175 && height <= 190) && (weigh >= 75 && weigh <= 80)) {
            fitSize = 'XXL'
        }
        else {
            fitSize = 'None'
        }
        return fitSize
    }

    const handleSubmit = () => {
        setSizeFit(compareFit(weigh, height));
    }

    const handleReset = () => {
        setHeight('');
        setWeigh('');
        setSizeFit('');
    }


    return (
        <div className='my-fit-size-container'>
            <div className='header'>
                <StraightenIcon
                    style={{ fontSize: "30px", opacity: '0.5' }}
                ></StraightenIcon>
                <span className='title'>MY FIT SIZE</span>
            </div>
            {!sizeFit ?
                <div className='content'>
                    <div className='title'>Find my size</div>
                    <div className='find-content'>

                        <div className='input-container'>
                            <label className='label-fit'>Height<span className='mini'> cm</span></label>
                            <input
                                placeholder='Height'
                                value={height}
                                onChange={(event) => setHeight(event.target.value)}
                                className='input-fit'></input>
                        </div>

                        <div className='input-container'>
                            <label className='label-fit'>Weight<span className='mini'> kg</span></label>
                            <input
                                placeholder='Weight'
                                value={weigh}
                                onChange={(event) => setWeigh(event.target.value)}
                                className='input-fit'></input>
                        </div>



                        <button
                            className={weigh && height ? 'btn-fit active' : 'btn-fit'}
                            disabled={weigh && height ? false : true}
                            onClick={() => handleSubmit()}
                        >
                            Find my size
                        </button>


                    </div>
                </div>
                :
                <div className='content'>
                    <div className='result-content'>
                        <span className='text-1'>My size is</span>
                        <span className='text-2'>{sizeFit}</span>
                        <span className='text-3'>
                            Please use the size recommendation results for reference only.<br></br>
                            Please comprehensively check the actual measurements and size feedback.</span>
                    </div>
                    <div className='spare-content'>
                        <div className='divider'></div>
                        <div className='spare-group'>
                            <span className='text-left'>* Height {height && height} cm / Weight {weigh && weigh} kg</span>
                            <span
                                onClick={() => handleReset()}
                                className='text-right'>Reset</span>
                        </div>
                    </div>
                </div>
            }



        </div>
    );
}

export default MyFitSize;