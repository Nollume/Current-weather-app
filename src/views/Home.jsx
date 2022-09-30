import humidity from '../assets/icons/icons8-humidity-64.png'
import Cloudiness from '../assets/icons/icons8-clouds-96.png'
import wind from '../assets/icons/icons8-windsock-100.png'
import sunset from '../assets/icons/icons8-sunset-64.png'
import sunrise from '../assets/icons/icons8-sunrise-64.png'

const Home = ({ currentLocationData, Loading, Error }) => {
	return (
		<main className="w-full px-4">
			<div className="py-2 relative">
				{Error && <p className="text-center my-8"> {Error}</p>}

				{Loading ? (
					<p className="text-center my-8">Loading...</p>
				) : (
					<div className="flex flex-col gap-1 items-center">
						<h1 className="text-yellow-200 text-4xl ">
							{currentLocationData.main?.temp} &#176;C{' '}
						</h1>

						<p>{new Date().getHours() + ':' + new Date().getMinutes()}</p>
						<time dateTime={new Date().toString()}>
							{new Date().toDateString()}
						</time>
						<p>{currentLocationData?.description?.main}</p>
						{currentLocationData.description?.icon && (
							<img
								src={`http://openweathermap.org/img/wn/${currentLocationData.description?.icon}@2x.png`}
								alt="weather icon"
							/>
						)}

						<div className="grid grid-cols-3 grid-rows-2 place-items-center gap-2">
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={humidity}
									alt="humidity icon"
								/>{' '}
								<span className="text-lg font-bold">Humidity </span>
								<p className="text-xl font-bold">
									{currentLocationData.main?.humidity}%
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={Cloudiness}
									alt="Cloudiness icon"
								/>{' '}
								<span className="text-lg font-bold">Cloudiness</span>
								<p className="text-xl font-bold">
									{currentLocationData.clouds?.all}%
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								<img className="h-1/2 w-auto" src={wind} alt="wind icon" />
								<span className="text-lg font-bold whitespace-nowrap">
									Wind speed
								</span>
								<p className="text-xl font-bold whitespace-nowrap">
									{currentLocationData.wind?.speed}{' '}
									<abbr className="no-underline" title="Meters per second">
										m/s
									</abbr>
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								<img
									className="h-1/2 w-auto"
									src={sunrise}
									alt="sunrise icon"
								/>
								<span className="text-lg font-bold">Sunrise</span>
								<p className="whitespace-nowrap">
									{new Date(
										currentLocationData?.sys?.sunrise * 1000
									).toLocaleTimeString()}
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								<img className="h-1/2 w-auto" src={sunset} alt="sunset icon" />
								<span className="text-lg font-bold">Sunset</span>
								<p className="whitespace-nowrap">
									{new Date(
										currentLocationData?.sys?.sunset * 1000
									).toLocaleTimeString()}
								</p>
							</div>
							<div className="w-full h-full flex flex-col items-center justify-around bg-yellow-200 text-neutral-900 p-2 rounded-md">
								{' '}
								<abbr
									title="Real Feel Temperature"
									className="text-center text-lg font-bold"
								>
									RF
								</abbr>{' '}
								<p className="text-xl font-bold whitespace-nowrap">
									{currentLocationData.main?.feels_like} &#176;C
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default Home
