<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '$assets/AidBot.png';
	import fb from '$assets/fb.png';
	import git from '$assets/git.png';
	import insta from '$assets/insta.png';
	import twitter from '$assets/twitter.png';
	import { auth } from '$lib/firebase/firebase.client';
	import { authHandlers, authStore } from '$stores/authStore';
	import { registered } from '$stores/registered';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let screenSize: number;
	let burger: HTMLElement;

	let navVisible = false;

	function showNav() {
		burger.classList.toggle('toggle');
		navVisible = !navVisible;
		if (burger.classList.contains('toggle') || !navVisible) {
			document.body.classList.toggle('hidden-overflow');
		}
	}

	function signUpPage() {
		registered.set(true);
		goto('/Account');
	}

	function loginPage() {
		registered.set(false);
		goto('/Account');
	}
	function chatPage() {
		goto('/Chat');
	}

	import SweetScroll from 'sweet-scroll';
	onMount(() => {
		const sweetScroll = new SweetScroll({
			easing: 'easeOutQuart'
		});

		const unsubscribe = auth.onAuthStateChanged((user) => {
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});

			if (
				browser &&
				!$authStore?.currentUser &&
				!$authStore.isLoading &&
				window.location.pathname !== '/Account' &&
				window.location.pathname !== '/'
			) {
				goto('/Account');

				// console.log(authStore.currentUser, authStore.isLoading);
			}
		});
		return unsubscribe;
	});
</script>

<svelte:window bind:innerWidth={screenSize} />

