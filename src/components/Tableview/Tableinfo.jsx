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
        </>
        :<></>
        }

    </div>
    </>)
}

export default Tableinfo;