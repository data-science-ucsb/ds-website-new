import React from 'react';
import { useState } from 'react';
import { resourceOptions } from '@/app/data/dropdown';
import { aboutOptions } from '@/app/data/dropdown';
import headerNavLinks from "@/app/data/headerNavLinks";
import { DropdownProps } from '@/app/data/dropdown';
  
const Dropdown: React.FC<DropdownProps> = ({ primaryName, pages }) => {
    return (
        <div className="group relative cursor-pointer bg-inherit py-2">
            <div className="flex items-center justify-between space-x-5  px-4">
                <a className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4">
                {primaryName}
                </a>
            </div>
            <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                {pages.map((page, index) => (
                <a
                    key={index}
                    href={page.link}
                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                >
                    {page.name}
                </a>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;