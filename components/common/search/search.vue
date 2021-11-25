<template>
	<view class="wrapper">
		<navigator class="search" url="/pages/search-page/search-page">
			搜索
		</navigator>
	</view>
</template>

<script>
	export default {
		name: 'Search',
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.wrapper {
	height: 80rpx;
	background-color: #FF8E98;
	// background-color: #bfa;
	.search {
		width: 96%;
		margin: 10rpx 2%;
		font-size: 30rpx;
		background-color: #fff;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 999em;
	}
}
</style>
