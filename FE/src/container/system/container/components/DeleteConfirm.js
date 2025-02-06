import React from 'react';
import './DeleteConfirm.scss'


function DeleteConfirm(props) {
    return (
        <div className='delete-confirm-container'>

            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <div class="icon-box">
                            <i class="material-icons">&#xE5CD;</i>
                        </div>
                        <h4 class="modal-title w-100">Are you sure?</h4>
                        {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> */}
                    </div>
                    <div style={{ marginTop: '10px' }} class="modal-body">
                        <p>Do you really want to delete these records? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => props.handleOpenDeleteModal()}
                        >Cancel</button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => props.handleDeleteClick(1)}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DeleteConfirm;