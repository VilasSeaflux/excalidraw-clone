'use client'
import React from 'react';
import { Pencil, RotateCcw, RotateCw, Download, Eraser } from 'lucide-react/';
import { MENU_ITEMS } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { actionItemClick, menuItemClick } from '@/lib/slice/menuSlice';

const items = [
    {
        name: MENU_ITEMS.PENCIL,
        Icon: Pencil,
    },
    {
        name: MENU_ITEMS.ERASER,
        Icon: Eraser,
    },
    {
        name: MENU_ITEMS.UNDO,
        Icon: RotateCcw,
    },
    {
        name: MENU_ITEMS.REDO,
        Icon: RotateCw,
    },
    {
        name: MENU_ITEMS.DOWNLOAD,
        Icon: Download,
    },
];
export default function Menu() {
    /** STATE DATA */
    const dispatch = useAppDispatch();
    const { activeMenuItem } = useAppSelector((state) => state.menu);


    /** HANDLERS */
    const handleMenuClick = (name: string) => {
        dispatch(menuItemClick(name));
    }
    const handleActionItemClick = (name: string) => {
        dispatch(actionItemClick(name));
    }
    return (
        <div className='m-5 absolute top-3 left-0 right-0 bg-white w-1/4 mx-auto'>
            <div className='shadow-sm flex flex-row py-[2px]  mx-auto items-center justify-evenly border border-gray-200 rounded-lg'>
                {
                    items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                (item.name === (
                                    MENU_ITEMS.PENCIL ||
                                    MENU_ITEMS.ERASER)) ?
                                    handleMenuClick(item.name) :
                                    handleActionItemClick(item.name)}
                            className={`${activeMenuItem === item.name ? 'bg-violet-300 hover:bg-violet-300/95' : ''} p-3 hover:bg-violet-100 rounded-xl transition-all duration-300 `} >
                            <item.Icon width={18} height={18} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
