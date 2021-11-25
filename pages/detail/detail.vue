<template>
	<view>
		<view class="detail-swiper">
			<swiper autoplay inverval="3000" indicator-dots circular>
				<swiper-item v-for="(item,index) in getBanners" :key="index" @click="preview(index)">
					<image :src="item" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="title">
			<view class="goods-price">
				¥{{goodsDetail.goods_price}}
			</view>
			<view class="goods-name">
				{{goodsDetail.goods_name}}
			</view>
		</view>
		<view class="content">
			<view class="content-title">
				图文详情
			</view>
			<view class="">
				<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
			</view>
		</view>
		<view class="goods-nav">
			<view class="nav-item">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="nav-item">
				<view class="iconfont icon-fenxiang"></view>
				<view>分享</view>
				<button open-type="share"></button>
			</view>
			<view class="nav-item" :class="{isCollect:isCollect}" @click="collect">
				<view class="iconfont icon-shoucang"></view>
				<view>收藏</view>
			</view>
			<view class="add-cart" @click="add2cart">
				加入购物车
			</view>
			<view class="buy-now">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetail: {},
				isCollect: false,
			}
		},
		computed:{
			getBanners() {
				return this.goodsDetail.pics ? this.goodsDetail.pics.map(s=>s.pics_mid) : ''
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const {goods_id} = pages[pages.length-1].options
			this.detailRequest(goods_id)
		},
		methods: {
			//普通方法
			preview(current) {
				uni.previewImage({
					urls: this.getBanners,
					current,
					loop: true,
					indicator: true
				})
			},
			collect() {
				uni.showToast({
					title: this.isCollect ? '取消收藏' : '收藏成功'
				})
				let isCollect =false
				let collected = uni.getStorageSync('collected') || []
				let index = collected.findIndex(s=>s.goods_id === this.goodsDetail.goods_id)
				if(index!==-1) {//之前收藏了,现在移除
					collected.splice(index,1)
					isCollect = false
				}else {//之前没收藏,现在添加
					collected.push(this.goodsDetail)
					isCollect = true
				}
				uni.setStorageSync('collected',collected)
				this.isCollect = isCollect
				console.log(isCollect)
				
			},
			add2cart() {
				// uni.showToast({
				// 	title: this.cart.goods_num===0 ? '已添加新商品' : '商品数量+1'
				// })
				//1.获取缓存数据
				const cart = uni.getStorageSync('cart') || []
				let flag
				//1.判断数据为不为空
				let index = cart.findIndex(s => s.goods_id===this.goodsDetail.goods_id)
				if(index===-1) {
					//数据不存在
					this.goodsDetail.goods_num = 1
					this.goodsDetail.is_checked = true
					cart.push(this.goodsDetail)
					flag = false
				}else {
					//数据存在
					cart[index].goods_num++
					flag = true
				}
				uni.setStorageSync('cart',cart)
				uni.showToast({
					title: flag ? '商品数量+1' : '添加了新商品',
					mask: true
				})
			},
			
			//网络请求
			async detailRequest(goods_id) {
				const detail = await this.$request({
					url: '/goods/detail',
					data: {goods_id}
				})
				const goodsDetail = detail.data.message
				const collected = uni.getStorageSync('collected') || []
				const isCollect = collected.some(s=>s.goods_id === goodsDetail.goods_id)
				this.goodsDetail = goodsDetail
				this.isCollect = isCollect
				console.log(isCollect)
			}
		},
	}
</script>

<style lang="scss">
@import url('../../static/font/font.css');
	
.detail-swiper {
	swiper {
		height: 600rpx;
		text-align: center;
		swiper-item {
			image {
				height: 600rpx;
				width: 100%;
			}
		}
	}
}

.title {
	padding: 10rpx;
	border-bottom: 6px solid #eee;
	.goods-price {
		&:first-letter {
			margin: 0 15rpx;
		}
		font-size: 50rpx;
		font-weight: 700;
		color: #ff3333;
	}
	.goods-name {
		font-size: 35rpx;
		color: #666
	}
}

.content {
	padding: 0 10rpx;
	.content-title {
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 20rpx;
		font-size: 40rpx;
		font-weight: 700;
		color: #ff6666;
	}
}

.goods-nav {
	box-shadow: 0 -1px 1px rgba(0,0,0,0.1);
	height: 90rpx;
	background-color: #fff;
	font-size: 30rpx;
	position: sticky;
	bottom: 0;
	display: flex;
	.nav-item {
		flex: 1;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		position: relative;
		button {
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
	.add-cart {
		flex: 2;
		color: #fff;
		background-color: #F6A600;
		text-align: center;
		line-height: 90rpx;
	}
	.buy-now {
		flex: 2;
		color: #fff;
		background-color: #E64551;
		text-align: center;
		line-height: 90rpx;
	}
	.icon {
		width: 48rpx;
		height: 48rpx;
		background-color: #bfa;
	}
}

.isCollect {
	color: red;
}
</style>
