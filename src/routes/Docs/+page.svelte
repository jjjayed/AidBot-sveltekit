<script>
	import expand from '$assets/expand_more_FILL0_wght400_GRAD0_opsz48.png';
	import { onMount } from 'svelte';

	const languages = {
		auto: 'Automatic',
		af: 'Afrikaans',
		sq: 'Albanian',
		ar: 'Arabic',
		hy: 'Armenian',
		az: 'Azerbaijani',
		eu: 'Basque',
		be: 'Belarusian',
		bn: 'Bengali',
		bs: 'Bosnian',
		bg: 'Bulgarian',
		ca: 'Catalan',
		ceb: 'Cebuano',
		ny: 'Chichewa',
		'zh-cn': 'Chinese Simplified',
		'zh-tw': 'Chinese Traditional',
		co: 'Corsican',
		hr: 'Croatian',
		cs: 'Czech',
		da: 'Danish',
		nl: 'Dutch',
		en: 'English',
		eo: 'Esperanto',
		et: 'Estonian',
		tl: 'Filipino',
		fi: 'Finnish',
		fr: 'French',
		fy: 'Frisian',
		gl: 'Galician',
		ka: 'Georgian',
		de: 'German',
		el: 'Greek',
		gu: 'Gujarati',
		ht: 'Haitian Creole',
		ha: 'Hausa',
		haw: 'Hawaiian',
		iw: 'Hebrew',
		hi: 'Hindi',
		hmn: 'Hmong',
		hu: 'Hungarian',
		is: 'Icelandic',
		ig: 'Igbo',
		id: 'Indonesian',
		ga: 'Irish',
		it: 'Italian',
		ja: 'Japanese',
		jw: 'Javanese',
		kn: 'Kannada',
		kk: 'Kazakh',
		km: 'Khmer',
		ko: 'Korean',
		ku: 'Kurdish (Kurmanji)',
		ky: 'Kyrgyz',
		lo: 'Lao',
		la: 'Latin',
		lv: 'Latvian',
		lt: 'Lithuanian',
		lb: 'Luxembourgish',
		mk: 'Macedonian',
		mg: 'Malagasy',
		ms: 'Malay',
		ml: 'Malayalam',
		mt: 'Maltese',
		mi: 'Maori',
		mr: 'Marathi',
		mn: 'Mongolian',
		my: 'Myanmar (Burmese)',
		ne: 'Nepali',
		no: 'Norwegian',
		ps: 'Pashto',
		fa: 'Persian',
		pl: 'Polish',
		pt: 'Portuguese',
		ma: 'Punjabi',
		ro: 'Romanian',
		ru: 'Russian',
		sm: 'Samoan',
		gd: 'Scots Gaelic',
		sr: 'Serbian',
		st: 'Sesotho',
		sn: 'Shona',
		sd: 'Sindhi',
		si: 'Sinhala',
		sk: 'Slovak',
		sl: 'Slovenian',
		so: 'Somali',
		es: 'Spanish',
		su: 'Sudanese',
		sw: 'Swahili',
		sv: 'Swedish',
		tg: 'Tajik',
		ta: 'Tamil',
		te: 'Telugu',
		th: 'Thai',
		tr: 'Turkish',
		uk: 'Ukrainian',
		ur: 'Urdu',
		uz: 'Uzbek',
		vi: 'Vietnamese',
		cy: 'Welsh',
		xh: 'Xhosa',
		yi: 'Yiddish',
		yo: 'Yoruba',
		zu: 'Zulu'
	};

	const options = Object.entries(languages).map(([key, label]) => ({ key, label }));

	let codeSnippetOne = `
	const header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        const urlencoded = new URLSearchParams();
        urlencoded.append('content', pushMessage);
        urlencoded.append('language', 'tl');
        const requestOptions = {
            method: 'POST',
            headers: header,
            body: urlencoded,
        };
        fetch('<address>/aid-bot', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return { response: null };
                }
            })
            .then((result) => {
                if (result.response) {
                    // ...display chatbot response...
                } else {
                    // ...handle missing response...
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    `;

	let codeSnippetTwo = `
	{
		response: <bot_response>
	}`;

	import SweetScroll from 'sweet-scroll';

	const sweetScroll = new SweetScroll({
		duration: 2000,
		easing: 'easeOutQuart' // Specifies the pattern of easing
	});

	let showLang = false;
</script>

