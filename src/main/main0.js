// 基本内容
import * as Three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'
import * as dat from 'dat.gui'

// 创建一个场景
const scene = new Three.Scene()

// 创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0,0,10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new Three.BoxGeometry(1,1,1)
const cubeMaterial = new Three.MeshBasicMaterial({color: 0xffff00})

// 根据几何体和材质创建物体
const cube = new Three.Mesh(cubeGeometry, cubeMaterial)

// 修改物体的位置
// cube.position.set(1,1,1)
// cube.position.x = 3
// 缩放
cube.scale.set(3,2,1)// x,y,z
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, 'XZY')

// 将几何体添加到场景
scene.add(cube)
console.log(cube, 'cube')

// gui
const gui = new dat.GUI()
gui.add(cube.position, 'y').min(0).max(5).step(0.01).name('移动y轴').onChange(value => {
  console.log('值被修改')
}).onFinishChange(val => {
  console.log('完全停下来')
})

// 修改物体颜色
const params = {
  color: '#ffff00',
  fn: () => {
    gsap.to(cube.position, {y: 5, duration: 2, yoyo: true, repeat: -1})
  }
}
gui.addColor(params, 'color').onChange(val => {
  cube.material.color.set(val)
})
// 设置选项框
gui.add(cube, 'visible').name('是否显示')

// 设置文件夹
var folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe').name('设置线框')
folder.add(params, 'fn').name('立方体运动')

// 初始化渲染器
const renderer = new Three.WebGLRenderer()
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染

// renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼， 让控制器更有真实性, 必须在动画循环里调用update
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new Three.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new Three.Clock()

// 设置动画
var animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5, // 秒数
  ease: 'power1.inOut',
  repeat: -1,
  yoyo: true,
  delay: 2,
  onComplete: () =>{
    console.log('动画完成')
  },
  onStart: () => {
    console.log('动画开始')
  }
})

gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 5, ease: 'power1.inOut'})

window.addEventListener('dblclick', () => {
  // if(animate1.isActive()) {
  //   animate1.pause()
  // } else {
  //   animate1.resume()
  // }
  const fullScreenElement = document.fullscreenElement
  if(!fullScreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

function render(){
  // cube.position.x += 0.01
  // cube.rotation.x += 0.01
  // if(cube.position.x > 5) {
  //   cube.position.x = 0
  // }
  // 获取时钟运行总时长
  // let time = clock.getElapsedTime()
  // let deltaTime = clock.getDelta()
  // console.log('总时长', time)
  // console.log('间隔时长', deltaTime)
  // let t = (time / 1000) % 5
  // cube.position.x = t * 1
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 监听画面变化
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateWorldMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
