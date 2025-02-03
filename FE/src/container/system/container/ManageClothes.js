import React, { useEffect, useState } from 'react';
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

const initialRows = [
    {
        id: 2,
        image: '',
        name: 'Bao Duy',
        price: 25,
        discount: 10,
        color: '',
        stock: '',
        relevantImage: '',
        description: ''
    },

];



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
                    color: '',
                    stock: '',
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
            width: 250,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price ($)',
            width: 100,
            editable: true,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 100,
            renderCell: (params) => <>{params.value}%</>,
            editable: true,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 100,
        },
        {
            field: 'relevantImage',
            headerName: 'Relevant Image',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
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

    return (
        <>
            <div style={{ width: '100%' }}>
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
        </>
    );
}

export default ManageClothes;