import * as Three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 创建一个场景
const scene = new Three.Scene()

// 创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0,0,10)
scene.add(camera)



// 导入纹理
const textureLoader = new Three.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')

console.log(doorColorTexture, 'door')

// 纹理属性
// doorColorTexture.offset.x = 0.5
// doorColorTexture.offset.set(0.5, 0.5)
// doorColorTexture.center.set(0.5, 0.5)
// doorColorTexture.rotation = Math.PI / 4
doorColorTexture.repeat.set(2, 3)// 水平、竖直重复次数

// // 重复模式
doorColorTexture.wrapS = Three.MirroredRepeatWrapping
doorColorTexture.wrapT = Three.RepeatWrapping

// 添加物体
const cubeGeometry = new Three.BoxBufferGeometry(2,2,2)
const basicMaterial = new Three.MeshBasicMaterial({
  color: '#ffff00',
  map: doorColorTexture
})
const cube = new Three.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)


// 初始化渲染器
const renderer = new Three.WebGLRenderer()
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼， 让控制器更有真实性, 必须在动画循环里调用update
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new Three.AxesHelper(5)
scene.add(axesHelper)

function render(){
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