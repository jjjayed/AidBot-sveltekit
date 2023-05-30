<script lang="ts">
	import bot from '$assets/bot.png';
	import user from '$assets/user.png';
	import { beforeUpdate, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let message: string;
	let isResLoading = false;

	const jsonMessage = writable([
		{
			role: 'bot',
			message: 'Hi, I am AidBot! How can I help you today?'
		}
	]);

	onMount(() => {
		try {
			const fileContent = localStorage.getItem('data');
			if (fileContent) {
				const data = JSON.parse(fileContent);
				jsonMessage.set(data);
				console.log('Loaded data:', data);
			}
		} catch (error) {
			console.error('Error reading JSON file:', error);
		}
	});

	function clearData() {
		localStorage.clear();
	}

	beforeUpdate(() => {
		window.addEventListener('beforeunload', clearData);
	});

	function handleChatMessage() {
		const pushMessage = message.trim();

		if (pushMessage.length > 0) {
			console.log(pushMessage);
			pushChat(pushMessage, 'user');
			getResponse(pushMessage);
			isResLoading = true;
		}

		message = '';
	}

	function pushChat(message: string, role: string) {
		const newObject = { role, message };

		jsonMessage.update((messages) => [...messages, newObject]);

		try {
			const data = $jsonMessage;
			localStorage.setItem('data', JSON.stringify(data, null, 2));
			console.log('Object appended to JSON file successfully.');
		} catch (error) {
			console.error('Error writing JSON file:', error);
		}
	}

	function getResponse(pushMessage: string) {
		const header = new Headers();
		header.append('Content-Type', 'application/x-www-form-urlencoded');

		const urlencoded = new URLSearchParams();
		urlencoded.append('text', pushMessage);

		const requestOptions = {
			method: 'POST',
			headers: header,
			body: urlencoded,
			redirect: 'follow'
		};

		// change to public api when available
		fetch('http://f075-180-190-109-22.ngrok-free.app/aid-bot', requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return { response: null };
				}
			})
			.then((result) => {
				if (result.response) {
					isResLoading = false;
					pushChat(result.response, 'bot');
				} else {
					pushChat("Sorry, I can't process your previous chat message.", 'bot');
				}
			})
			.catch((error) => console.log('error', error));
	}
</script>

<main>
	<h1>Chat Page</h1>

	<div class="chat-container">
		{#each $jsonMessage as chat, i}
			{#if chat.role === 'bot'}
				{#if i > 0 && $jsonMessage[i - 1].role === 'bot'}
					<div transition:fade class="message-container continue bot">
						<img src={bot} alt="bot" class="empty" />
						<p class="message">
							{chat.message}
						</p>
					</div>
				{:else}
					<div transition:fade class="message-container bot">
						<img src={bot} alt="bot" />
						<p class="message">
							{chat.message}
						</p>
					</div>
				{/if}
			{:else if chat.role === 'user'}
				{#if i > 0 && $jsonMessage[i - 1].role === 'user'}
					<div transition:fade class="message-container continue user">
						<img src={user} alt="user" class="empty" />
						<p class="message">
							{chat.message}
						</p>
					</div>
				{:else}
					<div transition:fade class="message-container user">
						<img src={user} alt="user" />
						<p class="message">
							{chat.message}
						</p>
					</div>
				{/if}
			{/if}
		{/each}
	</div>

	{#if isResLoading}
		{#key isResLoading}
			<div transition:fade class="loading-container">
				<p>Waiting for chat response...</p>
			</div>
		{/key}
	{/if}
	<form
		class="chat-input-container"
		on:submit|preventDefault={() => {
			handleChatMessage();
		}}
	>
		<input type="text" placeholder="Ask something..." bind:value={message} />
		<button class="send" />
	</form>
</main>

<style lang="scss">
	* {
		font-family: 'Montserrat', sans-serif;
	}

	main {
		width: min(140em, 95%);
		margin-inline: auto;
		margin-top: 5em;
		padding-inline: 2%;

		h1 {
			font-size: $font-size-xxxl;
			line-height: 110%;
			color: $text-darker;
		}

		p {
			font-size: $font-size-base;
			margin: 0.5em 0 1em 0;
			color: $text-darker;
		}

		.chat-container {
			margin-top: 5em;
			display: flex;
			flex-direction: column;
			gap: 5em;
			width: 95%;
			margin-inline: auto;

			.message-container {
				display: flex;
				gap: 1.5em;
				width: 50%;
				// justify-content: center;

				.empty {
					visibility: hidden;
				}
				img {
					width: 5em;
					height: 100%;
					align-self: flex-end;
				}
				.message {
					padding: 1em;
					border-radius: 20px;
					margin: 0;
				}
			}

			.message-container.continue {
				margin-top: -2em;
			}
			.bot .message {
				background-color: $primary;
				color: $white;
				margin-right: auto;
			}

			.user {
				text-align: right;
				margin-left: auto;
				flex-flow: row-reverse;

				.message {
					background-color: $accent;
					color: $white;
				}
			}
		}

		.chat-input-container {
			margin-top: 10em;
			display: flex;
			width: min(80em, 100%);
			text-decoration: none;
			font-size: $font-size-base;
			font-family: inherit;
			color: $text;
			gap: 2em;
			margin-inline: auto;
			justify-content: center;
			align-items: center;

			position: sticky;
			bottom: 0;
			padding-bottom: 2em;
			input {
				padding: 1em 1.5em;
				border: none;
				border-radius: 10px;
				background-color: hsla(0, 0%, 84%, 1);
				width: 100%;
			}

			.send {
				background: url('$assets/send_FILL0_wght400_GRAD0_opsz48.png') center no-repeat,
					linear-gradient(40deg, $primary, $accent);
				background: url('$assets/send_FILL0_wght400_GRAD0_opsz48.png') center no-repeat,
					-webkit-linear-gradient(40deg, $primary, $accent);
				background-size: contain;
				width: 50px;
				height: 50px;
				border-radius: 10px;
				padding: 1em 2em;
				border: none;
				cursor: pointer;
				transition: all 0.4s ease-in-out;

				&:hover {
					background: url('$assets/send_FILL0_wght400_GRAD0_opsz48.png') center no-repeat,
						-webkit-linear-gradient(40deg, #f13b1f9d, #4056a19d);
					background: url('$assets/send_FILL0_wght400_GRAD0_opsz48.png') center no-repeat,
						linear-gradient(40deg, #f13b1f9d, #4056a19d);
				}
			}
		}

		.loading-container {
			margin-top: 5em;
			padding: 2em;
			background: linear-gradient(-45deg, $primary, $accent, $primary, $accent);
			background-size: 400% 400%;
			border-radius: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			margin-inline: auto;
			animation: bg-gradient 8s ease-in-out infinite alternate;

			p {
				color: $white;
				margin: 0;
			}
		}

		@keyframes bg-gradient {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
	}
</style>
