<template>
	<div id="app">
		<p>Search for an SVG using the filter below. Click an SVG name to copy it to your clipboard.</p>
		<input type="text" v-model="searchTerm" placeholder="Filter..." style="margin-bottom: 20px"/>

		<div class="container">
			<div v-for="(svg, index) in filteredSvgs" :key="index">
				<svgicon
					:name="svg"
					width="25"
					height="25"
					color="#42b983 #35495e"
				></svgicon>
				<p style="cursor: pointer" @click="copyText">{{ svg }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Fuse from 'fuse.js'
require("./assets/svgGen");
export default {
	name: "App",

	data() {
		return {
			prePath: './assets/icons/',
			searchTerm: "",
			svgs: [],
			filteredSvgs: []
		};
	},

	watch: {
		searchTerm() {
			this.filterSearch(this.searchTerm)
		}
	},

	mounted() {
		const files = require.context('./assets/icons', true, /.svg$/)
		this.svgs = files.keys().map(key => key.slice(2).split('.')[0])
		this.filteredSvgs = [...this.svgs]
	},

	methods: {
		getPath(short) {
			return this.prePath + short
		},

		filterSearch(term) {
			if (!term) {
				this.filteredSvgs = [...this.svgs]
				return
			}

			const fuse = new Fuse(this.svgs)

			const results = fuse.search(term)

			this.filteredSvgs = results.map(x => x.item)
		},

		copyText(event) {
			navigator.clipboard.writeText(event.target.innerText);
		}
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

.container {
	display: grid;
	grid-template-columns: auto auto auto auto;
	padding: 10px;
}
</style>
