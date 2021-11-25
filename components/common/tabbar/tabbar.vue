<template>
	<view class="tabbar-wrapper">
		<view class="tabbar-item" :class="{active: index===currentIndex}" v-for="(item,index) in tabbar" :key="index" @click="tabbarClick(index)">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Tabbar',
		data() {
			return {
				currentIndex: 0
			}
		},
		props:{
			tabbar: {
				type: Array,
				default() {
					return ['标题1','标题2','标题3','标题4']
				}
			}
		},
		methods: {
			tabbarClick(index) {
				this.currentIndex = index
				this.$emit('tabbarClick',index)
			}
		}
	}
</script>

<style lang="scss">
.tabbar-wrapper {
	color: #7D7769;
	height: 80rpx;
	border-bottom: 1px solid #EBECE7;
	font-size: 32rpx;
	display: flex;
	.tabbar-item {
		line-height: 80rpx;
		flex: 1;
		text-align: center;
	}
	.active {
		color: #f00;
		border-bottom: 1px solid #f00;
	}
}
</style>
