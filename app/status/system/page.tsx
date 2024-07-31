'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react';

function DataCell({ name, data, color = "" }) {
	return (
		<div className=' flex flex-row border justify-between border-white text-2xl py-5 w-72 px-5'>
			<div>{name}:</div>
			<div
				style={{ color: color == "" ? (data == "Valid" ? "Green" : "Red") : color }}
			>{data}</div>
		</div>
	)
}

function SystemData(){

	const searchParams = useSearchParams()

	const system = searchParams.get('system') ?? ""
	return(
			<div className=' text-4xl font-extrabold'>{system} Status</div>
	)
}

export default function SystemsStatus() {
	return (
		<div className='flex flex-col p-10 space-y-5 bg-slate-800 h-screen text-white' suppressHydrationWarning>
			<Suspense>
				<SystemData/>
			</Suspense>
			<DataCell name={"System Fault"} data={"0"} color='Green' />
			<DataCell name={"Sensor Fault"} data={"0"} color='Green' />
			<DataCell name={"Align Mode"} data={"5"} color='Green' />
			<DataCell name={"Gyro Mode"} data={"1"} color='Green' />
			<DataCell name={"Test Mode"} data={"0"} color='Green' />
			<DataCell name={"SpeedLog Fault"} data={"0"} color='Green' />
			<DataCell name={"Degraded Data"} data={"0"} color='Green' />
			<DataCell name={"Status Code"} data={"0X368"} color='Green' />
			<button className=' px-5 py-3 rounded bg-slate-500 w-fit' onClick={() => { window.location.href = "/"; }}>
				Main Display
			</button>
		</div>
	);
}
