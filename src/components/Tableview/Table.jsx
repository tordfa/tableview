import { useContext } from "react";
import { deleteTable } from "../../controllers/tableController";
import { TableContext } from "./Tableview";
function Table({table}) {

    const {
        tableList, setTableList,
        activeTable, setActiveTable,
        isEdit,
    } = useContext(TableContext)

    let x = 0;
    let y = 0;
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
        for (let i = 0; i < tableList.length; i++) {
            if (tableList[i].id === result.rows[0].id) {
                let newArray = [...tableList]
                newArray.splice(i, 1);
                setTableList([...newArray]);
            }
        }
    }

    function tableClicked(e) {
        mouseDown = true;
        x = e.currentTarget.offsetLeft - e.clientX;
        y = e.currentTarget.offsetTop - e.clientY;

        e.preventDefault();
    }

    function tableUnclicked(e) {
        if (mouseDown) {
            setActiveTable(table);
            if (isEdit) {
                mouseDown = false;
                for (let i = 0; i < tableList.length; i++) {
                    if (tableList[i].id === table.id) {
                        let tempTableList = tableList;
                        tempTableList[i].x_pos = e.currentTarget.offsetLeft;
                        tempTableList[i].y_pos = e.currentTarget.offsetTop;
                        setTableList([...tempTableList]);
                    }
                }
            }
        }

    }
    function moveTable(e) {

        if (mouseDown && isEdit) {

            // Check X+ Boundary
            if (e.currentTarget.offsetLeft + tableWidth > e.currentTarget.parentNode.clientWidth) {
                e.currentTarget.style.left = e.currentTarget.parentNode.clientWidth - tableWidth + 'px';
                tableUnclicked(e);
            }
            else if (e.currentTarget.offsetLeft < 0) {
                e.currentTarget.style.left = '0px';
                tableUnclicked(e);
            }
            // Checking Y boundaries
            else if (e.currentTarget.offsetTop + tableHeight > e.currentTarget.parentNode.clientHeight) {
                e.currentTarget.style.top = e.currentTarget.parentNode.clientHeight - tableHeight + 'px';
                tableUnclicked(e);
            }
            else if (e.currentTarget.offsetTop < 0) {
                e.currentTarget.style.top = '0px';
                tableUnclicked(e);
            }
            else {
                e.currentTarget.style.left = e.clientX + x + 'px';
                e.currentTarget.style.top = e.clientY + y + 'px';
            }

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
        <div className="table" style={tableStyle} onMouseDown={tableClicked} onMouseUp={tableUnclicked} onMouseOut={tableUnclicked} onMouseMove={moveTable}>
            {isEdit
                ? <button onClick={handleDelete}>X</button>
                : <></>
            }
            <h1>{table.table_number}</h1>
        </div>
    )
}

export default Table