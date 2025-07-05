import { useContext, useEffect, useRef } from 'react'
import { TableContext } from './Tableview'
import Table from './Table'



export const TableContainer = () => {

    const { tableList, activeFloor } = useContext(TableContext)

    const viewport = useRef(null)
    const tableContainer = useRef(null)
    const scale = useRef(localStorage.getItem('scale') ? parseFloat(localStorage.getItem('scale')) : 1);
    const translate = useRef({
        x: localStorage.getItem('translatex') ? parseFloat(localStorage.getItem('translatex')) : 0,
        y: localStorage.getItem('translatey') ? parseFloat(localStorage.getItem('translatey')) : 0
    });

    const start = { x: 0, y: 0 };
    const initial = { x: 0, y: 0 }
    const scaleFactor = 1.1;
    let mouseDown = false;

    const handleMouseDown = (e) => {
        e.preventDefault();
        mouseDown = true;
        start.x = e.clientX;
        start.y = e.clientY;

        initial.x = translate.current.x;
        initial.y = translate.current.y;
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        mouseDown = false;
    }
    const handleMouseMove = (e) => {
        e.preventDefault();
        if (mouseDown) {
            const dx = start.x - e.clientX;
            const dy = start.y - e.clientY;

            translate.current.x = initial.x - dx;
            translate.current.y = initial.y - dy;
            e.currentTarget.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale.current})`;
            localStorage.setItem('translatex', parseFloat(translate.current.x))
            localStorage.setItem('translatey', parseFloat(translate.current.y))
        }
    }

    const handleScroll = (e) => {
        const rect = viewport.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const oldScale = scale.current;
        //Scaling
        scale.current *= e.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
        scale.current = Math.max(0.1, Math.min(scale.current, 10));
        const zoomRatio = scale.current / oldScale;

        translate.current.x = offsetX - (offsetX - translate.current.x) * zoomRatio;
        translate.current.y = offsetY - (offsetY - translate.current.y) * zoomRatio;
        tableContainer.current.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale.current})`;

        // Saving translate and scale to localstorage
        localStorage.setItem('scale', scale.current)
        localStorage.setItem('translatex', parseFloat(translate.current.x))
        localStorage.setItem('translatey', parseFloat(translate.current.y))

    }


    useEffect(() => {
        tableContainer.current.style.transform = `translate(${translate.current.x}px, ${translate.current.y}px) scale(${scale.current})`;
    }, [])

    return (
        <>
            <div id={'table-viewport'} ref={viewport} className='w-full h-full relative overflow-hidden'>
                <div className='tableContainer' ref={tableContainer} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onWheel={handleScroll}>
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
            </div>
        </>
    )
}
