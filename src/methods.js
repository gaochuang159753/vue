import axios from 'axios'
import util from './js/util.js'
export default {
    install(Vue,options){
        Vue.prototype.$get=function (url,params,successd) {
            var self = this;
            params.accessToken=this.getCookie('accessToken');
            axios({
                url:util.testUrl+url,
                method:'get',
                params:params
            }).then(function(params) {
                if(params.data.code ==0){
                    successd(params.data);
                }else if(params.data.code==50003||params.data.code==50007||params.data.code==50005){
                    self.$router.push('/login/2');
                }else if(params.data.code==50008){
                    self.$router.push('/index/1');
                }else{
                    self.$message.error(params.data.message)
                }
            });
        }
        Vue.prototype.$post=function (url,params,successd) {
            var self = this;
            params.accessToken=this.getCookie('accessToken');
            axios({
                url:util.testUrl+url,
                method:'post',
                params:params
            }).then(function(params) {
                if(params.data.code ==0){
                    successd(params.data);
                }else{
                    if(params.data.code ==0){
                        successd(params.data);
                    }else if(params.data.code==50003||params.data.code==50007||params.data.code==50005){
                        self.$router.push('/login/2');
                    }else if(params.data.code==50008){
                        self.$router.push('/index/1');
                    }else{
                        self.$message.error(params.data.message)
                    }
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
        Vue.prototype.$date = function (date,type) {
            if (date == "" || date == null) {
              return;
            } else {
              var d = new Date(date);
              var newdate = "";
              if (type == "month") {
                newdate = d.getFullYear()+"-" + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1));
              } else if(type=="time"){
                newdate = d.getFullYear() + '-'
                + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) + '-'
                + (d.getDate() > 9 ? d.getDate() : "0" + (d.getDate()))
                +" "+(d.getHours()>9?d.getHours():"0"+d.getHours())+":"
                +(d.getMinutes()>9?d.getMinutes():"0"+d.getMinutes())+":"
                +(d.getSeconds()>9?d.getMinutes():"0"+d.getMinutes());
              }else {
                newdate = d.getFullYear() + '-'
                + (d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) + '-'
                + (d.getDate() > 9 ? d.getDate() : "0" + (d.getDate()));
              }
              return newdate
            }
          }
    }
}