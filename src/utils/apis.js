import axios from 'axios'
import VueCookie from 'vue-cookie'

var api_service = {
    base_url: "",
    thumbnail_root: "/uploads/thumbnail/",
    video_root: "/uploads/video/",
    avatar_root: "/uploads/avatar/",
    apiAxiosInstance: null,
    init(){
        const csrfCookie = VueCookie.get('csrftoken');
        if (!csrfCookie)
            this.setUpCsrf();

        const axiosInstance = axios.create({
            withCredentials: true
        });
        axiosInstance.interceptors.request.use(config => {
            const token = VueCookie.get('csrftoken')
            if (token) {
                config.headers['X-CSRFToken'] = token
            } else {
                console.log(document.cookie);
            }
            return config
        }, function (error) {
            return Promise.reject(error)
        })
        axiosInstance.interceptors.response.use(response => {
            return response.data
        }, function (error) {
            console.log(error)
            try {
                let response = error.response
                return response.data
            } catch (e) {
                console.error(e);
            }
            return Promise.reject(error)
        })
        this.apiAxiosInstance = axiosInstance;
    },
    setUpCsrf: function () {
        let login_url =  "/auth/get-csrf-token/"
        return axios.get(this.base_url + login_url);
    },
    call_login: function (store, username, password) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let login_url =  "/auth/login/"

        let data = {
            username: username,
            password: password,
        }
        return this.apiAxiosInstance.post(this.base_url + login_url, JSON.stringify(data));
    },
    call_get_self(store) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let get_self_user_id_url = "/user/get-current/";
        let _this = this;
        return this.apiAxiosInstance.post(this.base_url + get_self_user_id_url)
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res.avatar_address = _this.base_url + _this.avatar_root + res.avatar_address;
                return res;
            });
    },
    do_update_info: function (store) {
        let _this = this;
        return this.call_get_self(store)
            .then((res) => {
                store.commit('update_user_id', res['user_id']);
                store.commit('login', res);
            })
            .catch((err) => {
                console.log(err);
                store.commit('logout');
            })
    },
    call_logout: function (store) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let logout_url = "/auth/logout/"
        return this.apiAxiosInstance.post(this.base_url + logout_url).then(() => {store.commit('logout')});
    },
    call_search_video: function(store, keyword) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video/search/"
        let data = {
            key : keyword
        };
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + url, {params : data})
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res['videos'].forEach((item) => {
                    item.thumbnail_address = _this.base_url + _this.thumbnail_root + item.thumbnail_address;
                    item.video_address = _this.base_url + _this.video_root + item.video_address;
                })
                return res['videos'];
            });
    },
    call_get_video: function(store, video_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let video_get_url = "/video/get/"
        let data = {
            video_id: video_id,
        };
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + video_get_url, {params : data})
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res.thumbnail_address = _this.base_url + _this.thumbnail_root + res.thumbnail_address;
                res.video_address = _this.base_url + _this.video_root + res.video_address;
                return res;
            });
    },
    call_get_all_videos: function (store) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let user_video_get_url = "/video/get-all/"
        const videos_key = 'videos';
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + user_video_get_url)
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res[videos_key].forEach((item) => {
                    item.thumbnail_address = _this.base_url + _this.thumbnail_root + item.thumbnail_address;
                    item.video_address = _this.base_url + _this.video_root + item.video_address;
                })
                return res[videos_key];
            });
    },
    call_get_user_video: function (store, user_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let user_video_get_url = "/video/get-by-user/"
        let data = {
            user_id: user_id,
        };
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + user_video_get_url, {params : data})
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res['videos'].forEach((item) => {
                    item.thumbnail_address = _this.base_url + _this.thumbnail_root + item.thumbnail_address;
                    item.video_address = _this.base_url + _this.video_root + item.video_address;
                })
                return res['videos'];
            });
    },
    call_get_video_by_type: function (store, video_type_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let user_video_get_url = "/video/get-by-type/"
        let data = {
            video_type_id: Number(video_type_id),
        };
        const videos_key = 'videos';
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + user_video_get_url, {params : data})
            .then((res) => {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res[videos_key].forEach((item) => {
                    item.thumbnail_address = _this.base_url + _this.thumbnail_root + item.thumbnail_address;
                    item.video_address = _this.base_url + _this.video_root + item.video_address;
                })
                return res[videos_key];
            });
    },
    call_get_user_info: function (store, user_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let user_info_get_url = "/user/get/";

        let data = {
            user_id: user_id,
        }
        let _this = this;
        return this.apiAxiosInstance.get(this.base_url + user_info_get_url, {params: data})
            .then((res) =>
            {
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                res.avatar_address = _this.base_url + _this.avatar_root + res.avatar_address;
                return res;
            });
    },
    call_create_comment: function(store, video_id, content) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let create_comment_url = "/comment/create/";
        let data = {
            comment_video: Number(video_id),
            content
        };
        return this.apiAxiosInstance.post(this.base_url + create_comment_url, data);
    },
    call_del_comment: function(store, comment_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let del_comment_url = "/comment/delete/";

        let data = {
            comment_id
        };
        return this.apiAxiosInstance.post(this.base_url + del_comment_url, JSON.stringify(data));
    },
    call_update_comment: function(store, comment_id, content) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let update_comment_url = "/comment/update/";
        let data = {
            comment_id,
            content
        };
        return this.apiAxiosInstance.post(this.base_url + update_comment_url, JSON.stringify(data));
    },
    call_get_video_comments: function(store, video_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let get_comment_url = "/comment/get-by-video/";
        let data = {
            video_id: video_id,
        };
        return this.apiAxiosInstance.get(this.base_url + get_comment_url, { params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_get_comments_by_user: function(store, user_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let get_comment_url = "/comment/get-by-user/";
        let data = {
            user_id: Number(user_id),
        };
        return this.apiAxiosInstance.get(this.base_url + get_comment_url, { params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_register_user(store, username, nickname, password, email, sign, birthday, gender, avatar_file, privilege) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let register_url = "/user/create/";
        let formData = new FormData();
        let body = {
            username,
            nickname,
            password,
            email,
            sign,
            birthday,
            gender,
            privilege
        }
        formData.append('avatar', avatar_file);
        formData.append('body', JSON.stringify(body));
        console.log(formData);
        return this.apiAxiosInstance.post(this.base_url + register_url, formData)
            .then((res)=>{
                console.log(res);
                return res;
            });
    },
    call_update_user_info(store, username, nickname, sign, birthday, gender, avatar_file) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let update_url = "/user/update/";
        let formData = new FormData();
        let body = {
            username,
            nickname,
            sign,
            birthday,
            gender,
            update_avatar: Boolean(avatar_file),
        }

        for (let key in body) {
            if (body[key] === store.state.user[key]) {
                delete body[key];
            }
        }

        if (body.update_avatar) {
            formData.append('avatar', avatar_file);
        }
        formData.append('body', JSON.stringify(body));
        console.log(formData);
        return this.apiAxiosInstance.post(this.base_url + update_url, formData)
            .then((res)=>{
                console.log(res);
                return res;
            });
    },
    call_upload_video(store, video_title, introduction, video_type_id, videoPrice, video, thumbnail) {
        video_type_id = video_type_id.toString();
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let upload_url = "/video/create/";
        let formData = new FormData();
        let body = {
            video_title,
            introduction,
            video_type_id: Number(video_type_id),
            price: videoPrice,
        }
        formData.append('video', video);
        formData.append('thumbnail', thumbnail);
        formData.append('body', JSON.stringify(body));
        console.log(formData);
        return this.apiAxiosInstance.post(this.base_url + upload_url, formData)
            .then((res)=>{
                console.log(res);
                return res;
            });
    },
    call_update_video(store, video_id, video_title, introduction, video_type_id, videoPrice, video, thumbnail, oldVideoInfo) {
        video_type_id = video_type_id.toString();
        if (!this.apiAxiosInstance) {
            this.init();
        }
        console.log(oldVideoInfo)
        let url = "/video/update/";
        let formData = new FormData();
        let body = {
            video_id,
            video_title,
            introduction,
            video_type_id: Number(video_type_id),
            price: videoPrice,
            update_video: false,
            update_thumbnail: false,
        }

        for (let key in body) {
            if (body[key] === oldVideoInfo[key] && key !== "video_id") {
                delete body[key];
            }
        }
        if (video) {
            formData.append('video', video);
            body.update_video = true;
        }
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
            body.update_thumbnail = true;
        }
        formData.append('body', JSON.stringify(body));
        console.log(formData);
        return this.apiAxiosInstance.post(this.base_url + url, formData)
            .then((res)=>{
                console.log(res);
                return res;
            });
    },
    call_delete_video(store, video_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video/delete/";
        let data = {
            video_id: Number(video_id),
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_create_video_types(store, type, description) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video-type/create/";
        let data = {
            type,
            description
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_update_video_types(store, video_type_id, description) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video-type/update/";
        let data = {
            video_type_id,
            description
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_delete_video_types(store, video_type_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video-type/delete/";
        video_type_id = Number(video_type_id);
        let data = {
            video_type_id,
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_get_video_types(store) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video-type/get-all/";
        let video_type_key = "video_types";
        return this.apiAxiosInstance.get(this.base_url + url)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res[video_type_key];
            });
    },
    call_get_video_type_by_id(store, video_type_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/video-type/get-by-id/";
        video_type_id = Number(video_type_id);
        let data = {
            video_type_id,
        }
        return this.apiAxiosInstance.get(this.base_url + url, {params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_create_post(store, content) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/post/create/";
        let data = {
            content
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_update_post(store, post_id, content) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/post/update/";
        let data = {
            post_id,
            content
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_get_posts_by_user(store, user_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/post/get-by-user/";
        let data = {
            user_id
        }
        const postsKey = 'posts'
        return this.apiAxiosInstance.get(this.base_url + url, {params:data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res[postsKey];
            });
    },
    call_delete_post(store, post_id, content) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/post/delete/";
        let data = {
            post_id
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_create_new_payment(store, payment_type, video_id, payment_token) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/payment/create/";
        let data = {
            payment_type,
            video_id,
            payment_token
        }
        return this.apiAxiosInstance.post(this.base_url + url, data)
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_get_payment(store, payment_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/payment/get/";
        let data = {
            payment_id
        }
        return this.apiAxiosInstance.get(this.base_url + url, {params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res;
            });
    },
    call_get_payments_by_user(store, user_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/payment/get-by-user/";
        let data = {
            user_id: Number(user_id)
        }
        const paymentsKey = 'payments'
        return this.apiAxiosInstance.get(this.base_url + url, {params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res[paymentsKey];
            });
    },
    call_get_payments_by_video(store, video_id) {
        if (!this.apiAxiosInstance) {
            this.init();
        }
        let url = "/payment/get-by-video/";
        let data = {
            video_id: Number(video_id)
        }
        const paymentsKey = 'payments'
        return this.apiAxiosInstance.get(this.base_url + url, {params: data})
            .then((res)=>{
                if ('code' in res && res['code'] !== 0) {
                    return Promise.reject(res);
                }
                return res[paymentsKey];
            });
    }
}

export default api_service