"use client";
import { useRouter } from "next/navigation";
import { auth, db, LoginWithGoogle, Logout } from "./_firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();
	console.log(error);
	
	
	function HandleLogin(method: string) {
		if (method == "G") {
			LoginWithGoogle(router);
		}
	}
	
	async function add(): Promise<void> {
		if (user){
			const userRef = doc(db, "user", user.uid);
			await setDoc(userRef, {
				uid: user.uid,
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
			}).then(()=>{
				console.log("result");
			}).catch((e)=>{
				console.error(e);
				
			})
		}
	}

	return (
		<>
			<button
				className="p-2 border-2 border-grey-200 m-2 rounded-lg"
				onClick={() => add()}
			>
				Add me
			</button>
			<button
				className="p-2 border-2 border-grey-200 m-2 rounded-lg"
				onClick={() => HandleLogin("G")}
			>
				Login
			</button>
			<button
				className="p-2 border-2 border-grey-200 m-2 rounded-lg"
				onClick={() => Logout()}
			>
				Logout
			</button>
			<div className="flex justify-center p-2 m-4">
				{!loading ? (
					<div className="grid">
						<label htmlFor="Name">Name:</label>
						<span>{user?.displayName}</span>
						<label htmlFor="Email">Email:</label>
						<span>{user?.email}</span>
					</div>
				) : (
					<span className="border-t-4 border-t-red-400 animate-spin duration-100 p-6 rounded-full"></span>
				)}
			</div>
		</>
	);
}
