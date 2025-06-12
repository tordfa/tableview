function Tableinfo({activeTable}){

    const sidepanelStyle = {
        color:'black',
        backgroundColor: 'aliceblue',
        border: '1px solid rgb(211, 208, 208)',
        borderLeft: '0',
        width: 250,
        height: 750,

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
        <p>Tablenumber: </p>
        <p>Tablename: {activeTable.name}</p>
        <p>Table Position: X: {activeTable.x}, Y: {activeTable.y}</p>
        </>
        :<></>
        }

    </div>
    </>)
}

export default Tableinfo;