<main>
	<button class="goTop">
		<a on:click={() => sweetScroll.to('#titleContainer')} href="#titleContainer">Go back up</a>
	</button>
	<div class="title-container" id="titleContainer">
		<h1>AidBot <span>API Documentation</span></h1>
		<p>Powered by: <a href="https://openai.com/" target="_blank">OpenAI</a></p>
	</div>

	<section class="toc-container">
		<p>Table of Contents</p>
		<ul>
			<li>
				<a on:click={() => sweetScroll.to('#titleContainer')} href="#titleContainer"
					>AidBot Chatbot API Documentation</a
				>
			</li>
			<ul>
				<li>
					<a on:click={() => sweetScroll.to('#apiProcess')} href="#apiProcess">API Process Flow</a>
				</li>
				<ul>
					<li>
						<a on:click={() => sweetScroll.to('#problemProcess')} href="#problemProcess"
							>Problem Processing</a
						>
					</li>
					<li>
						<a on:click={() => sweetScroll.to('#similarSearch')} href="#similarSearch"
							>Similarity Search</a
						>
					</li>
					<li><a on:click={() => sweetScroll.to('#QA')} href="#QA">Question Answering</a></li>
					<li>
						<a on:click={() => sweetScroll.to('#translation')} href="#translation">Translation</a>
					</li>
				</ul>
				<li>
					<a on:click={() => sweetScroll.to('#installation')} href="#installation">Installation</a>
				</li>
				<ul>
					<li>
						<a on:click={() => sweetScroll.to('#postReq')} href="#postReq">Server POST Request</a>
					</li>
					<li>
						<a on:click={() => sweetScroll.to('#integrated')} href="#integrated">Integrated</a>
					</li>
				</ul>
				<li>
					<a on:click={() => sweetScroll.to('#usage')} href="#usage">Usage</a>
				</li>
				<ul>
					<li>
						<a on:click={() => sweetScroll.to('#sampleReq')} href="#sampleReq"
							>Example POST Request</a
						>
					</li>
					<li><a on:click={() => sweetScroll.to('#res')} href="#res">Response</a></li>
				</ul>
			</ul>
		</ul>
	</section>

	<section id="apiProcess" class="doc-container">
		<h2>API Process Flow</h2>
		<ol>
			<li>Problem Processing (Sentiment Analysis, Problem Prioritization)</li>
			<li>Similarity Search</li>
			<li>Question Answering</li>
			<li>Translation</li>
			<li>Response</li>
		</ol>

		<div class="doc-item" id="problemProcess">
			<h3>Problem Processing</h3>
			<div>
				<p>
					This process works by taking in the user inquiry as content to be analyzed and revised to
					be used by the API as the basis for the overall process. By segmenting the content into
					separate sentences, the AI model that the API uses can perform a sentiment analysis and
					rank them according to the severity of the sentiment. Then, after the sentiment analysis,
					based on the level of severity, the model can now re-arrange the content, addressing the
					higher level first and the lowest level last.
				</p>
			</div>
		</div>

		<div class="doc-item" id="similarSearch">
			<h3>Similarity Search</h3>
			<div>
				<p>
					The AI model performs an index of the given documents and searches for possible matches
					against the user's inquiry.
				</p>
			</div>
		</div>

		<div class="doc-item" id="QA">
			<h3>Question Answering</h3>
			<div>
				<p>
					As the name suggests, the AI model now tries to generate an answer to the user's inquiry
					based on the searched documents, making the response as straightforward as possible.
				</p>
			</div>
		</div>

		<div class="doc-item" id="translation">
			<h3>Translation</h3>
			<div>
				<p>
					This feature is optional for the company to use. But if the company wishes to use it,
					through a third-party translator, the API can have access to translate into over 103
					languages.
				</p>

				<div class="title-btn-container">
					<h4>Supported Languages</h4>
					<button
						on:click={() => {
							showLang = !showLang;
						}}><img src={expand} alt="expand more button" class:retract={showLang} /></button
					>
				</div>

				<div class="supported-languages" class:showLang>
					<div>
						<table>
							<tr>
								<th>Key</th>
								<th>Languages</th>
							</tr>
							{#each options as lang}
								<tr>
									<td>{lang.key}</td>
									<td>{lang.label}</td>
								</tr>
							{/each}
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="installation" class="doc-container">
		<h2>Installation</h2>
		<div>
			<p>
				This installation guide will walk you through the process of setting up the chatbot on your
				system. Installation is fairly straightforward; you can have two options for installation.
				You can have a server send POST requests to the API behind the chatbot or have it integrated
				to your website.
			</p>
		</div>

		<div class="doc-item" id="postReq">
			<h3>Server POST Request</h3>
			<div>
				<ol>
					<li>Extract the chatbot API to your server.</li>
					<li>
						In your console, type and run <code>npm install</code> to install all required dependencies.
					</li>
					<li>
						You are required to create a <code>.env</code> file that contains your OpenAI API Key
						and your selected port to be exposed by express. <br />
						<p>i. See <code> example.env</code>.</p>
					</li>
					<li>
						Copy over all your support documents inside the <code>/support</code> folder. <br />
						<p>
							By default the chatbot API is already trained to answer from
							<a href="https://www.convergeict.com/support/">Converge ICT Support Page</a>.
						</p>
					</li>
					<li>To run the chatbot API, in your console, type and run <code>npm start</code>.</li>
					<li>
						The console will output the exposed address of the chatbot API to be used as your
						endpoint.<br />
						<p>
							i. Your endpoint address should be <code> http:localhost:{`<port>`}/aid-post </code>
						</p>
					</li>
					<li>
						You now have successfully set up the chatbot API and is now ready to receive POST
						requests.
					</li>
				</ol>
			</div>
		</div>

		<div class="doc-item" id="integrated">
			<h3>Integrated</h3>
			<div>
				<ol>
					<li>Extract the chatbot API to your website's internal folder.</li>
					<li>
						In your console, type and run <code>npm install</code> to install all required dependencies.
					</li>
					<li>
						You may need to modify the <code>index.js</code> to have an export of the otherwise POST
						endpoint of the API.
					</li>
					<li>
						You are required to create a <code>.env</code> file that contains your OpenAI API Key
						and your selected port to be exposed by express.
						<p>
							i. See <code>example.env</code>.
						</p>
					</li>
					<li>
						Copy over all your support documents inside the code <code>/support</code> folder.
						<br />
						<p>
							i. By default the chatbot API is already trained to answer from <a
								href="https://www.convergeict.com/support/">Converge ICT Support Page</a
							>
						</p>
					</li>
					<li>Import the API module export to your website.</li>
					<li>You now have successfully set up the chatbot API.</li>
				</ol>
			</div>
		</div>
	</section>

	<section id="usage" class="doc-container">
		<h2>Usage</h2>
		<div class="doc-item" id="sampleReq">
			<h3>Example POST Request</h3>
			<div>
				<pre class="language-javascript">
					<code>{codeSnippetOne}</code>
				</pre>
			</div>
		</div>

		<div class="doc-item" id="res">
			<h3>Response</h3>
			<div>
				<pre>
					<code>{codeSnippetTwo}</code>
				</pre>
			</div>
		</div>
	</section>
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
		position: relative;

		.goTop {
			position: fixed;
			bottom: 20px;
			right: 20px;
			z-index: 50;
			font-size: $font-size-sm;
			padding: 1em 2em;
			background: -webkit-linear-gradient(40deg, $primary, $accent);
			border: none;
			border-radius: 4px;
			cursor: pointer;
			a {
				color: $white;
			}
		}

		.supported-languages {
			display: grid;
			grid-template-rows: 0fr;
			transition: all 1s ease-in-out;
			padding: 2em;

			& > div {
				overflow: hidden;
			}

			&.showLang {
				grid-template-rows: 1fr;
			}
		}

		.title-btn-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			button {
				border: none;
				border-radius: 10px;
				background: -webkit-linear-gradient(40deg, $primary, $accent);
				img {
					transition: transform 1s ease-in-out;
					transform: rotate(0);
				}
				.retract {
					transform: rotate(180deg);
				}
			}
		}

		h2 {
			font-size: $font-size-xxl;
			line-height: 110%;
			color: $text-darker;
		}

		h3 {
			font-size: $font-size-xl;
		}
		h4 {
			font-size: $font-size-lg;
		}

		p,
		li,
		table {
			font-size: $font-size-base;
			margin: 0.5em 0 1em 0;
			color: $text-darker;
			list-style-position: inside;
		}

		.title-container {
			h1 {
				padding-bottom: 0.2em;
				margin-bottom: 0.5em;
				border-bottom: 5px solid #dbdbdb;
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
				margin-left: 2%;
			}
		}

		table {
			border-collapse: collapse;
			width: 60%;
			margin-inline: auto;
		}

		th,
		td {
			text-align: left;
			padding: 1em;
			width: 50%;
		}

		tr:nth-child(even) {
			background-color: $secondary;
		}

		th {
			background-color: $accent;
			color: white;
		}

		a {
			text-decoration: none;
		}

		ul > ul {
			margin-left: 1.5em;
		}

		code {
			background-color: #aaaaaa;
			padding: 0.4em 0.6em;
			border-radius: 4px;
			font-family: monospace;
			color: $white;
		}
	}

	.doc-container {
		margin: 5em 0;

		h2 {
			border-bottom: 5px solid #dbdbdb;
		}

		.doc-item {
			margin: 3em 0;
			border-bottom: 5px solid #dbdbdb;
			pre {
				white-space: pre-wrap;
				font-size: $font-size-base;
				background-color: #aaaaaa;
				padding: 0.4em 0.6em;
				border-radius: 4px;
				font-family: monospace;
				color: $white;
				margin: 2em 0;
			}
		}
	}
</style>
