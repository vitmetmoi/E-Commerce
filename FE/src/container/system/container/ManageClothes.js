import React, { useEffect, useState } from 'react';
import './ManageClothes.scss'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
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

function ManageClothes(props) {
    const clothes = useSelector((state) => state.system.clothesData)
    const dispatch = useDispatch()
    const [getClothesService, { data, isLoading, isSuccess }] = useGetClothesDataMutation();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(() => {
        console.log("clothes data", clothes)
        if (_.isEmpty(clothes)) {
            getClothes();
        }
    }, [])

    useEffect(() => {
        if (isLoading === false && data) {
            dispatch(setClothesDataSlice(data.DT));
        }
    }, [isLoading])

    useEffect(() => {
        if (clothes && _.isEmpty(rows)) {
            let arrRows = [];
            clothes.map((item) => {
                let obj = {
                    id: item.id,
                    image: item.RelevantImages[0].image,
                    name: item.name,
                    price: item.price,
                    discount: item.Discounts[0].value,
                    stock: item.Color_Sizes,
                    relevantImage: '',
                    description: ''
                }
                arrRows.push(obj);
            })
            setRows(arrRows);
        }
    }, [clothes])

    const getClothes = async () => {
        let res = await getClothesService({ type: 'ALL', id: 12 });
        console.log('res clothes', res)
    }

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

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
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
            renderCell: () => {
                return (
                    <div style={{ width: "100%", textAlign: 'center' }}>
                        <IconButton>
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
        // <div className='manage-clothes-container'>

        <div className='manage-clothes-container' style={{ width: '100%' }}>
            <DataGrid
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
                // checkboxSelection
                disableRowSelectionOnClick
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                // slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                sx={{ marginTop: 2 }}
                rowHeight={100}
            />
        </div>
        // </div>
    );
}

export default ManageClothes;