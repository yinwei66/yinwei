<template>
	<div id="">
		<van-nav-bar title="数据分析"></van-nav-bar>
		<div style="" id="one" style="width: 100vw;height: 30vh;">
			
		</div>
		
		
		<van-tabbar v-model="active" route>
			<van-tabbar-item>
				<span>社区</span>
				<template slot="icon">
					<img src="@/assets/tabbar/community.png" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/sjfx">
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
		import * as echarts from 'echarts';
export default {
   
    data(){
        return {
        active:"/sjfx"
        }
    },
    created() {
        
    },
    methods: {
       
    },
	mounted() {	
		var chartDom = document.getElementById('one');
		var myChart = echarts.init(chartDom);
		var option;
		
		option = {
		  xAxis: {
		    type: 'category',
		    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		  },
		  legend:{
			  data:['耗电量',"行驶里程","平均百公里耗电量"],
			  bottom:0
		  },
		  yAxis: {
		    type: 'value'
		  },
		  series: [
		    {
		      data: [120, 200, 150, 80, 70, 110, 130],
		      type: 'bar',
			  label:{
				  show:true,
				  position:"top"
			  },
			  name:'耗电量'
		    },
			{
			  data: [120, 200, 150, 80, 70, 110, 130],
			  type: 'bar',
			  label:{
				  show:true,
				  position:"top"
			  },
			  name:"行驶里程"
			},
			{
			  data: [120, 200, 150, 80, 70, 110, 130],
			  type: 'bar',
			  label:{
				  show:true,
				  position:"top"
			  },
			  name:"平均百公里耗电量"
			}
		  ]
		};
		
		option && myChart.setOption(option);
	}
}
</script>

<style>
</style>
