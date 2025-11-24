<template>
	<div id="">
		<van-nav-bar title="维保预约" right-text="维保历史" @click-right="ls" @click-left="fh" :left-arrow="true"></van-nav-bar>
		<van-form>
			<van-field label="维保类型">
				<template #input>
					<van-radio-group v-model="item.type" direction="horizontal">
						<van-radio name="0">常规保养</van-radio>
						<van-radio name="1">车辆维修</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field label="城市" placeholder="请选择城市" readonly="" required="" v-model="cs" @click="cspd=true">
			</van-field>
			<van-popup v-model="cspd" round="" position="bottom">
				<van-area :area-list="areaList" :columns-num="2" @confirm="cssj" @cancel="cspd=false" title="选择城市">
				</van-area>
			</van-popup>
			<van-field label="维保服务站（4S 店）" placeholder="请选择维保服务站（4S 店）" readonly="" required=""
				v-model="item.maintenanceServiceStationName" @click="wbfwzpd=true"></van-field>
			<van-popup v-model="wbfwzpd" round="" position="bottom">
				<van-picker :columns="wbfwz" v-if="csid!=''" value-key="serviceStationName" show-toolbar=""
					@confirm="wbfwzs" @cancel="wbfwzpd=false">

				</van-picker>
			</van-popup>
			<van-field label="预约日期" placeholder="请选择预约日期" readonly="" required="" v-model="item.appointDateStr"
				@click="rqpd=true"></van-field>
			<van-popup v-model="rqpd" round="" position="bottom">
				<van-datetime-picker type="date" :max-date="max" :min-date="min" v-model="dq" @confirm="rqsj"
					@cancel="rqpd=false"></van-datetime-picker>
			</van-popup>
			<van-field label="预约时间" placeholder="请选择预约时间" readonly="" required="" v-model="item.appointTimeStr"
				@click="sjpd=true"></van-field>
			<van-popup v-model="sjpd" round="" position="bottom">
				<van-datetime-picker type="time" v-model="sj" :max-hour="22" :min-hour="8" @cancel="sjpd=false"
					@confirm="sjsj">

				</van-datetime-picker>
			</van-popup>
			<van-field label="维保车辆" placeholder="请选择维保车辆" readonly="" required="" v-model="carname" @click="carpd=true">
			</van-field>
			<van-popup v-model="carpd" round="" position="bottom">
				<van-picker :columns="car" value-key="licenseTag" show-toolbar="" @cancel="carpd=false"
					@confirm="carnr"></van-picker>
			</van-popup>
			<van-field label="车牌" placeholder="请选择车牌" readonly="" required="" v-model="cp"></van-field>
			<van-field label="联系人姓名" placeholder="请选择联系人姓名" required="" v-model="item.customerName"></van-field>
			<van-field label="联系电话" placeholder="请选择联系电话" required="" v-model="item.customerPhone"></van-field>
		</van-form>
		<div v-show="item.type=='1'">
			<div style="margin: 0 auto;">维修方案</div>
			<table cellspacing="0" border="" style="margin: 0 auto;">
				<tr style="font-size: 15px;">
					<td>序号</td>
					<td>更换零件</td>
					<td>维修类目</td>
					<td>单项价格</td>
					<td>维修总价</td>
					<td>维修周期</td>
				</tr>
				<tr style="font-size: 15px;" v-for="(item,index) in wxwd">
					<td>{{index+1}}</td>
					<td>{{item.replacementPart}}</td>
					<td>{{item.category}}</td>
					<td>{{item.unitPrice}}元</td>
					<td>{{item.totalPrice}}元</td>
					<td>{{item.duration}}天</td>
				</tr>
				<tr>
					<td colspan="6">总价为：{{item.planList[0].totalPrice}}元</td>
				</tr>
			</table>
			<canvas id="hb" width="300px" height="200px"
				style="margin: 0 auto;margin-top: 2vh;border: 1px solid;"></canvas>
			<van-button type="info"
				style="width: 95vw;height: 6vh;border-radius: 10px;margin-top: 2vh;margin-bottom: 2vh;" @click="zf">立即支付
			</van-button>
		</div>
		<van-button type="info" v-if="item.type=='0'"
			style="width: 95vw;height: 6vh;border-radius: 10px;margin-top: 2vh;margin-bottom: 2vh;" @click="zf">立即支付
		</van-button>

		<van-popup closeable="" round="" v-model="djzf" position="bottom">
			<div style="width: 99vw;height: 30vh;">
				<div style="margin-top: 2vh;">支付</div>
				<div style="font-size: 15px;margin-top: 2vh;">支付单号：{{cfsj.paymentId}}</div>
				<div style="font-size: 15px;margin-top: 2vh;">支付金额：{{cfsj.paymentAmount}}元</div>
				<van-button type="info" style="width: 45vw;height: 6vh;margin-top: 2vh;border-radius: 10px;"
					@click="zfcg">支付</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		areaList
	} from '@vant/area-data'
	import {
		wbfwz,
		car,
		sjhq,zf,wbxz,xg
	} from '../api/user.js'
	export default {

		data() {
			return {
				cs: "",
				cspd: false,
				areaList,
				csid: "",
				carpd: false,
				carname: '',
				car: [],
				wbfwz: [],
				cp: '',
				wbfwzpd: false,
				max: new Date(2028, 4, 18),
				min: new Date(2025, 4, 19),
				dq: new Date(2025, 4, 19),
				rqpd: false,
				sjpd: false,
				sj: "8:00",
				item: {
					"type": "0",
					"maintenanceServiceStationId": 1,
					"maintenanceServiceStationName": "北京中升丰田汽车销售服务有限公司",
					"maintenanceTime": "2024-03-21 16:02:52",
					"deliveryTime": "2024-03-21 16:02:52",
					"appointTime": "2024-03-21 16:02:52",
					"carId": 34,
					"customerName": "张三",
					"customerPhone": "1566666666",
					"customerSignature": null,
					"appointDateStr": "",
					"appointTimeStr": "",
					"planList": [{
						"totalPrice": 0
					}]
				},
				wxwd: [],
				zfpd: false,
				djzf: false,
				cfsj:[]
			}
		},
		mounted() {
			const hb = document.getElementById('hb')
			const hbn = hb.getContext('2d')
			let pd = false

			hb.addEventListener("touchstart", e => {
				e.preventDefault()
				this.zfpd = true
				pd = true

				let lz = e.targetTouches[0]
				let x = lz.pageX - hb.offsetLeft
				let y = lz.pageY - hb.offsetTop
				hbn.moveTo(x, y)
				hbn.beginPath()
			})
			hb.addEventListener("touchmove", e => {
				if (pd) {
					e.preventDefault()

					let lz = e.targetTouches[0]
					let x = lz.pageX - hb.offsetLeft
					let y = lz.pageY - hb.offsetTop
					hbn.stroke()
					hbn.lineTo(x, y)
				}

			})
			hb.addEventListener("touchend", e => {
				e.preventDefault()
				pd = false
			})
		},
		created() {
			car().then(res => {
				console.log(res);
				this.car = res.rows
				console.log(this.car);
			})
		},
		methods: {
			zf() {
				
				if (this.item.type == '0') {
					if (this.item.carId != 34 && this.item.appointDateStr != '') {
					wbxz(this.item).then(res=>{
						console.log(res);
						if(res.code ==200){
							this.djzf = true
							this.cfsj = res.data
							console.log(res);
						}
					})
					}else{
						this.$toast("请填写必填项！")
					}
				}else{
					if(this.zfpd==false){
						this.$toast("请签名后再提交！")
						}
						else{
						if (this.item.carId != 34 && this.item.appointDateStr != '') {
						 wbxz(this.item).then(res=>{
							console.log(res);
							if(res.code ==200){
								this.djzf = true
								this.cfsj = res.data
								console.log(res);
							}
						})
						}else{
							this.$toast("请填写必填项！")
						}
					}
					
				}
			},
			zfcg(){
				zf({
					"maintenanceAppointmentId": this.cfsj.id,
					    "price": this.cfsj.paymentAmount,
					    "status": 1
				}).then(res=>{
					console.log(res);
					if(res.code==200){
						this.$toast("支付成功，1秒后返回首页！")
						xg({
							"id": this.cfsj.id,
							"status":1	
						}).then(res=>{
							console.log('32',res);
						})
						setTimeout(()=>{
							this.$router.push('/wb')
						},1000)
					}
				})
			},
			carnr(value) {
				this.carname = value.carName
				this.item.carId = value.carId
				this.cp = value.licenseTag
				this.carpd = false
				sjhq().then(res => {
					console.log(res);
					this.wxwd = res.data
					for (var i = 0; i < this.wxwd.length; i++) {
						this.item.planList[0].totalPrice += this.wxwd[i].totalPrice
					}
				})

			},
			sjsj(value) {
				this.item.appointTimeStr = value
				console.log(value);
				this.sjpd = false
			},
			rqsj(value) {
				this.item.appointDateStr = `${value.getFullYear()}` + '-' + `${value.getMonth()+1}` + '-' +
					`${value.getDate()}`
				this.rqpd = false
				console.log(this.item.appointDateStr);
			},
			wbfwzs(value) {
				if (value != null) {
					this.item.maintenanceServiceStationName = value.serviceStationName
				} else {
					this.wbfwzpd = false
				}
			},
			cssj(value) {
				this.cs = value[0].name
				this.csid = value[0].code
				this.cspd = false
				wbfwz({
					"cityId": this.csid
				}).then(res => {
					console.log(res);
					// this.wbfwz = res.data
				})
			},
			ls() {
				this.$router.push('/wbls')
			},
			fh() {
				this.$router.push('/wb')
			}
		}
	}
</script>

<style>

</style>
