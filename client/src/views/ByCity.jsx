import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import humidity from '../assets/icons/icons8-humidity-64.png'
import Cloudiness from '../assets/icons/icons8-clouds-96.png'
import wind from '../assets/icons/icons8-windsock-100.png'
import sunset from '../assets/icons/icons8-sunset-64.png'
import sunrise from '../assets/icons/icons8-sunrise-64.png'
import axios from 'axios'

const ByCity = ({ extractData }) => {
	const [currentLocation, setCurrentLocation] = useState([])
	const [placeData, setPlaceData] = useState([])
	const [Loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [search, setsearch] = useState('')

	const getSerach = debounce((value) => {
		setLoading(true)
		setsearch(value)
	}, 500)

	const getSearchResults = async () => {
		if (!search) {
			setPlaceData([])
			setCurrentLocation([])
			setError('')
			setLoading('')
			return
		}
		setError('')

		try {
			const response = await axios.get('https://current-weather-app-nine.vercel.app/place-weather', {
				params: {
					search: encodeURI(search),
				},
			})

			if (response.statusText !== 'OK') {
				throw new Error('could not fetch data')
			}
			setPlaceData(response.data)

			const { lat, lon } = response.data[0]

			const responseWeather = await axios.get(
				'https://current-weather-app-nine.vercel.app/current-weather',
				{
					params: {
						lat,
						lon,
					},
				}
			)
			if (responseWeather.statusText !== 'OK') {
				throw new Error('could not fetch data')
			}
			setCurrentLocation(extractData(responseWeather.data))

			setError('')
		} catch (err) {
			if (
				err.message ===
				"Cannot destructure property 'lat' of 'response.data[0]' as it is undefined."
			) {
				err.message = 'could not find the city'
			}

			setError(err.message)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getSearchResults()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search])
	
	return (
		<main className="w-full  px-4">
			<div className="py-2 relative text-slate-700">
				<SearchInput getSerach={getSerach} />
				{error && <p className="text-center text-slate-700 my-8"> {error}</p>}
				{Loading && (
					<p className="text-center text-slate-700 my-8">Loading...</p>
				)}
				{search && error !== 'could not find the city' && (
					<div className="flex flex-col gap-1 items-center">
						<h2 className=" text-2xl ">
							{placeData[0]?.name + ' ' + placeData[0]?.country}
						</h2>
						<h1 className="text-slate-700 text-4xl ">
							{currentLocation.main?.temp} &#176;C{' '}
						</h1>

						<p>{currentLocation?.description?.main}</p>
						{currentLocation.description?.icon && (
							<img
								src={`http://openweathermap.org/img/wn/${currentLocation?.description?.icon}@2x.png`}
								alt="weather icon"
							/>
						)}

						<div className="grid grid-cols-3 grid-rows-2 place-items-center gap-2">
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={humidity}
									alt="humidity icon"
								/>{' '}
								<span className="text-lg font-bold">Humidity </span>
								<p className="text-xl font-bold">
									{currentLocation.main?.humidity}%
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={Cloudiness}
									alt="Cloudiness icon"
								/>{' '}
								<span className="text-lg font-bold">Cloudiness</span>
								<p className="text-xl font-bold">
									{currentLocation.clouds?.all}%
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								<img className="h-1/2 w-auto" src={wind} alt="wind icon" />
								<span className="text-lg font-bold whitespace-nowrap">
									Wind speed
								</span>
								<p className="text-xl font-bold whitespace-nowrap">
									{currentLocation.wind?.speed}{' '}
									<abbr className="no-underline" title="Meters per second">
										m/s
									</abbr>
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={sunrise}
									alt="sunrise icon"
								/>
								<span className="text-lg font-bold">Sunrise</span>
								<p className="whitespace-nowrap">
									{new Date(
										currentLocation?.sys?.sunrise * 1000
									).toLocaleTimeString()}
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								<img className="h-1/2 w-auto" src={sunset} alt="sunset icon" />
								<span className="text-lg font-bold">Sunset</span>
								<p className="whitespace-nowrap">
									{new Date(
										currentLocation?.sys?.sunset * 1000
									).toLocaleTimeString()}
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around  bg-slate-500/80 text-neutral-900 p-2 rounded-md">
								{' '}
								<abbr
									title="Real Feel Temperature"
									className="text-center text-lg font-bold"
								>
									RF
								</abbr>{' '}
								<p className="text-xl font-bold whitespace-nowrap">
									{currentLocation.main?.feels_like} &#176;C
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default ByCity
