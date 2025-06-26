import { closeTableModal, isTableOpen } from '../../util/util'
import { createTable } from '../../controllers/tableController'
import { useState } from 'react'
import { CreateTableModal } from './CreateTableModal';

function MainModal({ setTableList, tableList, activeFloor }) {



    return (
        <>
            <dialog id="tablemodal">
                <CreateTableModal setTableList={setTableList} tableList={tableList} activeFloor={activeFloor}></CreateTableModal>
            </dialog>

        </>
    )
}

export default MainModal;