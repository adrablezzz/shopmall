<template>
	<view class="bg">
		<view class="search">
			<input :value="value" @input="searchInput" placeholder="请输入你要搜索的商品" ref="aaa"/>
			<button v-show="isShow" @click="cancel" size="mini">清空</button>
		</view>
		<view class="result-list">
			<navigator :url="'../detail/detail?goods_id='+item.goods_id" class="result-item" v-for="(item,index) in goodsList" :key="index">
				{{item.goods_name}}
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				value: '',
				timer: 1,
				isShow: false
			}
		},
		methods: {
			//普通方法
			searchInput(e) {
				const {value} = e.detail
				this.value = value
				if(!value.trim()) {
					this.isShow = false
					this.goodsList = []
					return
				}
				this.isShow = true
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.searchRequest(value)
				},500)
			},
			cancel() {
				// //#ifdef H5
				// this.$refs.aaa.inputValue = ''
				// //#endif
				this.value = ''
				this.goodsList = []
			},
			
			//网络请求
			async searchRequest(query) {
				const res = await this.$request({
					url: '/goods/qsearch',
					data: {query}
				})
				this.goodsList = res.data.message
			}
		}
	}
</script>

<style lang="scss">
.bg {
	background-color: #dedede;
	height: 100vh;
	padding: 20rpx;
}

.search {
	font-size: 34rpx;
	display: flex;
	height: 60rpx;
	input {
		flex: 1;
		background-color: #fff;
		height: 100%;
	}
	button {
		font-size: 24rpx;
		width: 120rpx;
		height: 100%;
		display: flex;
		margin: 0 10rpx;
		justify-content: center;
		align-items: center;
	}
}

.result-list {
	background-color: #fff;
	margin-top: 20rpx;
	font-size: 34rpx;
	.result-item {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 10rpx;
		border-bottom: 2rpx solid #dedede;
	}
}
</style>
