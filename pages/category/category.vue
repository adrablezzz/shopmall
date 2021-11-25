<template>
	<view>
		<scroll-view class="left" scroll-y>
			<view :class="{active: index === currentIndex}" v-for="(item,index) in category" :key="index" @click="cateClick(index)">
				<text>{{item.cat_name}}</text>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y :scroll-top="scrollTop" @scroll="scroll">
			<view class="cates" v-for="(item,index) in category[currentIndex].children" :key="index">
				<view class="cate_title">{{item.cat_name}}</view>
				<view class="content_wrapper">
					<navigator class="cate_content" v-for="(iitem,iindex) in item.children" :key="iindex" :url="'/pages/goods-list/goods-list?cid='+iitem.cat_id">
						<image :src="iitem.cat_icon" mode=""></image>
						<view>{{iitem.cat_name}}</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: [],
				currentIndex: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad() {
			//这里要加入缓存功能 
			//1.获取缓存数据
			const categoryGlobal = uni.getStorageSync("categoryGlobal")
			if(!categoryGlobal) {
				//如果不存在,发送请求
				this.cateRequest()
			}else {
				//如果超时重新发送请求
				if(Date.now()-categoryGlobal.time>1000*300) {
					this.cateRequest()
				}else {
					//使用缓存数据
					this.category = categoryGlobal.data
					// console.log('正在使用缓存数据')
				}
			}
			
		},
		methods: {
			//内部方法
			cateClick(index) {
				this.currentIndex = index
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				})
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			
			//请求分类数据
			async cateRequest() {
				const cate = await this.$request({
					url: '/categories'
				})
				this.category = cate.data.message
				uni.setStorageSync("categoryGlobal", {time: Date.now(), data: this.category})
				// console.log(this.category)
			}
		},
	}
</script>

<style lang="scss">
.left {
	width: 25%;
	border-right: 1px solid #eee;
	height: 100vh;
	view {
		font-size: 35rpx;
		padding: 25rpx;
	}
	.active {
		color: #fff;
		background-color: #FF9999;
	}
}

.right {
	width: 75%;
	height: 100vh;
	position: absolute;
	left: 25%;
	top: 0;
	display: flex;
	flex-flow: wrap;
	.cate_title {
		flex: 1;
		font-size: 40rpx;
		font-weight: 500;
		margin: 10rpx;
	}
	.content_wrapper {
		margin: 40rpx 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-flow: wrap;
		.cate_content {
			width: 180rpx;
			height: 220rpx;

			text-align: center;
			view {
				font-size: 30rpx;
				text-align: center;
			}
			image {
				width: 90%;
				height: 70%;
				// background-color: #eee;
				// border-radius: 10px;
				// padding: 10rpx;
				// box-sizing: border-box;
			}
		}
	}
}
</style>