{#if navVisible && screenSize < 768}
	{#key navVisible}
		<div class="overlay" transition:fade />
	{/key}
{/if}

<!-- change nav to show chatbot and logout button instead of login and sign up button fix on MOBILE NAV -->

<nav>
	<img src={logo} alt="logo" />

	{#if screenSize < 768}
		<div
			class="burger"
			bind:this={burger}
			on:click={() => {
				showNav();
			}}
			on:keydown={() => {
				showNav();
			}}
		>
			<div class="line1" />
			<div class="line2" />
			<div class="line3" />
			{#if navVisible && screenSize < 768}
				{#key navVisible}
					<ul class="mobile" transition:fade>
						<!-- position it absolute while burger has position relative -->

						<li><a href="/" class:active={$page.url.pathname === '/' || ''}>Home</a></li>
						<li><a href="/Docs" class:active={$page.url.pathname === '/Docs'}>Docs</a></li>
						<li>
							<a href="/About" class:active={$page.url.pathname === '/About'}>About us</a>
						</li>

						<div class="buttons-container">
							{#if $authStore.currentUser}
								<li>
									<button
										class="secondary mobile"
										on:click={() => {
											authHandlers.logout();
										}}>Log Out</button
									>
								</li>
								<li><button class="primary" on:click={() => chatPage()}>Chat Now</button></li>
							{:else}
								<li>
									<button class="secondary mobile" on:click={() => loginPage()}>Log In</button>
								</li>
								<li><button class="primary" on:click={() => signUpPage()}>Sign Up</button></li>
							{/if}
						</div>
					</ul>
				{/key}
			{/if}
		</div>
	{:else}
		<ul>
			<li><a href="/" class:active={$page.url.pathname === '/' || ''}>Home</a></li>
			<li><a href="/Docs" class:active={$page.url.pathname === '/Docs'}>Docs</a></li>
			<li><a href="/About" class:active={$page.url.pathname === '/About'}>About us</a></li>

			{#if $authStore.currentUser}
				<li>
					<button
						class="secondary"
						on:click={() => {
							authHandlers.logout();
						}}>Log Out</button
					>
				</li>
				<li><button class="primary" on:click={() => chatPage()}>Chat Now</button></li>
			{:else}
				<li><button class="secondary" on:click={() => loginPage()}>Log In</button></li>
				<li><button class="primary" on:click={() => signUpPage()}>Sign Up</button></li>
			{/if}
		</ul>
	{/if}
</nav>
{#if $authStore.currentUser && $page.url.pathname !== '/Account/privateDashboard'}
	<h3 class="login-info">
		You are logged in as <span> {$authStore.currentUser.displayName}</span>
	</h3>
{/if}
<!-- navbar next -->

<slot data-scroll><!-- optional fallback --></slot>

{#if $page.url.pathname === '/' || ''}
	<footer class:mobile={screenSize < 768}>
		<div class="links-container">
			<ul>
				<span>News and Updates</span>
				<li><a href="/">Developer Changelog</a></li>
				<li><a href="/">Status</a></li>
			</ul>
			<ul>
				<span>Community</span>
				<li><a href="/">Developer forums</a></li>
				<li><a href="/">Facebook Group</a></li>
				<li><a href="/">Partners</a></li>
			</ul>
			<ul>
				<span>Legal</span>
				<li><a href="/">Terms of Service</a></li>
				<li><a href="/">API Terms of Service</a></li>
				<li><a href="/">Privacy Policy</a></li>
			</ul>
			<ul>
				<span>Company</span>
				<li><a href="/">About Us</a></li>
				<li><a href="/">Investors</a></li>
				<li><a href="/">Careers</a></li>
			</ul>
		</div>
		<div class="logo-copyright-container">
			<img src={logo} alt="logo" />
			<p>AidBot&copy; 2023</p>
			<div class="social-media-links">
				<img src={git} alt="github icon" />
				<img src={fb} alt="fb icon" />
				<img src={insta} alt="instagram icon" />
				<img src={twitter} alt="twitter icon" />
			</div>
		</div>
	</footer>
{/if}

<style lang="scss">
	:global(body) {
		background-color: $background;
		overflow-x: hidden;
	}

	:global(.hidden-overflow) {
		overflow: hidden;
	}

	:global(button) {
		transition: all 0.4s ease-in-out;
		&:hover {
			cursor: pointer;
		}
	}

	li {
		list-style: none;
		a {
			text-decoration: none;
			font-size: $font-size-base;
			font-family: inherit;
			color: $text;
			transition: all 0.4s ease-in-out;
			border-bottom: 0 solid $accent;
			&:hover {
				color: $text-darker;
			}
		}
	}

	.overlay {
		width: 100vw;
		height: 150vh;
		position: absolute;
		background-image: linear-gradient(
			to right bottom,
			#f13b1fc0,
			#e8155fc0,
			#c22f8cc0,
			#874aa4c0,
			#4056a1c0
		);
		// overflow: hidden;
		z-index: 90;
		top: 0;
		left: 0;
		&:hover {
			cursor: none;
		}
	}

	nav {
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: min(140em, 95%);
		padding: 2em 0;
		margin-inline: auto;
		position: relative;
		z-index: 100;

		a.active {
			color: $accent;
			border-bottom: 5px solid $accent;
		}

		ul {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: min(60em, 65%);
		}
		button {
			font-size: $font-size-base;
			padding: 0.35em 1em;
			border: none;
		}

		.secondary {
			color: $text;
			background-color: $secondary;
			border-radius: 5px;
			outline: 0 solid $secondary;

			&:hover {
				background: none;
				outline: 3px solid $secondary;
			}

			&.mobile {
				&:hover {
					color: $white;
				}
			}
		}

		.primary {
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

		img {
			width: min(12em, 25%);
		}

		.burger {
			cursor: pointer;

			ul.mobile {
				position: absolute;
				left: 0;
				right: 0;
				margin-inline: auto;
				margin-top: 5em;
				width: 90vw;
				height: 90vh;
				// overflow: hidden;
				padding: 2em;
				z-index: 100;
				display: grid;
				grid-template-rows: auto auto;
				place-items: center;
				gap: 3em;
				justify-content: center;
				align-items: center;
				&:hover {
					cursor: auto;
				}

				a {
					color: $white;
					font-size: $font-size-md;

					&:hover {
						color: $accent;
					}
				}

				.buttons-container {
					display: flex;
					width: 100%;
					gap: 4em;
					button {
						font-size: $font-size-md;

						&.primary {
							&:hover {
								color: $white;
							}
						}
					}
				}
			}
		}

		.burger > div {
			width: 25px;
			height: 2px;
			background-color: $text-darker;
			margin: 5px;
			transition: all 0.4s ease-in-out;
		}

		.toggle .line1 {
			transform: rotate(-45deg) translate(-5px, 5px);
		}

		.toggle .line2 {
			opacity: 0;
		}

		.toggle .line3 {
			transform: rotate(+45deg) translate(-5px, -5px);
		}
	}

	.login-info {
		width: 100%;
		padding: 0 2%;
		margin-inline: auto;
		text-align: center;
		font-size: $font-size-lg;
		line-height: 110%;
		color: $text-darker;

		span {
			background: -webkit-linear-gradient(40deg, $primary, $accent);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	footer {
		width: min(140em, 95%);
		margin: 10em auto 0 auto;
		// background-color: blanchedalmond;
		.links-container {
			display: flex;
			justify-content: space-around;
			gap: 3em;
			background: hsla(0, 0%, 59%, 0.2);
			outline: 1px solid $text;
			border-radius: 20px;
			padding: 5em;
			span {
				font-size: $font-size-base;
				font-weight: 700;
			}
			a {
				line-height: 110%;
			}
			li {
				margin: 1.5em 0 1em 0;
			}
		}

		.logo-copyright-container {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			padding: 2em 0;
			margin-top: 2em;
			// background-color: antiquewhite;

			img {
				width: min(12em, 15%);
			}
			p {
				font-size: $font-size-base;
			}
			.social-media-links {
				display: flex;
				align-items: center;
				gap: 1em;
				& > * {
					&:hover {
						cursor: pointer;
					}
				}

				img {
					width: min(5em, 25%);
					height: auto;
				}
			}
		}
	}

	footer.mobile {
		width: min(140em, 95%);
		margin: 10em auto 0 auto;
		// background-color: blanchedalmond;
		.links-container {
			display: grid;
			grid-template-columns: auto auto;
			justify-content: space-around;
			gap: 3em;
			background: hsla(0, 0%, 59%, 0.2);
			outline: 1px solid $text;
			border-radius: 20px;
			padding: 5em;
			span {
				font-size: $font-size-base;
				font-weight: 700;
			}
			a {
				line-height: 110%;
			}
			li {
				margin: 1.5em 0 1em 0;
			}
		}

		.logo-copyright-container {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			padding: 2em 0;
			margin-top: 2em;
			// background-color: antiquewhite;

			img {
				width: min(12em, 15%);
			}
			p {
				font-size: $font-size-base;
				width: 100%;
				text-align: center;
			}
			.social-media-links {
				display: flex;
				align-items: center;
				gap: 1em;
				width: 100%;
				& > * {
					&:hover {
						cursor: pointer;
					}
				}

				img {
					width: min(5em, 15%);
					height: auto;
				}
			}
		}
	}
</style>
