<template>
	<view>
		<view class="top">
			<view class="address-info" v-if="addressInfo">
				<view class="user-info">
					<text>收货人: {{addressInfo.userName}}</text>
					<text>{{addressInfo.telNumber}}</text>
				</view>
				<view class="address">{{addressInfo.provinceName+addressInfo.cityName+addressInfo.countyName+addressInfo.detailInfo}}</view>
			</view>
			<view class="add-address" v-else>
				<button @click="getAddress" type="primary" plain>添加收货地址</button>
			</view>
		</view>
		<view class="mid" v-if="cart.length!==0">
			<view class="goods-list" v-for="(item,index) in cart" :key="index">
				<view class="goods-check">
					<checkbox-group name="iCheck">
							<checkbox :checked="item.is_checked" @click="checkClick(index)"/>
					</checkbox-group>
				</view>
				<view class="goods-img-wrapper">
					<image class="goods-img" :src="item.goods_small_logo" mode="aspectFill"></image>
				</view>
				<view class="goods-info">
					<view class="goods-name">{{item.goods_name}}</view>
					<view class="goods-price">
						<text class="price">¥{{item.goods_price}}</text>
						<view class="goods-num">
							<view class="edit" @click="subNum(index)">-</view>
							<view class="num">{{item.goods_num}}</view>
							<view class="edit" @click="addNum(index)">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-goods" v-else>
			你的购物车空的,快去选购吧!
		</view>
		<view class="tool">
			<checkbox-group name="all-check" class="all-check">
				<checkbox :checked="isAllChecked" @click="allCheckClick"/>
			</checkbox-group>
			<view class="total">
				合计: <text class="total-price">¥ {{totalPrice ||0}}</text>
			</view>
			<view class="settle" @click="settle">
				<text>结算</text><text v-if="cartLength!==0">({{cartLength}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {showModel, showToast} from '../../common/utils.js'
	export default {
		data() {
			return {
				addressInfo: null,
				cart: null
			}
		},
		computed: {
			isAllChecked() {
				if(this.cart) {
					if(this.cart.length===0) return false
					return !this.cart.find(s => !s.is_checked)
				}
			},
			totalPrice() {
				if(this.cart) {
					return this.cart.filter(s => s.is_checked===true).reduce((preValue,item) => {
						return preValue + item.goods_price * item.goods_num
					},0)
				}
			},
			cartLength() {
				if(this.cart) {
					return this.cart.filter(s=>s.is_checked).length
				}else return 0
			}
		},
		onShow() {
			this.addressInfo = uni.getStorageSync('address') || null
			this.cart = uni.getStorageSync('cart')
		},
		methods: {
			//普通方法
			checkClick(index) {
				this.cart[index].is_checked = !this.cart[index].is_checked
				uni.setStorageSync('cart',this.cart)
			},
			allCheckClick() {
				if(this.isAllChecked) {
					this.cart.forEach(s => s.is_checked = false)
				}else {
					this.cart.forEach(s => s.is_checked = true)
				}
			},
			addNum(index) {
				this.cart[index].goods_num++
				uni.setStorageSync('cart',this.cart)
			},
			subNum(index) {
				if(this.cart[index].goods_num>1) {
					this.cart[index].goods_num--
					uni.setStorageSync('cart',this.cart)
				}else {
					showModel({content:'要删除该商品吗?'}).then(res=>{
						if(res.confirm) {
							this.cart.splice(index,1)
							uni.setStorageSync('cart',this.cart)
						}
					})
				}
			},
			settle() {
				//1.选择地址
				if(!this.addressInfo) {
					showToast({title:'请选择收货地址'})
				}else if(this.cartLength===0) {
					//2.选择商品
					showToast({title:'请选择你的商品'})
				}else {
					//3.跳转到支付页面
					uni.navigateTo({
						url: '../pay/pay'
					})
					const checkedCart = this.cart.filter(s=>s.is_checked)
					uni.setStorageSync('checkedCart',checkedCart)
				}
			},
			
			//获取缓存数据
			getAddress() {
				uni.chooseAddress({
					success: res => {
						this.addressInfo = res
						uni.setStorageSync('address',res)
					}
				})
			}
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

.no-goods {
	color: #666;
	font-size: 52rpx;
	display: flex;
	height: 80vw;
	justify-content: center;
	align-items: center;
}

.tool {
	background-color: #eee;
	font-size: 30rpx;
	width: 100%;
	height: 80rpx;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	.all-check {
		flex: 1;
		margin-left: 20rpx;
	}
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
		height: 80rpx;
		line-height: 80rpx;
	}
}
</style>
