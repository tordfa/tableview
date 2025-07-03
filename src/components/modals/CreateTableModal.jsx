import { useContext, useState } from "react";
import { createTable } from "../../controllers/tableController";
import { closeTableModal, isTableOpen } from "../../util/util";
import { TableContext } from "../Tableview";


export const CreateTableModal = () => {
    const {
        tableList, setTableList,
        activeFloor,
    } = useContext(TableContext)

    const [tableName, setTableName] = useState('');
    const [tableNumber, setTableNumber] = useState();
    const [tableSeats, setTableSeats] = useState();

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
            let { result } = await createTable(tableName,tableNumber,tableSeats,activeFloor,100,200);
            let newArray = [...tableList, result.rows[0]]
            setTableList(newArray);
            closeTableModal();
        }
        setTableName('');
        setTableNumber();
        setTableSeats();
        e.target.reset();
    }

    return (
        <>

            <form method="dialog" onSubmit={handleSubmit} style={modalStyle}>
                <h1>New Table</h1>
                <label>Table name:</label>
                <input
                    type="text"
                    onChange={(e) => { setTableName(e.target.value) }}
                />
                <label>Table number:</label>
                <input
                    type="number"
                    onChange={(e) => { setTableNumber(e.target.value) }}
                />
                <label>Seats:</label>
                <input
                    type="number"
                    onChange={(e) => { setTableSeats(e.target.value) }}
                />
                <button type='submit'>Create table</button>
                <button onClick={closeTableModal}>Cancel</button>
            </form>
        </>
    )
}
