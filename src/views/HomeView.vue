<template>
	<div>
		<van-nav-bar title="首页"></van-nav-bar>
		<div style="width: 90vw;height: 5vh;margin: 0 auto;font-size: 15px;">
			<div>当前电量：{{use.dumpEnergy}}度</div>
			<div>剩余续航里程：{{use.enduranceMileage}}km</div>
		</div>
		<van-loading size="30px" color="#00aaff" v-if="pdsj">加载中...</van-loading>
		<div id="ap" @click="gb"></div>
		
		<div style="width: 95vw;height: 13vh;border: 1px solid rgba(0,0,0,.3);display: flex;justify-content: space-around;margin: 0 auto;border-radius: 10px;">
			<div style="font-size: 18px;">
				<img src="../assets/closeWindow.png" style="width: 80%;" >
				<div>车窗管理</div>
			</div>
			<div style="font-size: 18px;">
				<img src="../assets/locked.png" style="width: 80%;" >
				<div>车门上锁</div>
			</div>
			<div style="font-size: 18px;">
				<img src="../assets/locked_act.png" style="width: 80%;" >
				<div>车门解锁</div>
			</div>
			<div style="font-size: 18px;">
				<img src="../assets/closeTrunk.png" style="width: 65%;" >
				<div>后备箱管理</div>
			</div>
		</div>
		<div id="" style="width: 95vw;height: 18vh;display: flex;justify-content: space-around;margin: 0 auto;margin-top: 2vh;">
			<div id="" style="width: 45%;height: 80%;border: 1px solid rgba(0,0,0,.3);border-radius: 10px;" @click="$router.push('/yjqd')">
				<img src="../assets/closeIcon.png" style="width: 40%;" >
				<div id="" style="font-size: 18px;">
					一键解锁
				</div>
			</div>
			<div id="" style="width: 45%;height: 80%;border: 1px solid rgba(0,0,0,.3);border-radius: 10px;" >
				<img src="../assets/service/appoint.png" style="width: 38%;" >
				<div id="" style="font-size: 18px;">
					车辆维保
				</div>
			</div>
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
	import * as THREE from 'three';
	import {
		userInfo,
		carsj
	} from '../api/user.js'
	import {
		GLTFLoader
	} from 'three/examples/jsm/loaders/GLTFLoader.js'
	import {
		DRACOLoader
	} from 'three/examples/jsm/loaders/DRACOLoader.js'
	import {
		OrbitControls
	} from 'three/examples/jsm/controls/OrbitControls.js'
	export default {
		name: 'home',
		data() {
			return {
				active: '/home',
				carid: 0,
				use: [],
				glbs: [{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_EXT_d.glb'
					},
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_INT_d.glb'
					},
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_Sunproof_d.glb'
					},
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_Trunk_d.glb',
						name: 'hg'
					}, //后盖
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_Tires_d.glb'
					},
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_LBDoor_d.glb',
						name: 'zuohou'
					}, //左后车门
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_LFDoor_d.glb',
						name: 'zuoqian'
					}, //左前车门
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_RFDoor_d.glb',
						name: 'youqian'
					}, //右前车门
					{
						path: 'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/data/lynkco09/model/Lynkco09_RBDoor_d.glb',
						name: 'youhou'
					} //右后车门
				],
				zuoqian: {},
				zuohuo: {},
				youqian: {},
				youhou: {},
				hg: {},
				pd:false,
				pdsj:true

			}
		},
		methods:{
			gb(){
				this.pd = !this.pd
				if(this.pd){
					this.hg.rotateX(Math.PI/4)
					this.hg.position.set(0,-0.6,-1.2)
					this.zuoqian.rotateY(-Math.PI/3)
					this.zuoqian.position.set(1,0,-0.2)
					this.zuohou.rotateY(-Math.PI/3)
					this.zuohou.position.set(0.2,0,-0.7)
					this.youqian.rotateY(Math.PI/3)
					this.youqian.position.set(-1,0,-0.2)
					this.youhou.rotateY(Math.PI/3)
					this.youhou.position.set(-0.2,0,-0.7)
				}else{
					this.hg.rotateX(-Math.PI/4)
					this.hg.position.set(0,0,0)
					this.zuoqian.rotateY(Math.PI/3)
					this.zuoqian.position.set(0,0,0)
					this.zuohou.rotateY(Math.PI/3)
					this.zuohou.position.set(0,0,0)
					this.youqian.rotateY(-Math.PI/3)
					this.youqian.position.set(0,0,0)
					this.youhou.rotateY(-Math.PI/3)
					this.youhou.position.set(0,0,0)
				}
			}
		},
		created() {
			userInfo().then(res => {
				console.log(res);
				this.carid = res.cars[1].carId
				console.log(this.carid);
			})
			carsj(1).then(res => {
				console.log(res);
				this.use = res.data
				console.log(this.use);
			})

		},
		mounted() {
			const camera = new THREE.PerspectiveCamera(70, window.innerWidth / (window.innerHeight / 3), 0.01, 10);
			camera.position.set(2, 2, 3);

			const scene = new THREE.Scene();

			const renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.setSize(window.innerWidth, (window.innerHeight / 3));
			renderer.setClearColor("#ffffff")
			document.getElementById('ap').appendChild(renderer.domElement);

			const render = () => {
				renderer.render(scene, camera)
				controls && controls.update()
				requestAnimationFrame(render)
			}
			// animation
			const controls = new OrbitControls(camera, renderer.domElement)
			controls.update()
			render()
			const loader = new GLTFLoader()
			const dracoloader = new DRACOLoader().setDecoderPath(
				'http://124.93.196.45:10001/dev-api/profile/avatar/2023/12/23/static/draco/')
			loader.setDRACOLoader(dracoloader)
			for (let i = 0; i < this.glbs.length; i++) {
				loader.load(this.glbs[i].path, (gltf) => {
					if (this.glbs[i].name == 'zuoqian') {
						this.zuoqian = gltf.scene
					}
					if (this.glbs[i].name == 'youqian') {
						this.youqian = gltf.scene
					}
					if (this.glbs[i].name == 'zuohou') {
						this.zuohou = gltf.scene
					}
					if (this.glbs[i].name == 'youhou') {
						this.youhou = gltf.scene
					}
					if (this.glbs[i].name == 'hg') {
						this.hg = gltf.scene
					}
					scene.add(gltf.scene)
					this.pdsj = false
				})
			}
			const cd = new THREE.DirectionalLight("0xffffff", 2)
			scene.add(cd)
		}
	};
</script>

<style>

</style>
