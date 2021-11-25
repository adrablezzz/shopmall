//询问框方法
export const showModel= ({content}={content:"确定删除吗?"}) => {
	return new Promise((resolve,reject) => {
		uni.showModal({
			title: '提示',
			content: content,
			success: res => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

//弹窗方法
export const showToast = ({title}={title:"默认文字"},{mask}={mask:true}) => {
	uni.showToast({
		title:title,
		mask: mask,
		// icon: 'error'
	})
}

//登录方法
export const login = () => {
	return new Promise((resolve,reject) => {
		uni.login({
			timeout:10000,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

//获取用户信息
export const toGetUserInfo = () => {
	return new Promise((resolve,reject) => {
		uni.getUserInfo({
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

//支付方式
export const requestPayment = (pay) => {
	return new Promise((resolve,reject) => {
		uni.requestPayment({
			...pay,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

//时间格式化函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};