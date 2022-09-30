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
				className="bg-neutral-200 text-neutral-900 rounded-md my-2 w-[85%] p-2 border-b-2 border-black focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] sm:w-[65%] lg:w-1/2 xl:w-[40%] "
			/>
		</div>
	)
}

export default SearchInput
