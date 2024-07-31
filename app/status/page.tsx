'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

function DataCell({ name, data }) {
	const router = useRouter()
    return (
        <div className=' flex flex-row border justify-between border-white text-2xl py-5 w-72 px-5' onClick={() => { router.push(`/status/system?system=${name}`) }}>
            <div>{name}:</div>
            <div
                style={{ color: data == "Valid" ? "Green" : "Red" }}
            >{data}</div>
        </div>
    )
}

export default function Status() {

    return (
        <div className='flex flex-col p-10 space-y-5 bg-slate-800 h-screen text-white' suppressHydrationWarning>
            <DataCell name={"Gyro 1"} data={"Valid"} />
            <DataCell name={"Gyro 2"} data={"Valid"} />
            <DataCell name={"Em Log"} data={"Valid"} />
            <DataCell name={"Doppler Log"} data={"Invalid"} />
            <DataCell name={"Echo Sounder"} data={"Valid"} />
            <DataCell name={"Meteo 1"} data={"Valid"} />
            <DataCell name={"Meteo 2"} data={"Invalid"} />
            <DataCell name={"Meteo 3"} data={"Valid"} />
            <button className=' px-5 py-3 rounded bg-slate-500 w-fit' onClick={() => { window.location.href = "/"; }}>
                Main Display
            </button>
        </div>
    );
}
