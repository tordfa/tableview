import React, { useContext, useEffect, useRef } from 'react'
import { TableContext } from './Tableview'
import Table from './Table'



export const TableContainer = () => {
    
    const {
        tableList, activeFloor
    } = useContext(TableContext)

    let scale = useRef(1);
    useEffect(() => {
        const tableContainer = document.getElementsByClassName('tableContainer')[0];

        tableContainer.addEventListener('wheel', function (e) {
            e.preventDefault();
            // Zoom in or out
            scale.current += e.deltaY * -0.0005;
            // Clamp scale
            scale.current = Math.min(Math.max(0.2, scale.current), 3);
            // Apply transform
            tableContainer.style.transform = `scale(${scale.current})`;
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
