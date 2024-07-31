'use client'
import Image from 'next/image'

import { useEffect, useState } from 'react';

function DataCell({ name, data }) {
	return (
		<div className=' flex flex-row border justify-between border-white text-2xl py-5 w-72 px-5'>
			<div>{name}:</div>
			<div>{data}</div>
		</div>
	)
}

function HeadingDisplay({ heading, size1 = 800, size2 = 550, dataTime, retry_con }) {
	let des = (heading - (Math.floor(heading))) * 360
	const [status_color, setStatusColor] = useState("Red")

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (Date.now() - dataTime < 1000) {
				setStatusColor("Green")
			} else {
				setStatusColor("Red")
				retry_con()
			}
		}, 250)
		return () => clearInterval(intervalId);
	}, [dataTime, setStatusColor])

	return (
		<div className=' inline-grid justify-items-center items-center'>
			<div className='flex flex-col h-full col-span-full row-span-full justify-items-start items-start'>
				<div className=' w-16 h-12 border-4 rounded-md border-white -mt-3' />
				<div className=' h-full flex-grow' />
			</div>
			<div className='flex flex-col h-full col-span-full row-span-full justify-items-start items-start'>
				<div className=' text-white text-7xl font-extrabold mt-56'>
					^
				</div>
				<div className=' h-full flex-grow' />
			</div>
			<Image
				src="/gyro_36.png"
				width={size1}
				height={size1}
				alt="Picture of the author"
				style={{ transform: `rotate(${(heading % 360) * -1}deg)` }}
				className=' origin-center col-span-full row-span-full'
			/>
			<Image
				src="/gyro_10.png"
				width={size2}
				height={size2}
				alt="Picture of the author"
				style={{ transform: `rotate(${des * -1}deg)` }}
				className=' origin-center col-span-full row-span-full'
			/>
			<div className='col-span-full text-white text-8xl font-extrabold row-span-full'
				style={{ color: `${status_color}` }}
			>
				{("00" + Math.floor(heading)).slice(-3) + "." + Math.floor(des / 36)}
			</div>
		</div>
	)
}

export default function Gyro() {
	const [rawData, setRawData] = useState("")
	const [dataTime, setDataTime] = useState(0)
	const [data, setData] = useState({
		heading: 0,
		lat: 0,
		lon: 0,
		alt: 0,
		roll: 0,
		pitch: 0,
		stw: 0,
		sog: 0,
		dpt: 0,
		day: 0,
		month: 0,
		year: 0,
		local_min: 0,
		local_hour: 0,
		milliseconds: 0,
		relative_wind_speed: 0,
		relative_wind_angle: 0,
	});
	let ws;

	useEffect(() => {
		retry_con()
	}, [])

	const [h, setH] = useState(0)

	useEffect(() => {
		setH(h + 0.00005)
	}, [h])


	function retry_con() {
		ws = new WebSocket('ws://localhost:9999');

		ws.onmessage = (event) => {
			const newData = JSON.parse(event.data);
			setRawData(event.data)
			setData(newData);
			setDataTime(Date.now())
		};
	}


	return (
		<div className='flex flex-col p-10 justify-between bg-slate-800 h-screen text-white' suppressHydrationWarning>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col space-y-5 pr-5 border-r border-white'>
					<div className='space-y-2 px-5 py-3'>
						<div className=' text-xl'>Time</div>
						<div className=' text-4xl'>{(new Date(Date.now())).toUTCString().slice(17, 25)}</div>
						<div className=' text-4xl'>{(new Date(Date.now())).toUTCString().slice(5, 17)}</div>
					</div>
					<div className=' h-px w-full bg-white' />
					<div className='space-y-2 px-5 py-3'>
						<div className=' text-xl'>Posision</div>
						<div className=' text-4xl'>{"36"}&deg;{"50.184'N"}</div>
						<div className=' text-4xl'>{"028"}&deg;{"23.178'E"}</div>
					</div>
				</div>
				<div className='flex flex-col flex-grow space-y-20'>
					<div className=' text-sm'>
						raw data:
						{rawData}
					</div>
					<div className='self-center justify-self-center flex-grow' onClick={() => retry_con()}>
						{/* <HeadingDisplay heading={data.heading} dataTime={dataTime} retry_con={retry_con}/> */}
						<HeadingDisplay heading={h} dataTime={dataTime} retry_con={retry_con} />
					</div>
				</div>
				<div className='flex flex-col w-72 space-y-5 pl-5 border-l border-white'>
					<div className='space-y-2 pl-5 py-3'>
						<div className=' flex justify-between flex-row'>
							<div className=' text-xl'>Pitch</div>
							<div className=' text-4xl'>{(Math.round(data.pitch * 100) / 100).toFixed(1)}&deg;</div>
						</div>
						<div className=' flex justify-between flex-row'>
							<div className=' text-xl'>Pitch Rate</div>
							<div className=' text-4xl'>{(Math.round(data.pitch * 100) / 100).toFixed(1)}&deg;</div>
							{/* <div className=' text-4xl'>{data.pitch.toFixed(1)}&deg;</div> */}
						</div>
					</div>
					<div className=' h-px w-full bg-white' />
					<div className='space-y-2 pl-5 py-3'>
						<div className=' flex justify-between flex-row'>
							<div className=' text-xl'>Roll</div>
							<div className=' text-4xl'>{(Math.round(data.roll * 100) / 100).toFixed(1)}&deg;</div>
							{/* <div className=' text-4xl'>{data.roll.toFixed(1)}&deg;</div> */}
						</div>
						<div className=' flex justify-between flex-row'>
							<div className=' text-xl'>Roll Rate</div>
							<div className=' text-4xl'>{(Math.round(data.roll * 100) / 100).toFixed(1)}&deg;</div>
							{/* <div className=' text-4xl'>{data.roll.toFixed(1)}&deg;</div> */}
						</div>
					</div>
				</div>
			</div>
			<button className=' px-5 py-3 rounded bg-slate-500 w-fit' onClick={()=>{window.location.href = "/";}}>
				Main Display
			</button>
		</div>
	);
}
