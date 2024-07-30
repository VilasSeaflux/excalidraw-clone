'use client'
import { useAppSelector } from '@/hooks/store';
import React, { useEffect, useRef, useState } from 'react';

type Props = {

}
const Board: React.FC<Props> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const shouldDraw = useRef(false);

    const {activeMenuItem} = useAppSelector(state => state.menu);
    const {color, size} = useAppSelector(state => state.toolbox[activeMenuItem]);
    
    console.log('color', color);
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
    useEffect(() => {
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
