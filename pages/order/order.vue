<template>
	<view>
		<view class="tabbar-wrapper">
			<view class="tabbar-item" :class="{active: index===type-1}" v-for="(item,index) in tabbar" :key="index" @click="tabbarClick(index)">
				{{item}}
			</view>
		</view>
		<view class="order-list">
			<view class="order-item" v-for="(item,index) in orders" :key="index">
				<view class="row">
					<text>订单编号</text>
					<text>{{item.order_number}}</text>
				</view>
				<view class="row">
					<text>订单价格</text>
					<text class="price">¥{{item.order_price}}</text>
				</view>
				<view class="row">
					<text>订单日期</text>
					<text>{{item.update_time_cn}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '../../common/utils.js'
	export default {
		data() {
			return {
				tabbar: ['全部','代付款','待发货','退款/退货'],
				orders: [],
				type: 1
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const {type} = pages[pages.length-1].options
			this.type = type
			
			const token = uni.getStorageSync('token')
			if(!token) {
				uni.navigateTo({
					url:'../get-user-info/get-user-info'
				})
			}
			this.orderRequest(1)
		},
		methods: {
			//普通方法
			tabbarClick(index) {
				this.type = index+1
				this.orderRequest(index+1)
			},
			
			//网络请求
			async orderRequest(type) {
				const resOrder = await this.$request({
					url: '/my/orders/all',
					data: {type}
				})
				const orders = resOrder.data.message.orders
				this.orders = orders.map(v=>({...v,update_time_cn: formatDate(new Date(v.update_time*1000),'yyyy-MM-dd hh:mm:ss')}))
				console.log(this.orders)
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
.order-list {
	font-size: 32rpx;
	color: #7D7769;
	.order-item {
		height: 200rpx;
		border-bottom: 1px solid #EBECE7;
		display: flex;
		flex-flow: column;
		justify-content: space-evenly;
		padding: 0 20rpx;
		.row {
			display: flex;
			justify-content: space-between;
			.price {
				color: #f00;
			}
		}
	}
}
</style>
