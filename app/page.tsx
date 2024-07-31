'use client'
import Image from 'next/image'
import { useRouter } from "next/navigation";

import { useEffect, useState } from 'react';

function DataCell({ name, data }) {
	return (
		<div className=' flex flex-row border justify-between border-white text-2xl py-10 w-72 px-5'>
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
				style={{ transform: `rotate(${heading * -1}deg)` }}
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

export default function Home() {
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

	const router = useRouter()

	useEffect(() => {
		retry_con()
	}, [])


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
		<div className='flex flex-col p-10 justify-between bg-slate-800 h-screen text-white'>
			<div className='flex flex-row justify-between'>

				<div className='flex flex-col flex-grow space-y-20'>
					<div className=' text-sm'>
						raw data:
						{rawData}
					</div>
					<div className='self-center justify-self-center flex-grow' onClick={() => retry_con()}>
						<HeadingDisplay heading={data.heading} dataTime={dataTime} retry_con={retry_con} />
					</div>
				</div>
				<div className='flex flex-row space-x-5'>

					<div className='flex flex-col space-y-5'>
						<DataCell name="Heading" data={data.heading} />
						<DataCell name="Pitch" data={data.pitch} />
						<DataCell name="Roll" data={data.roll} />
						<DataCell name="Latitude" data={data.lat} />
						<DataCell name="Longtitude" data={data.lon} />
						<DataCell name="Altitude" data={data.alt} />
					</div>
					<div className='flex flex-col space-y-5'>
						<DataCell name="Water Speed" data={data.stw} />
						<DataCell name="Ground Speed" data={data.sog} />
						<DataCell name="Depth" data={data.dpt} />
						<DataCell name="Wind Speed(R)" data={data.relative_wind_speed} />
						<DataCell name="Wind Angle(R)" data={data.relative_wind_angle} />
					</div>
				</div>
			</div>
			<button className=' px-5 py-3 rounded bg-slate-500 w-fit' onClick={()=>{router.push("/gyro")}}>
				Gyro Display
			</button>
		</div>
	);
}
