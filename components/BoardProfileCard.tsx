"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { BoardMember } from "@/app/data/board";

export const BoardProfileCard = ({ name, role, major, imageUrl, bio }: BoardMember) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const bioId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Read ${name}'s bio`}
        className="group flex h-full w-full flex-col items-center rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm transition duration-200 hover:border-blue-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 motion-safe:hover:-translate-y-1"
      >
        <div className="relative mb-5 h-48 w-48 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-50">
          <Image src={imageUrl} alt={name} fill sizes="192px" className="object-cover object-center" />
        </div>
        <span className="text-xl font-bold text-gray-900">{name}</span>
        <span className="mt-2 font-medium text-blue-700">{role}</span>
        <span className="mb-5 mt-2 text-sm leading-relaxed text-gray-600">{major}</span>
        <span className="mt-auto text-sm font-semibold text-blue-600 group-hover:underline">Read bio <span aria-hidden="true">↗</span></span>
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={bioId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setIsOpen(false);
          }
        }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="mb-4 flex justify-end">
            <button type="button" autoFocus onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-blue-600" aria-label={`Close ${name}'s bio`}>Close <span aria-hidden="true">×</span></button>
          </div>
          <div className="relative mx-auto mb-5 h-40 w-40 overflow-hidden rounded-full ring-4 ring-blue-50">
            <Image src={imageUrl} alt={name} fill sizes="160px" className="object-cover object-center" />
          </div>
          <h2 id={titleId} className="text-center text-2xl font-bold">{name}</h2>
          <p className="mt-2 text-center font-medium text-blue-700">{role}</p>
          <p className="mt-2 text-center text-sm text-gray-600">{major}</p>
          <p id={bioId} className="mt-6 border-t border-gray-100 pt-6 leading-relaxed text-gray-700">{bio}</p>
        </div>
      </dialog>
    </>
  );
};
