import { deleteTable } from "../controllers/tableController";
function Table({xPos=0,yPos=0,isEdit,tableList, setTableList,table,setActiveTable,activeTable}) {
    let x = 0;
    let y = 0; 
    let tableWidth = 100;
    let tableHeight = 100;
    let mouseDown = false;

function tableClicked(e){
    mouseDown = true;
    x = e.currentTarget.offsetLeft - e.clientX;
    y = e.currentTarget.offsetTop - e.clientY;
    setActiveTable();
    e.preventDefault();
}

function tableUnclicked(e){
    if(mouseDown && isEdit){
        
        mouseDown = false;
        for (let i = 0; i < tableList.length; i++) {
          if(tableList[i].id === table.Id){
            let tempTableList = tableList;
            
            tempTableList[i].x = e.currentTarget.offsetLeft;
            tempTableList[i].y = e.currentTarget.offsetTop;

            setTableList([...tempTableList]);
          }
        }
        
    }

}
function moveTable(e){

    if(mouseDown && isEdit){
        
        // Check X+ Boundary
        if(e.currentTarget.offsetLeft + tableWidth > e.currentTarget.parentNode.clientWidth){
            e.currentTarget.style.left = e.currentTarget.parentNode.clientWidth - tableWidth + 'px';
            tableUnclicked(e);
        }
        else if(e.currentTarget.offsetLeft < 0){
            e.currentTarget.style.left = '0px';
            tableUnclicked(e);
        }
        // Checking Y boundaries
        else if(e.currentTarget.offsetTop + tableHeight > e.currentTarget.parentNode.clientHeight){
            e.currentTarget.style.top = e.currentTarget.parentNode.clientHeight - tableHeight + 'px';
            tableUnclicked(e);
        }
        else if(e.currentTarget.offsetTop < 0){
            e.currentTarget.style.top = '0px';
            tableUnclicked(e);
        }
        else{
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
        left: xPos,
        top: yPos,
    }

    if(activeTable){
        if(activeTable.id === table.id){
            tableStyle.backgroundColor='blue';
        }
    }
return(
    <div className="table" style={tableStyle} onMouseDown={tableClicked} onMouseUp={tableUnclicked} onMouseOut={tableUnclicked} onMouseMove={moveTable}>
        {isEdit
        ? <button onClick={()=>{deleteTable(table.id,setTableList, tableList)}}>X</button>
        : <></>
        }
        <h1>{table.number}</h1>
        </div>
)
}

export default Table