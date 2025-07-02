import { useState } from "react";
import { createTable } from "../../controllers/tableController";
import { closeTableModal, isTableOpen } from "../../util/util";


export const CreateTableModal = ({ setTableList, tableList, activeFloor }) => {
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
            let newtable = {
                table_name: tableName,
                table_number: tableNumber,
                table_seats: tableSeats,
                floor_id: activeFloor,
                x_pos: 100,
                y_pos: 200
            }
            let { result } = await createTable(setTableList, tableList, newtable);

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
