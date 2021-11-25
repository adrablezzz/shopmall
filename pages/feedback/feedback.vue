<template>
	<view>
		<tabbar :tabbar="tabbar"></tabbar>
		<view class="fd-wrapper">
			<view class="fd-category">
				<view class="fd-title">问题的种类</view>
				<view class="fd-choice">
					<text v-for="(item,index) in fbChoice" :key="index" @click="fbChoose(index)" :class="{active: item.isActive}">{{item.content}}</text>
				</view>
			</view>
			<view class="fd-content">
				<textarea placeholder="请描述您的问题" @input="textInput"/>
				<view class="fd-tool">
					<button size="mini" @click="chooseImg">+</button>
					<view class="img-wrapper" v-for="(item,index) in image" :key="index" @click.stop="removeClick(index)">
						<upload-img :image="item"></upload-img>
					</view>
				</view>
			</view>
			<button class="submit" type="warn" size="mini" @click="submit">
				<icon type="success_no_circle" color="#fff"></icon>
				<text>提交</text>
			</button>
		</view>
	</view>
</template>

<script>
	import Tabbar from '../../components/common/tabbar/tabbar'
	import UploadImg from '../../components/common/upload-img/upload-img.vue'
	export default {
		components: {
			Tabbar,
			UploadImg
		},
		data() {
			return {
				tabbar: ['体验问题','商品、商家投诉'],
				image: [],
				text: '',
				fbChoice: [
					{id:0,content:'功能建议',isActive:false},
					{id:1,content:'购买遇到问题',isActive:false},
					{id:2,content:'性能问题',isActive:false},
					{id:3,content:'其他',isActive:false},
				],
				uploadedImgs: []
			}
		},
		methods: {
			//问题种类选择
			fbChoose(index) {
				this.fbChoice[index].isActive = !this.fbChoice[index].isActive
			},
			//文本编辑
			textInput(e) {
				const text = e.detail.value
				if(!text.trim()) {
					uni.showToast({
						title: '请输入有效内容',
						mask: true,
						icon: 'none'
					})
					return
				}else {
					this.text = text
				}
			},
			//选择图片
			chooseImg() {
				uni.chooseImage({
					success: res => {
						const image = res.tempFilePaths
						this.image = [...this.image,...image]
					}
				})
			},
			//删除图片
			removeClick(index) {
				this.image.splice(index,1)
			},
			//提交按钮
			submit() {
				//问题的种类
				let fbChoice = []
				this.fbChoice.filter(s => s.isActive).forEach(v=>{
					fbChoice.push(v.content)
				})
				//问题 this.text
				const text = this.text
				//图片
				const image = this.image
				//如果没选问题的种类,返回
				if(!fbChoice) {
					uni.showToast({
						title: '请选择问题的种类',
						mask: true,
						icon: 'none'
					})
					return 
				}else if(!text.trim()){
					//如果没写问题,返回
					uni.showToast({
						title: '请描述问题',
						mask: true,
						icon: 'none',
					})
					return
				}else if(!image){
					//展示加载弹窗
					uni.showLoading({
						title: "正在上传中",
						mask: true
					})
					//没选图片,可以提交
					console.log('没选图片但可以提交')
				}else {
					//正常提交
					console.log('都选了,问题的种类和问题描述已提交')
					//显示加载弹窗
					uni.showLoading({
						title: "正在上传中",
						mask: true
					})
					//上传图片
					image.forEach((v,i)=>{
						console.log(v)
						uni.uploadFile({
							url: 'http://img.coolcr.cn/api/upload',
							filePath: v,
							name: 'image',
							success: (res) => {
								let {url} = JSON.parse(res.data).data
								this.uploadedImgs.push(url)
								console.log(this.uploadedImgs)
							}
						})
					})
				}
				//关闭弹窗,返回上一个页面
				uni.hideLoading()
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
.fd-wrapper {
	color: #666;
	background-color: #eee;
	padding: 14rpx;
	height: 100vh;
	.fd-category {
		.fd-title {
			font-size: 30rpx;
		}
		.fd-choice {
			font-size: 28rpx;
			margin: 20rpx;
			display: flex;
			justify-content: flex-start;
			flex-flow: wrap;
			text {
				width: 210rpx;
				text-align: center;
				line-height: 60rpx;
				background-color: #fff;
				margin: 10rpx;
			}
			.active {
				color: #fff;
				background-color: #ff3333;
			}
		}
	}
	.fd-content {
		background-color: #fff;
		font-size: 28rpx;
		padding: 1rpx;
		textarea {
			padding: 10rpx;
		}
		.fd-tool {
			display: flex;
			flex-flow: wrap;
			align-items: center;
			button {
				width: 90rpx;
				height: 90rpx;
				margin: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.img-wrapper {
				margin: 8rpx;
			}
		}
	}
	.submit {
		height: 80rpx;
		width: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		margin-right: 0;
	}
}
</style>
