<template>
    <div class="login">
        <section class="loginWrap">
            <div class="loginHead">
                <h2>车主App</h2>
            </div>
            <div class="loginContent">
                <div class="account">
                    <input v-model="account" type="number" placeholder="账号" />
                </div>
                <div class="password">
                    <input v-model="password" type="password" placeholder="密码" />
                </div>
                <van-button size="large" round type="primary" @click="dl">登 录</van-button>
            </div>
        </section>
    </div>
</template>

<script>
	import {userLogin} from '../api/user.js'
export default {
    name: 'login',
    data(){
        return {
            account: '15666666666',
            password: '123456'
        }
    },
    created() {
        
    },
    methods: {
        dl(){
			userLogin({
				"username":this.account,
				"password":this.password
			}).then(res=>{
				if(res.code==200){
					window.localStorage.setItem("token",res.token)
					this.$router.push('/mine')
				}
			})
		}
    }
}
</script>

<style scoped lang="scss">
.login{
    width: 100%;
    height: 100vh;
    background: url('../assets/login.jpg') no-repeat;
    background-size: cover;
    position: relative;
    background-color: #f2f2f2;
    .loginWrap{
        width: calc(100% - 75px);
        overflow: hidden;
        background: rgba(255,255,255,0.3);
        border-radius: 10px;
        position: absolute;
        left: 37.5px; top: 47%;
        transform: translateY(-50%);
        padding-bottom: 25px;
        .loginHead{
            width: 176px;
            margin: 14px auto;
            h2{
                font-size: 22px;
                line-height: 44px;
            }
        }
        .loginContent{
            width: calc(100% - 57px);
            margin: 0 auto;
            .account,.password{
                width: 100%;
                height: 42px;
                background-color: #f9f9f9;
                border: 1px #e6e6e6 solid; 
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 20px;
                input{
                    width: 100%;
                    border: none;
                    background: no-repeat;
                    font-size: 14px;
                    line-height: 42px;
                    color: #666;
                    text-indent: 1.5em;
                    vertical-align: top;
                    &::placeholder{
                        color: #999;
                    }
                }
            }
            .password{
                margin-bottom: 30px;
            }
            .van-button--large{
                height: 42px;
                line-height: 42px;
            }
            .toForget,.toRegist{
                border: none;
                background: no-repeat;
                margin-top: 30px;
                outline: none;
                font-size: 14px;
                line-height: 16px;
                color: #1989fa;
                text-align: center;
            }
            .toForget{
                margin: 10px 0;
                float: right;
            }
        }
    }
}
</style>