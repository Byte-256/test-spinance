"use client"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


function LoginWithGoogle(router: AppRouterInstance | string[]) {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then(async (credential) => {
        if (credential.user) {
            const userRef = doc(db, "user", credential.user.uid)

            const userDoc = await getDoc(userRef)

            if (!userDoc.exists()) {
                router.push("/newUser")
            }
        }
        else {
            alert("Login canceled")
        }
    }).catch((err) => {
        console.error(err);

    })
}

function Logout() {
    alert(`Logout ${auth.currentUser?.displayName}`)
    auth.signOut()
}
export { auth, db, LoginWithGoogle, Logout }