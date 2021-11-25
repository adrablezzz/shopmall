<template>
	<view>
		<view class="top">
			<view class="address-info" v-if="addressInfo">
				<view class="user-info">
					<text>收货人: {{addressInfo.userName}}</text>
					<text>{{addressInfo.telNumber}}</text>
				</view>
				<view class="address">{{address}}</view>
			</view>
		</view>
		<view class="mid">
			<view class="goods-list" v-for="(item,index) in checkedCart" :key="index">
				<view class="goods-img-wrapper">
					<image class="goods-img" :src="item.goods_small_logo" mode="aspectFill"></image>
				</view>
				<view class="goods-info">
					<view class="goods-name">{{item.goods_name}}</view>
					<view class="goods-price">
						<text class="price">¥{{item.goods_price}}</text>
						<view class="goods-num">
							<view class="num">× {{item.goods_num}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bot">
			<view class="tool">
				<view class="total">
					合计: <text class="total-price">¥ {{totalPrice}}</text>
				</view>
				<view class="settle">
					<view @click="toPay">支付</view>
					<!-- <button v-if="flag" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {showToast, requestPayment} from '../../common/utils.js'
	export default {
		data() {
			return {
				addressInfo: null,
				checkedCart: [],
				userInfo: null,
				flag: true
			}
		},
		computed: {
			totalPrice() {
				if(this.checkedCart) {
					return this.checkedCart.reduce((preValue,item) => {
						return preValue + item.goods_price * item.goods_num
					},0)
				}
			},
			address() {
				if(this.addressInfo) {
					return this.addressInfo.provinceName+this.addressInfo.cityName+this.addressInfo.countyName+this.addressInfo.detailInfo
				}
			}
		},
		onShow() {
			this.addressInfo = uni.getStorageSync('address')
			this.checkedCart = uni.getStorageSync('checkedCart')
		},
		methods: {
			async toPay() {
				try{
					//1.判断缓存中有没有token值
					const token = uni.getStorageSync('token')
					if(!token) {
						//如果不存在token,跳转到授权页面
						uni.navigateTo({
							url: '../get-user-info/get-user-info'
						})
					}else {
						//如果缓存中存在token,则获取token创建订单
						//1.获取订单编号
						//准备请求头
						// const header = {Authorization: token}
						//准备请求体
						const order_price = this.totalPrice
						const consignee_addr = this.address
						const goods = []
						this.checkedCart.forEach(s => goods.push({
							goods_id: s.goods_id,
							goods_number: s.goods_num,
							goods_price: s.goods_price
						}))
						//整合请求体
						const body = {order_price, consignee_addr,goods}
						//发起请求 请求订单编号
						const resOrderNumber = await this.$request({
							url: '/my/orders/create',
							data: body,
							method: 'POST'
						})
						//token过期,这里无法获取订单编号,可以模拟一个订单编号
						const {order_number} = resOrderNumber.data.message
						//发起预支付接口
						const resToPay = await this.$request({
							url: '/my/orders/req_unifiedorder',
							method: 'POST',
							data: {order_number}
						})
						const {pay} = resToPay.data.message
						
						// // 这段注释掉,模拟支付成功
						// //发起支付
						// await requestPayment(pay)
						// //查询支付状态
						// const orderStatus = await this.$request({
						// 	url: '/my/orders/chkOrder',
						// 	method: 'POST',
						// 	data: {order_number}
						// })
						
						await showToast({title: '支付成功'})
						//支付成功跳转到订单页面
						uni.navigateTo({
							url: '../order/order'
						})
						//移除支付了的商品
						let newCart = uni.getStorageSync('cart')
						newCart = newCart.filter(s=>!s.is_checked)
						uni.setStorageSync('cart',newCart)
						console.log(newCart)
					}
				}catch(e){
					showToast({title: '支付失败'})
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="scss">
.top {
	margin-top: 5rpx;
}
.address-info {
	font-size: 30rpx;
	padding: 30rpx 20rpx;
	border-bottom: 1px solid #eee;
	.user-info {
		display: flex;
		justify-content: space-between;
	}
}
	
.add-address {
	button {
		font-size: 34rpx;
	}
}

.goods-list {
	height: 200rpx;
	font-size: 30rpx;
	border-bottom: 1px solid #eee;
	display: flex;
	.goods-check {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goods-img-wrapper {
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 80%;
			height: 80%;
		}
	}
	.goods-info {
		flex: 4;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-right: 15rpx;
		.goods-name {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.goods-price {
			display: flex;
			justify-content: space-between;
			.price {
				color: #f00;
			}
			.goods-num {
				display: flex;
				.edit {
					border: 1px solid #eee;
					width: 55rpx;
					height: 55rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.num {
					width: 55rpx;
					height: 55rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}

.tool {
	background-color: #fff;
	font-size: 30rpx;
	width: 100%;
	height: 80rpx;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	.total {
		flex: 3;
		text-align: right;
		margin-right: 20rpx;
		.total-price {
			color: #f00;
			font-size: 34rpx;
			margin-left: 10rpx;
		}
	}
	.settle {
		color: #fff;
		flex: 1;
		text-align: center;
		background-color: #f00;
		line-height: 80rpx;
		position: relative;
		display: flex;
		justify-content: center;
		// button {
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 100%;
		// 	top: 0;
		// 	left: 0;
		// }
	}
}
</style>
