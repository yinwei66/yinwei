<template>
    <div>
        <van-nav-bar title="我的" />
        <section class="userWrap">
                <!-- 头像 -->
            <div class="avatar">
                <img :src="avatarDefault" />
            </div>
            <!-- 昵称和Id -->
            <div class="userInfo">
                <h3>{{userInfo}}</h3>
            </div>
        </section>
        <section class="gridWrap">
            <van-cell-group :border="true">
                <van-cell :border="true" title="个人信息" title-style="text-align:left;" />
                <van-cell :border="true" title="清除缓存" @click="storageClear" title-style="text-align:left;" />
                <van-cell title="修改密码" title-style="text-align:left;" />
            </van-cell-group>
            <div class="submitBox">
                <van-button style="width:100%;" @click="signOut" size="normal" round type="primary">退出登录</van-button>
            </div>
        </section>
        <van-tabbar v-model="active" route>
            <van-tabbar-item>
                <span>社区</span>
                <template slot="icon">
                <img src="@/assets/tabbar/community.png" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item>
                <span>数据分析</span>
                <template slot="icon">
                <img src="@/assets/tabbar/analysis.png" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/home">
                <template slot="icon">
                <img src="@/assets/tabbar/home.png" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/wb">
                <span>服务</span>
                <template slot="icon">
                <img src="@/assets/tabbar/service.png" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item>
                <span>我的</span>
                <template slot="icon">
                    <img src="@/assets/tabbar/mine.png" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
	import {userInfo} from '../../api/user.js'
export default {
    data() {
        return {
            active: '/mine',
            userInfo: {},
            avatarDefault: require('../../assets/avatar.jpg')
        }
    },
    created() {
        userInfo().then(res=>{
			this.userInfo = res.user.userName
			console.log(this.userInfo);
		})
    },
    methods: {
        storageClear() {
            window.localStorage.removeItem('token');
        },
        signOut(){//退出登录
            window.localStorage.clear();
            this.$router.push({path: '/'});
        }
    }
}
</script>

<style lang="scss" scoped>
.userWrap{
        width: calc(100% - 20px);
        margin: 15px auto 0;
        box-sizing: border-box;
        padding: 17px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        .avatar{
            flex: 0 0 80px;
            height: 80px;
            box-sizing: border-box;
            border: 1px #6ee9fb solid;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .userInfo{
            flex: auto;
            padding-left: 20px;
            h3{
                font-size: 14px;
                line-height: 40px;
                color: #333;
                text-align: left;
                span{
                    float: right;
                    padding-right: 10px;
                }
            }
        }
    }
    .gridWrap{
        width: calc(100% - 20px);
        margin: 10px auto 0;
        padding: 30px 0;
        background-color: #fff;

        .van-cell::after{
            border-bottom: 1px #999 solid;
        }

        .submitBox{
            width: calc(100% - 120px);
            margin: 0 auto;
            padding-top: 100px;
        }
    }
</style>