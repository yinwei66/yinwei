<template>
	<div id="">
		<van-nav-bar title="维保服务" right-text="维保历史" @click-right="ls"></van-nav-bar>
		<div style="font-size: 20px;text-align: left;margin: 10px;">
			车主服务
		</div>
		<div style="width: 95vw;height: 15vh;margin: 0 auto;display: flex;justify-content: space-around;" >
			<div style="width: 45%;height: 100%;margin: 0 auto;border: 1px solid rgba(0,0,0,.3);border-radius: 10px;"@click="wb">
				<img src="../assets/service/appoint.png" style="width: 30%;margin:  0 auto;margin-top: 5vw;" >
				<div style="font-size: 15px;">维保预约</div>
			</div>
			<div style="width: 45%;height: 100%;margin: 0 auto;border: 1px solid rgba(0,0,0,.3);border-radius: 10px;" @click="ls">
				<img src="../assets/service/history.png" style="width: 30%;margin:  0 auto;margin-top: 5vw;" >
				<div style="font-size: 15px;">维保历史</div>
			</div>
		</div>
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
export default {
    data(){
        return {
            active:'/wb'
        }
    },
    created() {
        
    },
    methods: {
		ls(){
			this.$router.push('/wbls')
		},
		wb(){
			this.$router.push('/wbyy')
		}
       }
}	
</script>

<style>
</style>
