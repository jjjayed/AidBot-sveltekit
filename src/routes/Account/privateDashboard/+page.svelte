<script lang="ts">
	import { authStore } from '$stores/authStore';

	let email: string;
	let username: string;

	authStore.subscribe((curr) => {
		email = curr?.currentUser?.email;
		username = curr?.currentUser?.displayName;
	});
</script>

<main>
	{#if $authStore.currentUser}
		<h1>You are logged in as <span>{username}</span> !</h1>
		<p>Click the Chat Now button on the top-right to start testing our ChatBot</p>
	{:else}
		<h1>Loading</h1>
	{/if}
</main>

<style lang="scss">
	main {
		width: min(140em, 100%);
		margin-inline: auto;
		margin-top: 5em;
		padding-left: 2%;

		h1 {
			font-size: $font-size-xxxl;
			line-height: 110%;
			color: $text-darker;

			span {
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		p {
			font-size: $font-size-lg;
			margin: 0.5em 0 1em 0;
			color: $text-darker;
		}
	}
</style>
