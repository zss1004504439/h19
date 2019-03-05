<template>
	<view class="ts-flex ts-row ts-flex-item">
		<video
			class="player"
			id="myVideo"
			:src="currentVideoUrl"
			:poster="currentPosterUrl"
			@error="videoErrorCallback"
			controls
			direction="90"
			autoplay="true"
		></video>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentVideoUrl: '',
			currentPosterUrl: ''
		};
	},

	onLoad: function(e) {
		const { url, poster, title } = e;

		if (url) {
			this.currentVideoUrl = url;
		}

		if (poster) {
			this.currentPosterUrl = poster;
		}
	}
};
</script>

<style>
.player {
	display: flex;
	flex-direction: row;
	flex: 1;
}
</style>
