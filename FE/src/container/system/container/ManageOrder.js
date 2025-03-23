import React, { useEffect, useState, useRef, useMemo } from 'react';
import './ManageOrder.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import {
    GridRowModes,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
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
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import UploadImg from './components/UploadImg';
import MarkdownEditor from './components/MarkdownEditor';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import DeleteConfirm from './components/DeleteConfirm';
import { downloadExcel } from "react-export-table-to-excel";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useDeleteBillMutation, useGetBillMutation, useUpdateBillMutation } from '../../../store/slice/API/userAPI';
import { setBillDataSlice } from '../../../store/slice/Reducer/systemSlice';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function ManageOrder(props) {

    //State
    const bills = useSelector((state) => state.system.billData)
    const dispatch = useDispatch()
    const [rows, setRows] = useState('');
    const [rowModesModel, setRowModesModel] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [idOfBillToChange, setIdOfBillToChange] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 25,
    });

    const [getBillService, { isLoading, data }] = useGetBillMutation();
    const [updateBillService, { }] = useUpdateBillMutation();
    const [deleteBillService, { }] = useDeleteBillMutation();
    const rowCountRef = useRef(0);
    const rowCount = useMemo(() => {
        if (isLoading === false && data && data.DT) {
            if (data.DT.rowCount !== undefined) {
                rowCountRef.current = data.DT.rowCount;
            }
            return rowCountRef.current;
        }

    }, [isLoading]);

    useEffect(() => {
        handleGetBillPagination();
    }, [])

    useEffect(() => {
        if (isLoading === false && data) {
            dispatch(setBillDataSlice(data.DT))
        }
    }, [isLoading])

    useEffect(() => {
        if (bills.data) {
            let arrRows = [];
            bills.data.map(item => {
                let obj = {
                    id: item.id,
                    customer: item.User.firstName + " " + item.User.lastName + " ( " + item.User.email + " )",
                    userId: item.userId,
                    status: item.status,
                    amount: item.amount,
                    bankName: item.bankName,
                    accountNumber: item.accountNumber,
                    time: item.time,
                }
                arrRows.push(obj)
            })
            setRows(arrRows);
        }
    }, [bills])

    console.log('paginationModel', paginationModel)
    console.log('rowCount', rowCount)
    console.log('rows', rows);
    console.log('bills', bills)

    //My functions

    const handleGetBillPagination = async () => {
        let res = await getBillService({ type: 'PAGINATION', id: 0, page: paginationModel.page, pageSize: paginationModel.pageSize });
    }

    const handleOpenDeleteModal = (id) => {

        if (isOpenDeleteModal === false) {
            setIdOfBillToChange(id);
        }
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }

    const processRowUpdate = async (newRow, type) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log('new Row', newRow)
        let rowsToMutate = rows.map((row) => {
            if (row.id === updatedRow.id) {
                if (_.isEqual(updatedRow, row) === false) {
                    let data = {
                        id: updatedRow.id,
                        userId: updatedRow.userId,
                        amount: updatedRow.amount,
                        time: updatedRow.time,
                        status: updatedRow.status,
                        accountNumber: updatedRow.accountNumber,
                        bankName: updatedRow.bankName
                    }

                    updateBillService(data);
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

    const handleChangePaginationPage = async (pageInfo) => {
        let res = await getBillService({ type: 'PAGINATION', page: pageInfo.page, pageSize: pageInfo.pageSize })

        if (res && res.data && res.data.EC === 0) {

        }
        setPaginationModel(pageInfo)
    }


    //Mui modal functions 

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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

    //

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            width: 90,
            renderCell: (params) => <>#{params.value}</>,
        },
        {
            field: 'customer',
            headerName: 'Customer',
            width: 350,
            editable: true,
            renderCell: (params) => <>{params.value}</>,
        },
        {
            field: 'amount',
            headerName: 'Price ($)',
            width: 120,
            editable: true,
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            editable: false,
            renderCell: (params) =>
                <>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{

                        }}
                        size='small'
                        value={params.value}
                        label="Age"
                        onChange={(event) => processRowUpdate({ ...params.row, status: event.target.value }, 'STATUS')}
                    >
                        <MenuItem value={'Pending'}>
                            <Chip
                                label={'Pending'}
                                style={{
                                    color: asignChipColor('Pending').color,
                                    backgroundColor: asignChipColor('Pending').backgroundColor
                                    , height: '23px', width: '100px'
                                }}
                            ></Chip></MenuItem>
                        <MenuItem value={'EXPIRED'}>
                            <Chip
                                label={'EXPIRED'}
                                style={{
                                    color: asignChipColor('EXPIRED').color,
                                    backgroundColor: asignChipColor('EXPIRED').backgroundColor
                                    , height: '23px', width: '100px'
                                }}
                            ></Chip></MenuItem>

                        <MenuItem value={'Ordering'}>
                            <Chip
                                label={'Ordering'}
                                style={{
                                    color: asignChipColor('Ordering').color,
                                    backgroundColor: asignChipColor('Ordering').backgroundColor
                                    , height: '23px', width: '100px'
                                }}
                            ></Chip></MenuItem>
                        <MenuItem value={'Done'}>
                            <Chip
                                label={'Done'}
                                style={{
                                    color: asignChipColor('Done').color,
                                    backgroundColor: asignChipColor('Done').backgroundColor
                                    , height: '23px', width: '100px'
                                }}
                            ></Chip>
                        </MenuItem>
                        <MenuItem value={'Return'}>
                            <Chip
                                label={'Return'}
                                style={{
                                    color: asignChipColor('Return').color,
                                    backgroundColor: asignChipColor('Return').backgroundColor
                                    , height: '23px', width: '100px'
                                }}
                            ></Chip>
                        </MenuItem>
                    </Select>
                </>,
            editable: false,
        },

        {
            field: 'bankName',
            headerName: 'Bank',
            width: 150,
            renderCell: (params) => <>{params.value}</>,
            editable: true,
        },
        {
            field: 'accountNumber',
            headerName: 'Account number',
            width: 150,
            renderCell: (params) => <>{params.value}</>,
            editable: true,
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 180,
            renderCell: (params) => <><span>{params.value}</span></>,
            editable: true,
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
                        onClick={() => handleOpenDeleteModal(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const asignChipColor = (label) => {
        if (label === 'Done') {
            return {
                color: 'white',
                backgroundColor: '#28a745'
            }
        }
        else if (label === 'Ordering') {
            return {
                color: 'white',
                backgroundColor: '#17a2b8'
            }

        }
        else if (label === 'Return') {
            return {
                color: 'white',
                backgroundColor: '#6c757d'
            }
        }
        else {
            return {
                color: '#343a40',
                backgroundColor: '#f8f9fa'
            }
        }
    }

    const header = ["ID", "Customer", "userId", "Status", "Price", "Bank", 'Account Number', 'Time'];

    const handleDownloadExcel = () => {

        let rowsToStoreExcel = _.cloneDeep(rows);

        rowsToStoreExcel.map(item => {
            let rowAfterDeletedImg = '';
            delete item.RelevantImages;
            rowAfterDeletedImg = item;
            return rowAfterDeletedImg;
        })



        downloadExcel({
            fileName: "All clothes data",
            sheet: "react-export-table-to-excel",
            tablePayload: {
                header, body: rowsToStoreExcel
            },
        });
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />

                <Button
                    startIcon={<FileDownloadIcon></FileDownloadIcon>}
                    variant='text'
                    onClick={() => handleDownloadExcel()}
                >Export</Button>

            </GridToolbarContainer>
        );
    }

    const handleDeleteClick = async () => {
        let res = await deleteBillService(idOfBillToChange);
        if (res && res.data && res.data.EC === 0) {
            handleOpenDeleteModal();
            setRows(rows.filter((row) => row.id !== idOfBillToChange));
        }
    };


    return (
        <div className='manage-order-container'>
            <DataGrid
                // style={{ height: 'fit-content', width: 'fit-content' }}
                rows={rows}
                columns={columns}
                slots={{
                    toolbar: CustomToolbar,
                    // noRowsOverlay: customNoRows
                }}
                loading={isLoading}
                initialState={{
                    density: 'compact',
                    pagination: {
                        paginationModel: paginationModel,
                    },
                }}
                onPaginationModelChange={handleChangePaginationPage}
                rowCount={+rowCount}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                editMode="row"
                rowModesModel={rowModesModel}
                paginationMode="server"
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },

                }}
                sx={{ marginTop: 2 }}
                rowHeight={70}

            />

            <Modal
                style={{ width: "100%" }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpenDeleteModal}
                onClose={handleOpenDeleteModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}

            >
                <Fade in={isOpenDeleteModal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,

                    }}>
                        <DeleteConfirm
                            handleDeleteClick={handleDeleteClick}
                            handleOpenDeleteModal={handleOpenDeleteModal}
                        ></DeleteConfirm>
                    </Box>
                </Fade>
            </Modal>

        </div>
    );
}

export default ManageOrder;