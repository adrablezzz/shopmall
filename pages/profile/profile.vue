<template>
	<view class="profile">
		<view class="user-info-wrapper">
			<view class="login" v-if="!userInfo.nickName">
				<button type="primary" plain size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			</view>
			<view class="user-info" v-else>
				<image class="bg-img" :src="userInfo.avatarUrl" mode="aspectFill"></image>
				<view class="user-info">
					<view class="user-info-inner">
						<view class="icon">
							<image :src="userInfo.avatarUrl" mode=""></image>
						</view>
						<view class="user-name">{{userInfo.nickName}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="row1">
				<view class="item">
					<text class="item-num">0</text>
					<text>收藏的店铺</text>
				</view>
				<navigator class="item" url="../collected/collected">
					<text class="item-num">{{collected.length || 0}}</text>
					<text>收藏的商品</text>
				</navigator>
				<view class="item">
					<text class="item-num">0</text>
					<text>关注的商品</text>
				</view>
				<view class="item">
					<text class="item-num">0</text>
					<text>我的足迹</text>
				</view>
			</view>
			<view class="row2">
				<view class="title">我的订单</view>
				<view class="item-wrapper">
					<navigator url="../order/order?type=1" class="item">
						<view class="iconfont icon-dingdan"></view>
						<view class="">全部订单</view>
					</navigator>
					<navigator url="../order/order?type=2" class="item">
						<view class="iconfont icon-dingdandaifukuan"></view>
						<view class="">待付款</view>
					</navigator>
					<navigator url="../order/order?type=3" class="item">
						<view class="iconfont icon-daishouhuo"></view>
						<view class="">待收货</view>
					</navigator>
					<navigator url="../order/order?type=4" class="item">
						<view class="iconfont icon-tuikuan"></view>
						<view class="">退款/退货</view>
					</navigator>
				</view>
			</view>
			<view class="row3">
				<text>收货地址管理</text>
			</view>
			<view class="row4">
				<view class="item contact">
					<text>联系客服</text>
					<text>400-618-4000</text>
				</view>
				<navigator url="../feedback/feedback" class="item">
					<text>意见反馈</text>
				</navigator>
				<view class="item">
					<text>关于我们</text>
				</view>
			</view>
			<view class="row5">
				<text>把应用推荐给其他人</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				collected: []
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.collected = uni.getStorageSync('collected') || []
		},
		methods: {
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				this.userInfo = userInfo
				uni.setStorageSync('userInfo',userInfo)
			}
		}
	}
</script>

<style lang="scss">
@import url('../../static/font/font.css');
.profile {
	background-color: #EBECE7;
}
.user-info-wrapper {
	position: relative;
	z-index: 10;
	height: 65vw;
	.login {
		height: 65vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bg-img {
		height: 65vw;
		filter: blur(2px);
		position: absolute;
		z-index: -10;
	}
	.user-info {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.user-info-inner {
			text-align: center;
			.icon {
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}
			.user-name {
				color: #fff;
				margin: 20rpx 0;
			}
		}
	}
}

.main {
	color: #7D7769;
	font-size: 32rpx;
	position: relative;
	z-index: 10;
	top: -50rpx;
	margin: 0 30rpx;
	.row1 {
		background-color: #fff;
		margin-bottom: 20rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		.item {
			flex: 1;
			height: 120rpx;
			box-sizing: border-box;
			text-align: center;
			padding-top: 10rpx;
			text {
				text-align: center;
				display: block;
			}
			.item-num {
				color: #f00;
			}
		}
	}
	.row2 {
		background-color: #fff;
		.title {
			font-size: 34rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 20rpx;
			border-bottom: 1px #EBECE7 solid;
		}
		.item-wrapper {
			font-size: 32rpx;
			height: 100rpx;
			display: flex;
			.item {
				flex: 1;
				height: 100rpx;
				box-sizing: border-box;
				text-align: center;
				padding-top: 10rpx;
				.iconfont {
					color: #f00;
				}
			}
		}
	}
	.row3 {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		margin: 20rpx 0;
		text {
			margin-left: 20rpx;
		}
	}
	.row4 {
		.item {
			height: 80rpx;
			line-height: 80rpx;
			background-color: #fff;
			border-bottom: 5rpx solid #EBECE7;
			text {
				margin-left: 20rpx;
			}
		}
		.contact {
			display: flex;
			justify-content: space-between;
			text {
				margin: 0 20rpx;
			}
		}
	}
	.row5 {
		background-color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20rpx;
	}
}
</style>
