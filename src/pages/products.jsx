import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://api.mediehuset.net/bakeonline/products";

const productAmount = 5;

export const Products = () => {
	// Define state variables using useState hooks
	const [productList, setProductList] = useState([]);
	const [pageNumbers, setPageNumbers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// Define a function that sets the currentPage state to a new value
	const paginate = (n) => {
		setCurrentPage(n);
	};

	// Calculate the indexes of the first and last displayed product based on the currentPage state
	const indexOfLastPost = currentPage * productAmount;
	const indexOfFirstPost = indexOfLastPost - productAmount;
	// Use the slice method to return an array of products that should be displayed on the current page
	const currentPosts = productList.slice(indexOfFirstPost, indexOfLastPost);

	// Use the useEffect hook to fetch data from the API when the component is mounted
	useEffect(() => {
		axios.get(url).then((data) => {
			setProductList(data.data.items);
			const newPageNumbers = [];
			for (
				let i = 1;
				i <= Math.round(data.data.items.length / productAmount);
				i++
			) {
				newPageNumbers.push(i);
			}
			setPageNumbers(newPageNumbers);
		});
	}, []);

	// Render the currentPosts and the pagination buttons
	return (
		<div>
			{currentPosts.map((product) => {
				return <div key={product.id}>{product.title}</div>;
			})}
			{console.log(currentPosts)}
			{pageNumbers.map((number) => {
				return (
					<div onClick={() => paginate(number)} key={number}>
						{number}
					</div>
				);
			})}
		</div>
	);
};
