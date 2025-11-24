<template>
	<div id="">
		<van-nav-bar title="一键启动" :left-arrow="true"  @click-left="fh"></van-nav-bar>
		<div style="width: 100vw;height: 80vh;">
			<img :src="tpsj" style="width: 100vw;height: 90vh;">
		</div>
		<van-tabbar route>
			<van-tabbar-item @click="one">
				<span>启动</span>
				<template slot="icon">
					<img src="@/assets/tabbar/home.png" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item @click="two">
				<span>仪表盘</span>
				<template slot="icon">
					<img src="@/assets/tabbar/community.png" />
				</template>
			</van-tabbar-item>
	
		
			<van-tabbar-item @click="three">
				<span>主屏</span>
				<template slot="icon">
					<img src="@/assets/tabbar/service.png" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item @click="fo">
				<span>副屏</span>
				<template slot="icon">
					<img src="@/assets/tabbar/mine.png" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import {userInfo,xgzt,clzt} from '../api/user.js'
export default {

    data(){
        return {
           carid:0,
		   carzt:1,
		   active:"",
		   pdone:false,
		   pdtwo:false,
		   pdthree:false,
		   tpsj:require('@/assets/car.png')
        }
    },
    created() {
        userInfo().then(res=>{
			console.log(res);
			this.carid = res.cars[0].carId
			console.log(this.carid);
			clzt(this.carid).then(res=>{
				console.log(res);
				this.carzt =res.data.carState
			})
			
		})
    },
    methods: {
       fh(){
		   this.$router.push('/home')
	   },
	   one(){
		   if(this.carzt==3){
			   this.$notify({
				   type:"warning",
				   message:"该车辆已开启！"
			   })
		   }else{
			   xgzt({
				   carId:this.carid,
				   "carState": 3
			   }).then(res=>{
				   if(res.code==200){
					   this.tpsj = require('@/assets/carFiring.png')
					   this.carzt = 3
				   this.$notify({
					   type:"success",
					   message:"车辆开启成功！"
				   })
				   }
			   })
		   }
	   },
	   two(){
		   if(this.carzt==1){
			   this.$notify({
				   type:"warning",
				   message:"车辆已离线请检查网络！"
			   })
		   }else{
			   this.pdone = !this.pdone
			   if(this.pdone){
				   this.$notify({
					   type:"success",
					   message:"仪表盘已唤醒！"
				   })
			   }else{
				   this.$notify({
					   type:"warning",
					   message:"仪表盘已关闭！"
				   })
			   }
		   }
	   },
	   three(){
		   if(this.carzt==1){
		   			   this.$notify({
		   				   type:"warning",
		   				   message:"车辆已离线请检查网络！"
		   			   })
		   }else{
		   			   this.pdtwo = !this.pdtwo
		   			   if(this.pdtwo){
		   				   this.$notify({
		   					   type:"success",
		   					   message:"主屏已唤醒！"
		   				   })
		   			   }else{
		   				   this.$notify({
		   					   type:"warning",
		   					   message:"主屏已关闭！"
		   				   })
		   			   }
		   }
	   },
	   fo(){
		  if(this.carzt==1){
		  			   this.$notify({
		  				   type:"warning",
		  				   message:"车辆已离线请检查网络！"
		  			   })
		  }else{
		  			   this.pdthree= !this.pdthree
		  			   if(this.pdthree){
		  				   this.$notify({
		  					   type:"success",
		  					   message:"副屏已唤醒！"
		  				   })
		  			   }else{
		  				   this.$notify({
		  					   type:"warning",
		  					   message:"副屏已关闭！"
		  				   })
		  			   }
		  } 
	   }
    }
}	
</script>

<style>
</style>
