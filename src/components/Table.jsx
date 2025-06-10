function Table({xPos=0,yPos=0}) {
    let x = 0;
    let y = 0; 
    let tableWidth = 100;
    let tableHeight = 100;
    let mouseDown = false;

function tableClicked(e){
    mouseDown = true;
    x = e.currentTarget.offsetLeft - e.clientX;
    y = e.currentTarget.offsetTop - e.clientY;
    e.preventDefault();
}

function tableUnclicked(){
    mouseDown = false;
}
function moveTable(e){

    if(mouseDown){
        // Check X+ Boundary
        if(e.currentTarget.offsetLeft + tableWidth > e.currentTarget.parentNode.clientWidth){
            mouseDown = false;
            e.currentTarget.style.left = e.currentTarget.parentNode.clientWidth - tableWidth + 'px';
        }
        else if(e.currentTarget.offsetLeft < 0){
            mouseDown = false;
            e.currentTarget.style.left = '0px';
        }
        // Checking Y boundaries
        else if(e.currentTarget.offsetTop + tableHeight > e.currentTarget.parentNode.clientHeight){
            mouseDown = false;
            e.currentTarget.style.top = e.currentTarget.parentNode.clientHeight - tableHeight + 'px';
        }
        else if(e.currentTarget.offsetTop < 0){
            mouseDown = false;
            e.currentTarget.style.top = '0px';
        }
        else{
            e.currentTarget.style.left = e.clientX + x + 'px';
            e.currentTarget.style.top = e.clientY + y + 'px';
        }

    }    
    
    
}

    const tableStyle = {
        position: 'absolute',
        color: 'red',
        backgroundColor: 'red',
        width: tableWidth,
        height: tableHeight,
        border: '1px solid black',
        cursor: 'pointer',
        left: xPos,
        top: yPos,
    }
return(
    <div className="table" style={tableStyle} onMouseDown={tableClicked} onMouseUp={tableUnclicked} onMouseMove={moveTable}>
    </div>
)
}

export default Table