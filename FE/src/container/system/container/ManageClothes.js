import React, { useEffect, useState } from 'react';
import './ManageClothes.scss'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { useGetClothesDataMutation } from '../../../store/slice/API/systemAPI';
import { useSelector, useDispatch } from 'react-redux'
import { setClothesDataSlice } from '../../../store/slice/Reducer/systemSlice';
import {
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import _ from 'lodash'
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useUpdateClothesMutation, useDeleteClothesMutation } from '../../../store/slice/API/systemAPI';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import UploadImg from './components/UploadImg';
import Stock from './components/Stock';
import MarkdownEditor from './components/MarkdownEditor';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ManageClothes(props) {




    const clothes = useSelector((state) => state.system.clothesData)
    const dispatch = useDispatch()
    const [getClothesService, { data, isLoading, isSuccess }] = useGetClothesDataMutation();
    const [updateClothesService, { isLoading: updateIsLoading }] = useUpdateClothesMutation();
    const [deleteClothesService, { isLoading: deleteIsLoading }] = useDeleteClothesMutation();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    //modal
    const [isOpenImgModal, setIsOpenImgModal] = useState(false);
    const [isOpenMardownModal, setIsOpenMarkdownModal] = useState(false);
    const [imgArray, setImgArray] = useState([]);
    const [prevImg, setPrevImg] = useState(0);
    const [idOfClothesToChange, setIdOfClothesToChange] = useState(0);


    useEffect(() => {
        console.log("clothes data", clothes)
        if (_.isEmpty(clothes)) {
            getClothes();
        }
    }, [])

    const getClothes = async () => {
        await getClothesService({ type: 'ALL', id: 12 });
    }

    useEffect(() => {
        if (isLoading === false && data) {
            console.log('data', data)
            dispatch(setClothesDataSlice(data.DT));
        }
    }, [isLoading])

    useEffect(() => {
        if (clothes) {
            let arrRows = [];
            clothes.map((item) => {
                let obj = {
                    id: item.id,
                    image: item.RelevantImages[0].image,
                    name: item.name,
                    price: item.price,
                    discount: item.Discounts[0].value,
                    stock: item.Color_Sizes,
                    relevantImages: item.RelevantImages,
                    description: ''
                }
                arrRows.push(obj);
            })
            setRows(arrRows);
        }
    }, [clothes])

    //My functions

    const handleOpenImgModal = (id) => {

        let arrImgModal = [];
        if (isOpenImgModal === false) {
            rows.map((item) => {
                if (item.id === id) {
                    setIdOfClothesToChange(item.id);
                    item.relevantImages.map((item) => {
                        arrImgModal.push(item.image)
                    })
                }
            })
            if (arrImgModal) { setImgArray(arrImgModal) }
        }
        else {
            setPrevImg('');
        }
        setIsOpenImgModal(!isOpenImgModal);

    }

    const handleOpenMarkdownModal = () => {
        setIsOpenMarkdownModal(!isOpenMardownModal)
    }

    const handleSubmit = () => {

    }

    const handleDeleteImg = () => {
        if (prevImg !== 0) {
            let _imgArray = _.cloneDeep(imgArray);
            _imgArray.splice(prevImg, 1);
            setImgArray(_imgArray)

        }
    }

    const handleReplaceImg = (img) => {
        if (img) {
            let _imgArray = _.cloneDeep(imgArray);
            let reader = new FileReader();
            reader.readAsDataURL(img);
            setTimeout(() => {
                if (reader.result) {
                    _imgArray[prevImg] = reader.result;
                }
                setTimeout(() => {
                    setImgArray(_imgArray)
                }, 500);
            }, 500);

        }
    }

    const handleAddImage = (img) => {
        if (img) {
            let _imgArray = _.cloneDeep(imgArray);
            let reader = new FileReader();
            reader.readAsDataURL(img);
            setTimeout(() => {
                _imgArray.push(reader.result);
                setImgArray(_imgArray)
            }, 500);

        }

    }

    const handleSetPrevImg = (index) => {
        setPrevImg(index)
    }

    //MUI material functions

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow, type) => {
        const updatedRow = { ...newRow, isNew: false };

        if (type === 'IMG') {
            let data = {
                id: idOfClothesToChange,
                imageArr: imgArray
            }
            let payload = {
                type: 'IMG',
                data: data,
            }

            let res = await updateClothesService(payload);

            if (res && res.data && res.data.EC === 0 && updateIsLoading === false) {
                let res = await getClothesService({ type: 'ALL', id: 12 });
                if (res && res.data && res.data.EC === 0 && isLoading === false) {
                    handleOpenImgModal();
                }

            }


        }
        else {
            let rowsToMutate = rows.map((row) => {
                if (row.id === updatedRow.id) {
                    if (_.isEqual(updatedRow, row) === false) {
                        let data = {
                            id: updatedRow.id,
                            name: updatedRow.name,
                            price: updatedRow.price,
                            discount: updatedRow.discount,
                            contentMarkdown: updatedRow.description,
                            color_size: updatedRow.stock,
                        }
                        let payload = {
                            type: 'OTHER',
                            data: data,
                        }
                        updateClothesService(payload);
                        return updatedRow
                    }
                    else {
                        return row;
                    }
                }
                else {
                    return row;
                }
            })
            setRows(rowsToMutate);
            return updatedRow;
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'image',
            headerName: 'Image',
            width: 130,
            renderCell: (params) => <img width={65} src={params.value} />,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 350,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price ($)',
            width: 120,
            editable: true,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 120,
            renderCell: (params) => <>{params.value}%</>,
            editable: true,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'actions',
            width: 170,
            renderCell: (params) => {
                let arrColor = params.value;
                return (
                    <>
                        <div onClick={() => { console.log('hihi') }} className='color-group'>
                            <AvatarGroup max={4}>
                                {arrColor && arrColor.length > 0 && arrColor.map((item) => {
                                    let colorHex = asignColor(item.color);
                                    let size = item.size;
                                    return (
                                        <Avatar alt={size} style={{ backgroundColor: `${colorHex}`, width: '30px', height: '30px' }} src="/static/images/avatar/2.jpg" />
                                    )

                                })}

                            </AvatarGroup>
                        </div>
                    </>
                )
            }
        },
        {
            field: 'relevantImage',
            headerName: 'Relevant Image',
            type: 'actions',
            width: 150,
            renderCell: (dataRow) => {
                return (
                    <div style={{ width: "100%", textAlign: 'center' }}>
                        <IconButton
                            onClick={() => handleOpenImgModal(dataRow.id)}
                        >
                            <ArtTrackIcon style={{ width: "35px", height: '35px' }}></ArtTrackIcon>
                        </IconButton>

                    </div>
                )
            }
        },
        {
            field: 'description',
            type: 'actions',
            headerName: 'Description',
            width: 150,
            renderCell: () => {
                return (
                    <div style={{ width: "100%", textAlign: 'center' }}>
                        <IconButton>
                            <HistoryEduIcon style={{ width: "30px", height: '30px' }}></HistoryEduIcon>
                        </IconButton>

                    </div>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const asignColor = (color) => {
        let colorRgb = '';
        if (color === 'White') {
            colorRgb = '#f5f5f5'
        }
        else if (color === 'Black') {
            colorRgb = '#424242';
        }
        else if (color === 'Yellow') {
            colorRgb = '#fff176';
        }
        else if (color === 'Red') {
            colorRgb = '#e53935';
        }
        else if (color === 'Blue') {
            colorRgb = '#35baf6';
        }
        else if (color === 'Green') {
            colorRgb = '#4caf50';
        }
        else if (color === 'Grey') {
            colorRgb = '#9e9e9e';
        }
        else if (color === 'Pink') {
            colorRgb = '#ed4b82'
        }
        else if (color === 'Beige') {
            colorRgb = '#fff0db'
        }
        else {
            colorRgb = '#f5f5f5'
        }
        return colorRgb;
    }

    return (
        <>
            <div className='manage-clothes-container'>
                <DataGrid
                    style={{ height: 'fit-content' }}
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    sx={{ marginTop: 2 }}
                    rowHeight={100}
                />

                <Modal
                    style={{ width: "100%" }}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpenImgModal}
                    onClose={handleOpenImgModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}

                >
                    <Fade in={isOpenImgModal}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}>

                            <div className='upload-image-container'>
                                <div className='content-left'>
                                    <UploadImg
                                        prevImg={prevImg}
                                        imgArray={imgArray}
                                        handleSetPrevImg={handleSetPrevImg}
                                        handleAddImage={handleAddImage}
                                        handleDeleteImg={handleDeleteImg}
                                        handleReplaceImg={handleReplaceImg}
                                    ></UploadImg>
                                </div>
                                <div className='content-right'>
                                    <div className='text-information '>
                                        <Alert severity="info" style={{ width: "100%", height: "100%" }}>
                                            <AlertTitle>Important information</AlertTitle>
                                            <p>
                                                * Alerts give users brief and potentially time-sensitive information in an unobtrusive manner.
                                                <br></br>
                                                <br></br>
                                                * The Material UI Alert component includes several props for quickly customizing its styles to provide immediate visual cues about its contents.
                                            </p>
                                        </Alert>
                                    </div>
                                    <div className='group-button'>
                                        <Button
                                            onClick={() => handleOpenImgModal()}
                                            variant="outlined" startIcon={<DeleteIcon />}>
                                            Cancel
                                        </Button>


                                        <Button
                                            onClick={() => processRowUpdate('', 'IMG')}
                                            variant={updateIsLoading === true || isLoading === true ? "outlined" : "contained"}
                                            endIcon={<SendIcon />}
                                            loading={updateIsLoading === true || isLoading === true ? true : false}
                                            loadingPosition="end"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </Box>
                    </Fade>
                </Modal>

                <Alert style={{ justifyContent: 'center', alignItems: 'center' }} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Dcm fix Stock column after finished manage Orders function!
                </Alert>
            </div>
        </>
    );
}

export default ManageClothes;