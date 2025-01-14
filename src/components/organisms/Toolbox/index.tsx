'use client'
import React, { useState } from 'react'
import { strokeColors } from '@/utils';
import { COLORS, MENU_ITEMS } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { menuItemClick } from '@/lib/slice/menuSlice';
import { changeBrushSize, changeColor } from '@/lib/slice/toolboxSlice';
import { AnyARecord } from 'dns';
import { Slider } from '@/components/ui/slider';

type Props = {

}
export const Toolbox: React.FC<Props> = ({

}) => {
    /** STATE DATA */
    const { activeMenuItem } = useAppSelector(state => state.menu);
    const color = useAppSelector(state => state.toolbox[activeMenuItem].color);
    /** VARIABLES */
    const dispatch = useAppDispatch();
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    /** HANDLERS */
    const handleUpdateBrushSize = (num: number[]) => {
        dispatch(changeBrushSize({item: activeMenuItem, size: num[0]}))
    }
    const handleUpdateColor = (newColor: string) => {
        dispatch(changeColor({item: activeMenuItem, color: newColor}))
    }
    return (
        <section className='border border-gray-200 rounded-lg p-3 w-1/6 shadow-lg z-50 absolute top-[15vh] bg-white left-8'>
            <div className='flex flex-col items-start justify-center space-y-4'>
                {showStrokeToolOption &&
                    (
                        <div className='flex flex-col items-start justify-center w-full'>
                            <h1>Stroke</h1>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex flex-row items-center space-x-3'>
                                    {
                                        Object.values(COLORS).map((item, index) => (
                                            <div
                                                key={index}
                                                style={{ backgroundColor: item }}
                                                className={`w-6 h-6 p-1 border border-gray-200 rounded-md mt-1 hover:scale-110 transition-all duration-300 hover:border hover:border-gray-600 ${item === color ? 'border-black ' : ''}`}
                                                onClick={() => handleUpdateColor(item)}
                                            />
                                        ))
                                    }
                                </div>
                                <span className='text-sm text-gray-300'>|</span>
                                <div
                                    key={color}
                                    style={{ backgroundColor: color || 'white' }}
                                    className='w-6 h-6 p-1 border border-gray-400 rounded-md mt-1 scale-110'
                                />

                            </div>
                        </div>
                    )
                }
                {
                    showBrushToolOption &&
                    (
                        <div className='w-full'>
                            <h1>Brush Size</h1>
                            <Slider 
                                min={1} 
                                max={10} 
                                defaultValue={[3]}
                                onValueChange={handleUpdateBrushSize} 
                                className='outline-black active:outline-black w-full mt-2' />
                        </div>
                    )
                }
            </div>
        </section>
    );
}
