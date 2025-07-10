import { useContext } from "react";
import { TableContext } from "./Tableview";
function Tableinfo(){
    const {activeTable} = useContext(TableContext);

    const sidepanelStyle = {
        color:'black',
        backgroundColor: 'aliceblue',
        border: '1px solid rgb(211, 208, 208)',
        borderLeft: '0',
        width: 250,
        height: 'calc(100% - 2px)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',


    }

    const handleSizeChange = (e) => {
        let table = document.getElementById(activeTable.id)
        console.log(e.currentTarget.value);
        
        table.style.width = `${e.currentTarget.value}px`;
        table.style.height = `${e.currentTarget.value}px`;

    }
    return(
    <>

    <div style={sidepanelStyle}>
        {activeTable
        ?
        <>
        <h1>Tableinfo:</h1>
        <p>Table Id: {activeTable.id} </p>
        <p>Tablenumber: {activeTable.table_number}</p>
        <p>Tablename: {activeTable.table_name}</p>
        <p>Table Position: X: {activeTable.x_pos}, Y: {activeTable.y_pos}</p>
        <label htmlFor="size">Size</label>
        <input name="size" type="range" min={50} max={500} onChange={handleSizeChange}></input>
        </>
        :<></>
        }

    </div>
    </>)
}

export default Tableinfo;