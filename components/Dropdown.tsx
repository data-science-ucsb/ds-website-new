"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import { DropdownProps } from '@/app/data/dropdown';

/**
 * Header menu. Opens on hover (mouse), on click/tap (touch, where hover never
 * fires), and on keyboard focus; Escape or clicking/tabbing away closes it.
 */
const Dropdown: React.FC<DropdownProps> = ({ primaryName, pages }) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const pointerType = useRef<string>("");

    useEffect(() => {
        if (!open) return;
        const onPointer = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener('pointerdown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <div
            ref={rootRef}
            className="relative hidden sm:block"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
            onBlur={(e) => {
                if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
            }}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={menuId}
                onPointerDown={(e) => (pointerType.current = e.pointerType)}
                onClick={(e) => {
                    // a mouse already opened it on hover, so a click keeps it open;
                    // touch taps and keyboard (detail 0) toggle it
                    const toggles = e.detail === 0 || pointerType.current !== 'mouse';
                    setOpen((o) => (toggles ? !o : true));
                }}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
            >
                {primaryName}
                <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-1.5 w-2.5 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}>
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
            </button>
            <div
                id={menuId}
                className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            >
                <div className="flex min-w-[12rem] flex-col rounded-xl border border-paper-line bg-paper p-1.5 shadow-[0_20px_40px_-20px_rgba(18,28,64,0.35)]">
                    {pages.map((page, index) => (
                        <a
                            key={index}
                            href={page.link}
                            onFocus={() => setOpen(true)}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink-muted transition hover:bg-white hover:text-ink"
                        >
                            {page.name}
                            <span aria-hidden="true" className="font-mono text-[10px] text-ink/30">↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
