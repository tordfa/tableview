import React, { useContext, useEffect, useRef } from 'react'
import { TableContext } from './Tableview'
import Table from './Table'



export const TableContainer = () => {

    const {
        tableList, activeFloor
    } = useContext(TableContext)

    const initialScale = localStorage.getItem('scale') ? parseFloat(localStorage.getItem('scale')) : 1;
    let scale = useRef(initialScale);

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let mouseDown = false;

    const handleMouseDown = (e) => {
        e.preventDefault();
        mouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = e.currentTarget.offsetLeft;
        initialTop = e.currentTarget.offsetTop;
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        mouseDown = false;
    }
    const handleMouseMove = (e) => {
        e.preventDefault();
        if (mouseDown) {
            const dx = startX - e.clientX;
            const dy = startY - e.clientY;
            e.currentTarget.style.left = `${initialLeft - dx}px`
            e.currentTarget.style.top = `${initialTop - dy}px`
        }
    }


    useEffect(() => {
        const tableContainer = document.getElementsByClassName('tableContainer')[0];
        let translateX = 0;
        let translateY = 0;
        tableContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale.current})`;

        tableContainer.addEventListener('wheel', function (e) {
            e.preventDefault();

            // Zoom in or out
            scale.current += e.deltaY * -0.0001;
            // Clamp scale
            scale.current = Math.min(Math.max(0.1, scale.current), 10);

            // // Apply transform
            tableContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale.current})`;

            localStorage.setItem('scale', scale.current)
        });
    }, [])
    return (
        <>
            <div className='tableContainer' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
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
