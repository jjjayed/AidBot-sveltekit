import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase.client';

const authentic = getAuth();

export const authStore = writable({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	login: async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	updateProfile: async (username: string) => {
		await updateProfile(authentic.currentUser, {
			displayName: username
		});
	}
};
