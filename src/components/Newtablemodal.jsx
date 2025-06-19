import {closeTableModal, isTableOpen} from '../util/util'
import { createTable } from '../controllers/tableController'
import { useState } from 'react'

function Newtablemodal({setTableList,tableList,activeFloor}){

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

    function handleSubmit(e){
        e.preventDefault();
        if(isTableOpen()){
            let tableInfo = {
                name: tableName,
                number: tableNumber,
                seats: tableSeats,
            }
            createTable(setTableList,tableList,tableInfo,activeFloor);
            closeTableModal();
        }
        setTableName('');
        setTableNumber();
        setTableSeats();
    }
    
return(
    <>
        <dialog id="tablemodal">
            <form method="dialog" onSubmit={handleSubmit} style={modalStyle}>
                <h1>New Table</h1>
                <label>Table name:</label>
                <input 
                    type="text"
                    onChange={(e)=>{setTableName(e.target.value)}}
                />
                <label>Table number:</label>
                <input 
                    type="number"
                    onChange={(e)=>{setTableNumber(e.target.value)}}
                />
                <label>Seats:</label>
                <input 
                    type="number"
                    onChange={(e)=>{setTableSeats(e.target.value)}}
                />
                <button type='submit'>Create table</button>
                <button onClick={closeTableModal}>Cancel</button>
            </form>
        </dialog>
    </>
)
}

export default Newtablemodal;