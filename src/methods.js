import axios from 'axios'
export default {
    install(Vue,options){
        Vue.prototype.$get=function (url,params,successd) {
            var self = this;
            params.accessToken=this.getCookie('accessToken');
            axios({
                url:url,
                method:'get',
                params:params
            }).then(function(params) {
                if(params.data.code ==0){
                    successd(params.data);
                }else{
                    self.$message.error(params.data.message)
                }
            });
        }
        Vue.prototype.$post=function (url,params,successd) {
            var self = this;
            params.accessToken=this.getCookie('accessToken');
            axios({
                url:url,
                method:'post',
                params:params
            }).then(function(params) {
                if(params.data.code ==0){
                    successd(params.data);
                }else{
                    self.$message.error(params.data.message)
                }
            });
        }
        Vue.prototype.setCookie=function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            // console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            // console.info(document.cookie);
        }
        Vue.prototype.getCookie=function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
        Vue.prototype.clearCookie=function (name) {
            this.setCookie(name, "", -1);
        }
        Vue.prototype.checkCookie=function(){
            var token=this.getCookie('accessToken');
            if(token == ''){
                this.$router.push('/login')
            }
        }
    }
}