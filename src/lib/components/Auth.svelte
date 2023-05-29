<script lang="ts">
	import { goto } from '$app/navigation';
	import { authHandlers, authStore } from '$stores/authStore.js';
	import { registered } from '$stores/registered.js';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let username = '';
	let screenSize: number;

	async function handleSubmit() {
		if (!email || !password || ($registered && !confirmPassword)) {
			return;
		}

		if ($registered && password === confirmPassword) {
			try {
				await authHandlers.signup(email, password);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await authHandlers.login(email, password);
			} catch (err) {
				console.log(err);
			}
		}

		if ($authStore.currentUser && username) {
			try {
				await authHandlers.updateProfile(username);
			} catch (err) {
				console.log(err);
			}
		}

		if ($authStore.currentUser) {
			goto('/Account/privateDashboard');
		}
	}
</script>

<svelte:window bind:innerWidth={screenSize} />

<main class:mobile={screenSize < 768}>
	<div class="container">
		<h1>{$registered ? 'Create an Account' : 'Login your account'}</h1>

		<form>
			<label for="email"
				>Email
				<input
					bind:value={email}
					type="email"
					id="email"
					name="email"
					placeholder="123@gmail.com"
				/>
			</label>
			<label for="password"
				>Password
				<input
					bind:value={password}
					type="password"
					id="password"
					name="password"
					placeholder="password"
				/>
			</label>

			{#if $registered}
				<label for="password"
					>Confirm password
					<input
						bind:value={confirmPassword}
						type="password"
						id="password"
						name="password"
						placeholder="password"
					/>
				</label>

				<label for="username"
					>Username
					<input
						bind:value={username}
						type="username"
						id="username"
						name="username"
						placeholder="insert name"
					/>
				</label>
			{/if}
			<button on:click|preventDefault={handleSubmit}>Submit</button>
		</form>
	</div>
</main>

<style lang="scss">
	* {
		font-family: 'Montserrat', sans-serif;
	}

	main {
		width: min(140em, 100%);
		margin-inline: auto;
		margin-top: 5em;
		padding: 2%;

		h1 {
			font-size: $font-size-xxxl;
			line-height: 110%;
			color: $text-darker;

			background: -webkit-linear-gradient(40deg, $primary, $accent);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		form {
			width: min(60em, 50%);
			margin-top: 5em;
			text-decoration: none;
			font-size: $font-size-base;
			font-family: inherit;
			color: $text;
			display: flex;
			flex-direction: column;
			gap: 2em;

			label {
				display: flex;
				flex-direction: column;
			}

			input {
				padding: 0.4em 1em;
				border: none;
				border-radius: 10px;
				background-color: hsla(0, 0, 85, 0.5);
			}
		}

		button {
			font-size: $font-size-md;
			padding: 0.35em 1em;
			border: none;

			margin-top: 2em;
			color: $white;
			background-color: $primary;
			border-radius: 25px;
			outline: 0 solid $primary;
			&:hover {
				background: none;
				color: $primary;
				outline: 2px solid $primary;
			}
		}
	}

	main.mobile {
		width: min(140em, 100%);
		margin-inline: auto;
		margin-top: 5em;
		padding: 2%;

		h1 {
			font-size: $font-size-xxxl;
			line-height: 110%;
			color: $text-darker;
			text-align: center;
			background: -webkit-linear-gradient(40deg, $primary, $accent);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		form {
			width: min(60em, 80%);
			margin-top: 5em;
			text-decoration: none;
			font-size: $font-size-base;
			font-family: inherit;
			color: $text;
			display: flex;
			flex-direction: column;
			gap: 2em;
			justify-content: center;
			margin-inline: auto;

			label {
				display: flex;
				flex-direction: column;
			}

			input {
				padding: 0.4em 1em;
				border: none;
				border-radius: 10px;
				background-color: rgba($text, 0.2);
			}
		}

		button {
			font-size: $font-size-md;
			padding: 0.35em 1em;
			border: none;

			margin-top: 2em;
			color: $white;
			background-color: $primary;
			border-radius: 25px;
			outline: 0 solid $primary;
			&:hover {
				background: none;
				color: $primary;
				outline: 2px solid $primary;
			}
		}
	}
</style>
