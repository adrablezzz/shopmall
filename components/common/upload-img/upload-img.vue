<template>
	<view class="img-wrapper">
		<image :src="image" mode=""></image>
		<icon type="clear" color="#f00"></icon>
	</view>
</template>

<script>
	export default {
		name: 'UploadImg',
		props: {
			image: {
				type: String,
				default() {
					return ''
				}
			}
		},
		methods: {
			// iconClick() {
			// 	this.$emit('iconClick')
			// }
		}
	}
</script>

<style lang="scss">
	.img-wrapper {
		width: 90rpx;
		height: 90rpx;
		position: relative;
		image {
			width: 100%;
			height: 100%;
		}
		icon {
			position: absolute;
			top: -30rpx;
			left: 60rpx;
		}
	}
</style>
