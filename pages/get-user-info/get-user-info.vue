<template>
	<view>
		<button class="btn" type="primary" plain open-type="getUserInfo" @getuserinfo="getUserInfo">授权</button>
	</view>
</template>

<script>
	import {login} from '../../common/utils.js'
	export default {

		data() {
			return {
				
			}
		},
		methods: {
			async getUserInfo(e) {
				// const {encryptedData,rawData,iv,signature} = e.detail
				// //2.获取uni.login登录后的code值
				// const {code} = await login()
				// const params = {encryptedData,rawData,iv,signature,code}
				// //3.发送请求token 
				// //没用企业微信号,这里获取不到token值
				// const res = await this.$request({
				// 	url: '/users/wxlogin',
				// 	data: params,
				// 	method: 'post'
				// })
				// //模拟token: 
				// const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				// uni.setStorageSync('token',token)
				// uni.navigateBack({
				// 	delta: 1
				// })
				const{encryptedData,rawData,iv,signature}=e.detail;
				
				const {code}=await login();
				const loginparams={encryptedData,rawData,iv,signature,code}
				    
				const res=await this.$request({url:"/users/wxlogin",data:loginparams,method:"post"});
				// console.log(res);
				const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
				uni.setStorageSync('token', token);
				uni.navigateBack({
				  delta:1
				});
			}
		}
	}
</script>

<style lang="scss">
.btn {
	margin-top: 10rpx;
}
</style>
