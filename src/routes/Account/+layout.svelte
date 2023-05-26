<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import { authStore } from '../../stores/authStore';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});

			if (
				browser &&
				!$authStore?.currentUser &&
				!$authStore.isLoading &&
				window.location.pathname !== '/Account'
			) {
				goto('/Account');
				// console.log(authStore.currentUser, authStore.isLoading);
			}
		});
		return unsubscribe;
	});
</script>

<main>
	<slot><!-- optional fallback --></slot>
</main>
