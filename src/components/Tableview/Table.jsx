import { useContext } from "react";
import { deleteTable } from "../../controllers/tableController";
import { TableContext } from "./Tableview";
function Table({ table, scale }) {

    const {
        tableList, setTableList,
        activeTable, setActiveTable,
        isEdit,
    } = useContext(TableContext)

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let tableWidth = 100;
    let tableHeight = 100;
    let mouseDown = false;

    async function handleDelete() {
        let { success, result } = await deleteTable(table.id)
        if (!success) {
            console.log("No success!");
            return;
        }
        //Delete from state
        const updatedList = tableList.filter(t => t.id !== result.rows[0].id);
        setTableList(updatedList);
    }

    function tableClicked(e) {
        mouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseFloat(e.currentTarget.style.left);
        initialTop = parseFloat(e.currentTarget.style.top);
        e.preventDefault();
    }

    function tableUnclicked(e) {
        if (mouseDown) {
            setActiveTable(table)
            if (isEdit) {
                mouseDown = false;
                const updatedList = tableList.map(t => {
                    if (t.id === table.id) {
                        return {
                            ...t,
                            x_pos: e.currentTarget.offsetLeft,
                            y_pos: e.currentTarget.offsetTop,
                        };
                    }
                    return t;
                });
                setTableList(updatedList);
            }
        }
    }
    function moveTable(e) {
        if (mouseDown && isEdit) {
            const dx = (e.clientX - startX) / scale.current;
            const dy = (e.clientY - startY) / scale.current;

            e.currentTarget.style.left = `${initialLeft + dx}px`;
            e.currentTarget.style.top = `${initialTop + dy}px`;
        }
        

    }

    const tableStyle = {
        position: 'absolute',
        backgroundColor: 'red',
        width: tableWidth,
        height: tableHeight,
        border: '1px solid black',
        cursor: 'pointer',
        left: table.x_pos,
        top: table.y_pos,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    if (activeTable) {
        if (activeTable.id === table.id) {
            tableStyle.backgroundColor = 'blue';
        }
    }
    return (
        <div 
        className="table" 
        id={table.id} 
        style={tableStyle} 
        onMouseDown={(e)=>{e.stopPropagation();tableClicked(e); }} 
        onMouseUp={(e)=>{tableUnclicked(e); e.stopPropagation();}} 
        onMouseOut={(e)=>{tableUnclicked(e); e.stopPropagation();}} 
        onMouseMove={(e)=>{moveTable(e); e.stopPropagation();}}>
            {isEdit
                ? <button onClick={(e)=>{e.stopPropagation();handleDelete();}}>X</button>
                : <></>
            }
            <h1>{table.table_number}</h1>
        </div>
    )
}

export default Table