<template>
	<view>
		<search class="search"></search>
		<view class="goods-list none">
			<navigator class="goods-item" v-for="(item,index) in goodsList" :key="index" :url="'../detail/detail?goods_id='+item.goods_id">
				<view class="img-wrapper">
					<image :src="item.goods_small_logo || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg&refer=http%3A%2F%2Fphoto.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639552148&t=aba80fcb7e85a71f4fe6f03bfa438b27'" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="name">{{item.goods_name}}</view>
					<view class="price">¥{{item.goods_price}}</view>
				</view>
			</navigator>
		</view>
		<view class="no-data" v-if="isShow">
			------------这是我的底线------------
		</view>
	</view>
</template>

<script>
	import Search from '../../components/common/search/search'
	export default {
		components: {Search},
		data() {
			return {
				goodsList: [],
				totalPages: 0,
				isShow: false,
				params: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				}
			}
		},
		onLoad(options) {
			this.params.cid = options.cid || ''
			this.params.query = options.query || ''
			this.goodsListRequest()
		},
		onPullDownRefresh() {
			this.goodsList = []
			this.params.pagenum = 1
			setTimeout(() => {
				this.goodsListRequest(() => {
					uni.stopPullDownRefresh()
				})
			},300)
		},
		onReachBottom() {
			if(this.totalPages>this.params.pagenum) {
				this.params.pagenum++
				this.goodsListRequest()
			}else {
				this.isShow = true
			}
		},
		methods: {
			async goodsListRequest(callBack) {
				const goodsDetail = await this.$request({
					url: '/goods/search',
					data: this.params
				})
				this.totalPages = Math.ceil(goodsDetail.data.message.total/this.params.pagesize)
				this.goodsList = [...this.goodsList,...goodsDetail.data.message.goods]
				callBack && callBack()
			}
		},
		
	}
</script>

<style lang="scss">
.search {
	position: fixed;
	top:0;
	width: 100%;
	z-index: 99;
}

.goods-list {
	margin-top: 80rpx;
	.goods-item {
		display: flex;
		border-bottom: 1px solid #eee;
		.img-wrapper {
			width: 250rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {

			}
		}
		.info {
			display: flex;
			flex-flow: column;
			justify-content: space-around;
			margin-left: 20rpx;
			.name {
				// width: 500rpx;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
				
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.price {
				color: #ff3333
			}
		}
	}
}

.no-data {
	font-size: 32rpx;
	color: #666;
	text-align: center;
	padding: 10rpx 0;
}
</style>
