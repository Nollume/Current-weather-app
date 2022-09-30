import { Routes, Route } from 'react-router-dom'
import debounce from 'lodash.debounce'
import TheNavigation from './components/TheNavigations'
import NotFound from './components/NotFound'
import Home from './views/Home'
import ByCity from './views/ByCity'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
	const [currentLocationData, setCurrentLocationData] = useState([])
	const [Loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	let extractData = ({ main, wind, weather, sys, clouds }) => {
		const description = weather.find((item) => {
			return item
		})
		return { main, wind, description, sys, clouds }
	}

	const getSearchResults = debounce(() => {
		navigator.geolocation.getCurrentPosition(async (result) => {
			const { latitude: lat, longitude: lon } = result.coords

			setLoading(true)
			try {
				const response = await axios.get('http://localhost:8000/current-weather', {
					params: {
						lat,
						lon,
					},
				})
				if (response.statusText !== 'OK') {
					throw new Error('could not fetch data')
				}
				setCurrentLocationData(extractData(response.data))

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
		<div className="flex flex-col my-font min-h-screen ">
			<header className="bg-neutral-900 sticky top-0 shadow-lg w-full z-50">
				<TheNavigation />
			</header>
			<main>
				<Routes>
					<Route
						path="/Weather-app"
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
						element={<ByCity extractData={extractData} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
