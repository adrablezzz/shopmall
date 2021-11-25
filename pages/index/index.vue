<template>
	<view>
		<search class="search"></search>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular class="banner">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<navigator :url="'/pages/detail/detail?'+item.navigator_url.match(/(?<=\?).+/)[0]">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="navigator">
			<view class="nav-item" v-for="(item,index) in navs" :key="index">
				<navigator url="/pages/category/category" open-type="switchTab">
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</view>
		</view>
		<view class="goods-info">
			<view class="goods-title" :class="{title_active: index === currentIndex}" @click="titleClick(index)" v-for="(item,index) in goodsInfo" :key="index">
				<!-- <image :src="item.floor_title.image_src"></image> -->
				<view>{{item.floor_title.name}}</view>
			</view>
		</view>
		<view class="goods-content">
			<view class="product" v-for="(item,index) in goodsInfo[currentIndex].product_list" :key="index">
				<navigator :url="'/pages/goods-list/goods-list?'+item.navigator_url.match(/(?<=\?).+/)[0]">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import Search from '../../components/common/search/search'
	export default {
		components: {
			Search
		},
		data() {
			return {
				banners: [],
				navs: [],
				goodsInfo: [],
				currentIndex: 0
			}
		},
		onLoad() {
			this.homeRequest()
		},
		methods: {
			//基本方法
			titleClick(index) {
				this.currentIndex = index;
			},
			
			//请求首页数据
			async homeRequest() {
				// this.$request({
				// 	url: '/home/multidata'
				// }).then(res => {
				// 	console.log(res)
				// })
				//请求轮播图
				const ban = await this.$request({
					url: '/home/swiperdata'
				})
				this.banners = ban.data.message
				//请求导航
				const nav = await this.$request({
					url: '/home/catitems'
				})
				this.navs = nav.data.message
				//请求商品大类标题图片
				const goodsInfo = await this.$request({
					url: '/home/floordata'
				})
				this.goodsInfo = goodsInfo.data.message
			},
		}
	}
</script>

<style lang="scss">
.search {
	position: fixed;
	top:0;
	width: 100%;
	z-index: 99;
}
	
	.banner {
		margin-top: 80rpx;
		image{
			width: 100%;
			height: 400rpx;
		}
	}
	
	.navigator {
		display: flex;
		padding: 50rpx 0;
		box-shadow: 0 1px 1px rgba(0,0,0,0.08); 
		.nav-item {
			flex: 1;
			text-align: center;
			image {
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
	
	.goods-info {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 80rpx;
		.goods-title {
			text-align: center;
			line-height: 80rpx;
			font-size: 35rpx;
			color: #666;
		}
		.title_active {
			color: #ff5777;
			view {
				border-bottom: 1px solid #ff5777;
			}
		}
	}

	.goods-content {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: wrap;
		.product {
			width: 49%;
			margin-left: 5rpx;
			image {
				width: 360rpx;
			}
		}
	}
</style>
