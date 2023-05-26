<script lang="ts">
	import { goto } from '$app/navigation';
	import { registered } from '../stores/registered';

	let screenSize: number;

	let test = true;

	function signUpPage() {
		registered.set(true);
		goto('/Account');
	}
</script>

<svelte:window bind:innerWidth={screenSize} />

<svelte:body class:test />

<main class:mobile={screenSize < 768}>
	<div class="hero">
		<div class="text">
			<h1>Client Support <span>Made Easier</span></h1>
			<p>Easily customizable client support API and chatbot in one bundle</p>
			<button
				on:click={() => {
					signUpPage();
				}}>Get Started</button
			>
		</div>
		<div class="image-container" />
	</div>

	<section class="left">
		<div class="image-container one" />
		<div class="text">
			<h2><span>Seamlessly integrate</span> with any system</h2>
			<p>Our API offers a straightforward way to cater to your needs, on any system and platform</p>
		</div>
	</section>

	<section class="right">
		<div class="text">
			<h2><span>Easily add solutions</span> to problems</h2>
			<p>You can add and even remove preexisting solutions to common issues</p>
		</div>
		<div class="image-container two" />
	</section>

	<section class="left">
		<div class="image-container three" />
		<div class="text">
			<h2><span>Fast response rates</span> grows your business</h2>
			<p>Saves both your and your client’s time and resources in resolving relevant issues</p>
		</div>
	</section>
</main>

<style lang="scss">
	:global(body.test) {
		overflow: hidden;
	}
	main {
		width: 100%;
		margin-top: 5em;
		display: flex;
		flex-direction: column;

		.hero {
			// background: blanchedalmond;
			width: min(140em, 100%);
			margin-inline: auto;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'text img';
			margin-bottom: 5em;
			gap: 5em;
			padding-left: 2%;
			.text {
				grid-area: text;
				width: 100%;
				align-self: center;

				h1 {
					font-size: $font-size-xxxl;
					line-height: 110%;
					color: $text-darker;
				}

				span {
					background: -webkit-linear-gradient(40deg, $primary, $accent);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				p {
					font-size: $font-size-lg;
					margin: 0.5em 0 1em 0;
					color: $text-darker;
				}
			}
			.image-container {
				width: 100%;
				min-height: 100%;
				grid-area: img;
				align-self: center;
				position: relative;
				background: url('$assets/unsplash_mHusyBu4bxM.png') no-repeat;
				background-size: cover;
				background-position: center;
				border-radius: 50px 0 0 50px;
				// img {
				// 	width: 100%;
				// 	object-fit: contain;
				// }
			}

			button {
				font-size: $font-size-base;
				padding: 0.35em 1em;
				border: none;
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

		.left {
			grid-template-areas: 'img text';
			padding-left: 0;
			text-align: right;
			padding-right: 2%;
			.image-container {
				border-radius: 0 50px 50px 0;
			}
			span {
				background: -webkit-linear-gradient(40deg, $accent, $primary);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		.right {
			grid-template-areas: 'text img';

			.image-container {
				border-radius: 50px 0 0 50px;
			}
			span {
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		section {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: min(140em, 100%);
			margin: 5em auto 2em auto;
			gap: 5em;
			padding-left: 2%;
			// background-color: blanchedalmond;
			.text {
				grid-area: text;
				width: 100%;
				align-self: center;
				margin: 10em 0;
				h2 {
					font-size: $font-size-xxl;
					line-height: 110%;
					color: $text-darker;
				}

				p {
					font-size: $font-size-md;
					color: $text-darker;
					margin: 0.5em 0 2em 0;
				}
			}
			.image-container {
				width: 100%;
				min-height: 100%;
				grid-area: img;
				align-self: center;
				position: relative;
			}
			.one {
				background: url('$assets/unsplash_3V8xo5Gbusk.png') no-repeat;
				background-size: cover;
				background-position: center;
			}

			.two {
				background: url('$assets/unsplash_nNMBa7Y1Ymk.png') no-repeat;
				background-size: cover;
				background-position: center;
			}

			.three {
				background: url('$assets/unsplash_3V8xo5Gbusk1.png') no-repeat;
				background-size: cover;
				background-position: center;
			}
		}
	}

	main.mobile {
		width: 100%;
		margin-top: 5em;
		display: flex;
		flex-direction: column;
		.hero {
			// background: blanchedalmond;
			width: min(140em, 100%);
			margin-inline: auto;
			display: grid;
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'img img'
				'text text';
			margin-bottom: 5em;
			gap: 5em;
			padding: 0 2em;
			.text {
				grid-area: text;
				width: 100%;
				align-self: center;
				text-align: center;

				h1 {
					font-size: $font-size-xxxl;
					line-height: 110%;
					color: $text-darker;
				}

				span {
					background: -webkit-linear-gradient(40deg, $primary, $accent);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				p {
					font-size: $font-size-lg;
					margin: 0.5em 0 1em 0;
					color: $text-darker;
				}
			}
			.image-container {
				width: 100%;
				min-height: 100%;
				grid-area: img;
				align-self: center;
				position: relative;
				background: url('$assets/unsplash_mHusyBu4bxM.png') no-repeat;
				background-size: cover;
				background-position: center;
				border-radius: 50px;
				// img {
				// 	width: 100%;
				// 	object-fit: contain;
				// }
			}

			button {
				font-size: $font-size-base;
				padding: 0.35em 1em;
				border: none;
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

		.left {
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'img img '
				'text text';
			padding-left: 0;
			text-align: right;
			.image-container {
				border-radius: 0 50px 50px 0;
			}
			span {
				background: -webkit-linear-gradient(40deg, $accent, $primary);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.text {
				margin-left: auto;
				margin-right: 2em;
			}
		}

		.right {
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'img img '
				'text text';
			padding-left: 0;
			text-align: left;
			.image-container {
				border-radius: 50px 0 0 50px;
			}
			span {
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.text {
				margin-left: 2em;
			}
		}

		section {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: min(140em, 100%);
			margin: 5em auto 2em auto;
			gap: 0;
			padding-left: 2%;
			// background-color: blanchedalmond;
			.text {
				grid-area: text;
				width: 80%;
				align-self: center;
				margin: 2em 0 5em 0;
				h2 {
					font-size: $font-size-xxl;
					line-height: 110%;
					color: $text-darker;
				}

				p {
					font-size: $font-size-md;
					color: $text-darker;
					margin: 0;
				}
			}
			.image-container {
				width: 100%;
				min-height: 100%;
				grid-area: img;
				align-self: center;
				position: relative;
			}
		}
	}
</style>
