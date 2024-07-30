'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { MENU_ITEMS } from '@/lib/constants';
import { clearActionItem } from '@/lib/slice/menuSlice';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {

}
const Board: React.FC<Props> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const shouldDraw = useRef(false);

    const actionMenuItem = useAppSelector(state => state.menu.actionMenuItem);
    const activeMenuItem = useAppSelector(state => state.menu.activeMenuItem);
    const {color, size} = useAppSelector(state => state.toolbox[activeMenuItem]);
    
    const dispatch = useAppDispatch();
    console.log('color', color);

    useEffect(() => {
        if(!canvasRef.current) return;

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if(actionMenuItem === MENU_ITEMS.DOWNLOAD){
            const URL = canvas.toDataURL();
            console.log(URL)
            const download = document.createElement('a');
            download.href = URL;
            download.download = 'sketch.jpg';
            download.click();
            dispatch(clearActionItem());
        }
    }, [actionMenuItem, activeMenuItem, dispatch])

    /** INITIALIZED */
    useEffect(() => {
        if(!canvasRef.current) return;

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

        
        const handleChangeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }
        
        handleChangeConfig();
    }, [size, color]);

    /** MOUNTED */
    useLayoutEffect(() => {
        if(!canvasRef.current) return;

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

        const handleMouseDown = (e: MouseEvent) => {
            shouldDraw.current = true;
            context?.beginPath();
            context?.moveTo(e.clientX, e.clientY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if(shouldDraw.current){
                context?.lineTo(e.clientX, e.clientY);
                context?.stroke();
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            shouldDraw.current = false;
        }   

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);


    return (<canvas ref={canvasRef} className='-0'></canvas>);
};

export default Board;
