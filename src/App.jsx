import { Routes, Route } from 'react-router-dom'
import debounce from 'lodash.debounce'
import TheNavigation from './components/TheNavigations'
import NotFound from './components/NotFound'
import Home from './views/Home'
import ByCity from './views/ByCity'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function App() {
	const [currentLocationData, setCurrentLocationData] = useState([])
	const [Loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const wrapper = useRef(null)

	let extractData = ({ main, wind, weather, sys, clouds }) => {
		const description = weather.find((item) => {
			return item
		})
		return { main, wind, description, sys, clouds }
	}
	const changeBg = (temperature) => {
		if (temperature <= 0) {
			wrapper.current.style.backgroundImage =
				'url("http://localhost:3000/Current-weather-app/static/media/aaron-burden-5AiWn2U10cw-unsplash.79c24fece7a73a0688e2.jpg")'
		} else {
			wrapper.current.style.backgroundImage =
				'url("http://localhost:3000/Current-weather-app/static/media/nic-y-c-WzazSaQF1F8-unsplash.fff4e9f42bf6f679406d.jpg")'
		}
	}

	const getSearchResults = debounce(() => {
		navigator.geolocation.getCurrentPosition(async (result) => {
			const { latitude: lat, longitude: lon } = result.coords

			setLoading(true)
			try {
				const response = await axios.get(
					'http://localhost:8000/current-weather',
					{
						params: {
							lat,
							lon,
						},
					}
				)
				if (response.statusText !== 'OK') {
					throw new Error('could not fetch data')
				}
				setCurrentLocationData(extractData(response.data))
				changeBg(currentLocationData.main?.temp)
				setError('')
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		})
	}, 500)

	useEffect(() => {
		getSearchResults()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div ref={wrapper} className="wrapper flex flex-col my-font min-h-screen ">
			<header className="bg-slate-700/50 sticky top-0 shadow-lg w-full z-50">
				<TheNavigation />
			</header>
			<main>
				<Routes>
					<Route
						path="/Current-weather-app"
						element={
							<Home
								currentLocationData={currentLocationData}
								Loading={Loading}
								Error={error}
							/>
						}
					/>
					<Route
						path="/Find-by-city"
						element={<ByCity extractData={extractData} changeBg={changeBg} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
