import React, { useEffect } from 'react'

export const TestZoom = () => {

    useEffect(() => {
        const container = document.getElementById('zoomableDiv');
        const content = document.getElementById('content');

        let scale = 1;
        let translateX = 0;
        let translateY = 0;

        container.addEventListener('wheel', function (e) {
            e.preventDefault();

            const scaleFactor = 1.1;
            const rect = container.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const oldScale = scale;
            scale *= e.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
            scale = Math.max(0.1, Math.min(scale, 10));

            const zoomRatio = scale / oldScale;

            translateX = offsetX - (offsetX - translateX) * zoomRatio;
            translateY = offsetY - (offsetY - translateY) * zoomRatio;

            content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        });
    }, [])

    let zoomStyle = {
        width: '500px',
        height: '500px',
        backgroundColor: 'lightblue',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid black'
    }

    let contentStyle = {
        position: 'absolute',
        width: '1000px',
        height: '1000px',
        backgroundColor: 'red',
        transformOrigin: '0 0'
    }
    return (
        <div id="zoomableDiv" style={zoomStyle}>
            <div id="content" style={contentStyle}>
                content
                <p>Content2</p>
                <p>Content2</p>
                <p>Content2</p>
                <p>Content2</p>
                <p>Content2</p>
                <p>Content2</p>
                <p>Content2</p>
            </div>
        </div>
    )
}
