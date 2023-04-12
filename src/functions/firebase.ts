import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_APIKEY,
	authDomain: import.meta.env.VITE_PUBLIC_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PUBLIC_PROJECTID,
	storageBucket: import.meta.env.VITE_PUBLIC_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_PUBLIC_APPID,
	measurementId: import.meta.env.VITE_PUBLIC_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export interface poll {
	_id?: string;
	name: string;
	choices: string[];
	isOpen: boolean;
	isRestricted: boolean;
	users: { choices: string[]; users: string[] }[];
}

export interface submission {
	_id?: string;
	code: string;
	poll_id: string;
	response: string;
}
