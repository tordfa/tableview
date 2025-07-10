import { useContext, useState } from "react";
import { closeTableModal, isTableOpen } from "../../util/util";
import { TableContext } from "../Tableview/Tableview";


export const CreateFloorModal = () => {
    const {
        createFloor,
        setActiveFloor
    } = useContext(TableContext)

    const [floorName, setFloorName] = useState('');


    let modalStyle = {
        width: 500,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(95, 94, 94)',
        border: '2px solid black',
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (isTableOpen()) {
            let floor_id = await createFloor(floorName);
            setActiveFloor(floor_id);
            closeTableModal();
        }
        setFloorName('');
        e.target.reset();
    }

    return (
        <>

            <form method="dialog" onSubmit={handleSubmit} style={modalStyle}>
                <h1>New Floor</h1>
                <label>Floor name:</label>
                <input
                    type="text"
                    onChange={(e) => { setFloorName(e.target.value) }}
                />
                <button type='submit'>Create floor</button>
                <button onClick={closeTableModal}>Cancel</button>
            </form>
        </>
    )
}
