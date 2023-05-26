<script lang="ts">
	import AA from '$assets/AA.png';
	import BE from '$assets/BE.png';
	import FE1 from '$assets/FE1.png';
	import FE2 from '$assets/FE2.png';
	import TL from '$assets/TL.png';
	import customerCentric from '$assets/customer-centric.png';
	import transparency from '$assets/transparency.png';
	import understanding from '$assets/understanding.png';

	let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />

<main class:mobile={screenSize < 768}>
	<section class="right">
		<div class="image-container about-img-one" />
		<div class="text">
			<h2>Our <span>Mission</span></h2>
			<p>
				At AidBot, our mission is to provide seamless and personalized assistance to individuals
				facing challenges with a specific product. We aim to empower users by offering reliable
				information and practical solutions, ensuring they have a smooth and enjoyable experience
				throughout their product journey.
			</p>
		</div>
	</section>

	<section class="left">
		<div class="image-container about-img-two" />
		<div class="text">
			<h2>Our <span>Story</span></h2>
			<p>
				AidBot was founded in 2023 with a clear objective in mind: to bridge the gap between users
				and product support. Our team of AI enthusiasts and customer service experts came together
				to create a cutting-edge chatbot solution that would revolutionize the way people seek
				assistance for their product-related queries. Since then, we have been committed to
				continuously improving our technology and expanding our capabilities to cater to the
				evolving needs of our users.
			</p>
		</div>
	</section>

	<section class="center">
		<h2>Our <span>Values</span></h2>
		<div class="cards-titles-container">
			<div class="card">
				<div class="title">
					<img src={customerCentric} alt="" />
					<h3>Customer Centric</h3>
				</div>
				<p>
					We prioritize the needs and satisfaction of our users, striving to exceed their
					expectations at every interaction.
				</p>
			</div>
			<div class="card">
				<div class="title">
					<img src={transparency} alt="" />
					<h3>Transparency</h3>
				</div>

				<p>
					We believe in being open and transparent about our processes, ensuring that users have a
					clear understanding of how AidBot operates and how their data is handled.
				</p>
			</div>
			<div class="card">
				<div class="title">
					<img src={understanding} alt="" />
					<h3>Understanding</h3>
				</div>
				<p>
					We empathize with the challenges our users face and aim to provide personalized assistance
					tailored to their unique situations.
				</p>
			</div>
		</div>
	</section>

	<div class="divider">
		<!-- image with filter agen maybe -->
	</div>

	<section class="team-container">
		<h2>Meet the <span>Team</span></h2>
		<div class="team-info-container">
			<div class="item">
				<img src={TL} alt="team leader" />
				<h3>Team Leader</h3>
				<h4>Kevin Remperas</h4>
				<p>The Team leader of Team May, tasked with managing the whole project.</p>
			</div>
			<div class="item">
				<img src={AA} alt="api architect" />
				<h3>API Architect</h3>
				<h4>JL Rivas</h4>
				<p>The AI Architect responsible for designing and implementing AI solutions.</p>
			</div>
			<div class="item">
				<img src={BE} alt="backend dev" />
				<h3>Back-end Dev</h3>
				<h4>Jhonard Langcoyan</h4>
				<p>The Back-end Developer responsible for the overall management of a database system.</p>
			</div>
			<div class="item">
				<img src={FE1} alt="web dev" />
				<h3>Web Dev</h3>
				<h4>Jefherson Sta.Maria</h4>
				<p>The front-end developer responsible for turning the website designs into code.</p>
			</div>
			<div class="item last">
				<img src={FE2} alt="web dev" />
				<h3>Web Dev</h3>
				<h4>Angel Reyes</h4>
				<p>The front-end developer responsible for designing the website along with the team.</p>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	* {
		font-family: 'Montserrat', sans-serif;
	}

	main {
		width: min(140em, 100%);
		margin-inline: auto;
		gap: 5em;

		.left {
			grid-template-areas: 'img text';
			padding-left: 0;
			text-align: right;
			padding-right: 2%;
			.image-container {
				border-radius: 0 50px 50px 0;
			}
		}

		.right {
			grid-template-areas: 'text img';
			.image-container {
				border-radius: 50px 0 0 50px;
			}
		}

		section {
			display: grid;
			grid-template-columns: 1fr 1fr;
			width: min(140em, 100%);
			margin: 5em auto 2em auto;
			gap: 5em;
			padding-left: 2%;
			span {
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
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

			.about-img-one {
				background: red;
				background: url('$assets/unsplash_QckxruozjRg.png') no-repeat;
				background-size: cover;
				background-position: center;
			}
			.about-img-two {
				background: red;
				background: url('$assets/our story.png') no-repeat;
				background-size: cover;
				background-position: center;
			}
		}

		section.center {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// padding-left: 0;
			margin: 10em 0;
		}

		.cards-titles-container {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			// display: flex;
			justify-content: center;
			gap: 2%;

			.card {
				display: flex;
				flex-direction: column;
				width: 100%;
				gap: 2em;
				padding: 2em;

				.title {
					display: flex;
					align-items: center;
					img {
						width: min(5em, 15%);
						aspect-ratio: 1/1;
						margin-right: 0.5em;
						// margin-left: -2em;
					}
				}
			}
		}

		section.team-container {
			display: flex;
			flex-direction: column;
			text-align: center;
			padding-right: 2%;

			h3 {
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				margin-top: 0.5em;
			}
			h4 {
				margin: 1em 0;
			}
			.team-info-container {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
				gap: 3em;
				margin-bottom: 15em;

				.item {
					background: $background;
					box-shadow: 0 0 20px #4057a185;
					padding: 2em;
					border-radius: 20px;
					img {
						margin-inline: auto;
						width: 10em;
					}
				}

				.item .last {
					justify-self: end;
				}
			}
		}
	}

	main.mobile {
		.left {
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'img img '
				'text text';
			padding-left: 0;
			text-align: right;
		}

		.right {
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'img img '
				'text text';
			padding-left: 0;
			text-align: left;

			.text {
				padding-left: 2%;
			}
		}

		section.team-container {
			.team-info-container {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			}
		}
	}

	p {
		font-size: $font-size-base;
	}

	h2 {
		font-size: $font-size-xxl;
		line-height: 110%;
		color: $text-darker;
	}

	h3 {
		font-size: $font-size-lg;
		line-height: 110%;
		color: $text-darker;
	}
	h4 {
		font-size: $font-size-md;
		line-height: 110%;
		color: $text-darker;
	}
</style>
