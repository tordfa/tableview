import {  useContext } from 'react'

import { TableContext } from '../Tableview/Tableview';

function MainModal() {

const {
    activeModal
} = useContext(TableContext);

    return (
        <>
            <dialog id="tablemodal">
                {activeModal}
            </dialog>

        </>
    )
}

export default MainModal;