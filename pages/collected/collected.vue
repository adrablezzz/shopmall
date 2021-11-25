<template>
	<view>
		<tabbar :tabbar="tabbar" @tabbarClick="tabbarClick"/>
		<view class="goods-list">
			<navigator v-if="currentIndex===0" class="goods-item" v-for="(item,index) in collected" :key="index" :url="'../detail/detail?goods_id='+item.goods_id">
				<view class="img-wrapper">
					<image :src="item.goods_small_logo || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.16pic.com%2F00%2F20%2F02%2F16pic_2002642_b.jpg&refer=http%3A%2F%2Fphoto.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639552148&t=aba80fcb7e85a71f4fe6f03bfa438b27'" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="name">{{item.goods_name}}</view>
					<view class="price">¥{{item.goods_price}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import Tabbar from '../../components/common/tabbar/tabbar'
	export default {
		components:{
			Tabbar
		},
		data() {
			return {
				tabbar: ['商品收藏','品牌收藏','店铺收藏','浏览足迹'],
				currentIndex: 0,
				collected: []
			}
		},
		onShow() {
			this.collected = uni.getStorageSync('collected')
			console.log(this.collected)
		},
		methods: {
			tabbarClick(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
.goods-list {
	// margin-top: 80rpx;
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

</style>
