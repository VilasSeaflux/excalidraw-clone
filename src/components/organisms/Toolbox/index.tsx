'use client'
import React, { useState } from 'react'
import { strokeColors } from '@/utils';
import { MENU_ITEMS } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { menuItemClick } from '@/lib/slice/menuSlice';

type Props = {

}
export const Toolbox: React.FC<Props> = ({

}) => {
    /** STATE DATA */
    const [selected, setSelected] = useState<string>('');
    const { activeMenuItem } = useAppSelector(state => state.menu);

    /** VARIABLES */
    const dispatch = useAppDispatch();
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    /** HANDLERS */
    const handleUpdateBrushSize = (e) => {
        dispatch(menuItemClick(name))
    }
    return (
        <section className='border border-gray-200 rounded-lg p-3 w-1/6 shadow-sm'>
            <div className='flex flex-col items-start justify-center space-y-4'>
                {showStrokeToolOption &&
                    (
                        <div className='flex flex-col items-start justify-center w-full'>
                            <h1>Stroke</h1>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <div className='flex flex-row items-center space-x-3'>
                                    {
                                        strokeColors.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{ backgroundColor: item }}
                                                className={`w-6 h-6 p-1 border border-gray-200 rounded-md mt-1 hover:scale-110 transition-all duration-300 hover:border hover:border-gray-600 ${item === selected ? 'border-black ' : ''}`}
                                                onClick={() => setSelected(item)}
                                            />
                                        ))
                                    }
                                </div>
                                <span className='text-sm text-gray-300'>|</span>
                                <div
                                    key={selected}
                                    style={{ backgroundColor: selected || 'white' }}
                                    className='w-6 h-6 p-1 border border-gray-400 rounded-md mt-1 scale-110'
                                    onClick={() => setSelected('')}
                                />

                            </div>
                        </div>
                    )
                }
                {
                    showBrushToolOption &&
                    (
                        <div>
                            <h1>Brush Size</h1>
                            <div>
                                <input type='range' min={1} max={10} step={1} onChange={handleUpdateBrushSize} />
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
}
