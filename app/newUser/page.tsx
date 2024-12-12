import { auth } from "../_firebase/firebase";

export default async function newUser() {
	const user = auth.currentUser;

	if (user) {
		
	}

	return (
		<div className="flex flex-col justify-center align-center item-center pl-32 pt-32">
			<h2 className="font-bold text-3xl ">New User Form - 2</h2>
			<form action="#" className=" item-center align-center">
				<label htmlFor="d">1</label>
				<input type="text" className="p-2 m-4 border-4 border-amber-400" />
				<br />
				<label htmlFor="d">2</label>
				<input type="text" className="p-2 m-4 border-4 border-amber-400" />
				<br />
				<label htmlFor="d">3</label>
				<input type="text" className="p-2 m-4 border-4 border-amber-400" />
				<br />
				<label htmlFor="d">4</label>
				<input type="text" className="p-2 m-4 border-4 border-amber-400" />
				<br />
				<input
					type="button"
					value="Nothing"
					className="bg-amber-300 p-2 m-2 font-bold text-black"
				/>
			</form>
		</div>
	);
}
