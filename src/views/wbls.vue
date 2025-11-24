<template>
	<div>
		<van-nav-bar title="维保历史" @click-left="$router.push('/wb')" :left-arrow="true"></van-nav-bar>
		<div style="width: 98vw;height: 20vh;margin: 0 auto;">
			<img src="../assets/service/hisBanner.png" style="width: 100%;margin: 0 auto;" />
		</div>
		<div style="display: flex;justify-content: space-around;font-size: 19px;margin-top: 3vh;">
			<div>维保历史记录条数：{{tata}}</div>
			<div>历史列表</div>
		</div>
		<van-loading size="40px" color="#00aaff" v-if="jz">加载中...</van-loading>
		<div v-for="(item,index) in sysj" v-if="item.payment!=null"
			style="width: 90vw;font-size: 15px;padding-left: 10px;padding-right: 10px; height: 25vh;border-radius: 10px; border: 1px solid;margin: 0 auto;margin-top: 2vh;display: flex;justify-content: space-around;flex-direction: column;">
			<div style="display: flex;justify-content: space-between;">
				<div>工单号</div>
				<div>{{item.workNo}}</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>维保类型</div>
				<div v-if="item.type=='0'">常规保养</div>
				<div v-if="item.type=='1'">车辆维修</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>维保日期</div>
				<div>{{item.appointTime}}</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>送修时间</div>
				<div>{{item.deliveryTime}}</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>维保费用</div>
				<div v-if="item.payment.price!=null">{{item.payment.price}}元</div>
				<div v-if="item.payment.price==null">0元</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div>维保状态</div>
				<div v-if="item.status=='0'">待支付</div>
				<div v-if="item.status=='1'">待维保</div>
				<div v-if="item.status=='2'">已完成</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		hqxqs
	} from '../api/user.js'
	export default {

		data() {
			return {
				tata: 0,
				sysj: [],
				jz: true
			}
		},
		created() {
			hqxqs({
				pageSize: 16668,
				pageNum: 1
			}).then(res => {
				this.tata = res.total
				this.sysj = res.rows
				console.log(res);
				this.jz = false
			})
		},
		methods: {

		}
	}
</script>

<style>
</style>
