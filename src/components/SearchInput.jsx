import { useRef } from 'react'

const SearchInput = ({ getSerach }) => {
	const search = useRef(null)

	return (
		<div className="flex items-center justify-center font-bold">
			<input
				onChange={() => {
					getSerach(search.current?.value)
				}}
				ref={search}
				type="text"
				autoFocus
				name="search"
				placeholder="Search for a city"
				className="bg-neutral-200/50 text-neutral-700 rounded-md my-2 w-[85%] p-2  focus:outline-none  sm:w-[65%] lg:w-1/2 xl:w-[40%] "
			/>
		</div>
	)
}

export default SearchInput
