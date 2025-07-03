import React, { useContext, useEffect, useRef } from 'react'
import { TableContext } from './Tableview'
import Table from './Table'



export const TableContainer = () => {
    
    const {
        tableList, activeFloor
    } = useContext(TableContext)

    const initialScale = localStorage.getItem('scale') ? parseFloat(localStorage.getItem('scale')) : 1;
    let scale = useRef(initialScale);
    
    useEffect(() => {
        const tableContainer = document.getElementsByClassName('tableContainer')[0];
        tableContainer.style.transform = `scale(${scale.current})`;
        tableContainer.addEventListener('wheel', function (e) {
            e.preventDefault();
            // Zoom in or out
            scale.current += e.deltaY * -0.0005;
            console.log(scale.current);
            
            // Clamp scale
            scale.current = Math.min(Math.max(0.2, scale.current), 3);
            // Apply transform
            tableContainer.style.transform = `scale(${scale.current})`;
            localStorage.setItem('scale', scale.current)
        });
    }, [])
    return (
        <>
            <div className='tableContainer'>
                {tableList
                    ? tableList.map((table) => {
                        if (table.floor_id === activeFloor) {
                            return <Table
                                key={table.id}
                                table={table}
                                scale={scale}
                            />
                        } else { return null }

                    })
                    : <></>
                }
            </div>
        </>
    )
}
