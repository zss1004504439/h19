import request from '@/common/request'

export default {


	//直接传七牛云
	uploadQiniu(data) {

		return new Promise((resolve, reject) => {
			request.post("/qiniu").then(response => {
				const token = response.data.token;
				const domain = response.data.domain;
				// console.log(token);

				data.append("token", token);
				//七牛云单一文件上传必须使用token,file作为key
				request.post("http://up.qiniu.com", data, {
						baseURL: '', //覆盖实现
						headers: {
							"Content-Type": "multipart/form-data"
						}
					})
					.then(function(res) {
						console.log("res", res);

						let postData = new FormData();
						postData.append("storage", "qiniu");
						postData.append("base_url", domain);
						postData.append("path", '/' + res.key);

						request
							.post("/image", postData, {
								headers: {
									"Content-Type": "multipart/form-data"
								}
							})
							.then(response => {
								resolve({
									errno: 0,
									errmsg: "",
									data: {
										base_url: domain,
										path: '/' + res.key
									}
								});
							})
							.catch(error => {
								reject(error);
							});


						// resolve({
						//   errno: 0,
						//   errmsg: "",
						//   data: {
						//     base_url: domain,
						//     path: '/' + res.data.key
						//   }
						// });
					})
					.catch(function(err) {
						console.log("err", err);
						reject(err);
					});
			});
		});
	}
};
