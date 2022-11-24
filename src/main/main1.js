import * as Three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 创建一个场景
const scene = new Three.Scene()

// 创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0,0,10)
scene.add(camera)

// 添加物体
// 创建几何体

for(let i = 0; i < 50; i++) {
  const geometry = new Three.BufferGeometry()
  const vertices = new Float32Array(9)
  for(let j = 0; j < 9; j++) {
    vertices[j] = Math.random() * 10 - 5
  }
  geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3))
  let color = new Three.Color(Math.random(),Math.random(), Math.random())
  const material = new Three.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5
  })

  const mesh = new Three.Mesh(geometry, material)

  scene.add(mesh)
}
// const geometry = new Three.BufferGeometry()
// const vertices = new Float32Array([
//   -1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,1.0
// ])
// geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3))

// const material = new Three.MeshBasicMaterial({color: 0xffff00})

// const mesh = new Three.Mesh(geometry, material)

// scene.add(mesh)

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
