import * as THREE from 'three'

const sizes = {
  height: 0,
  width: 0,
}

let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let camera: THREE.PerspectiveCamera

let cube: THREE.Mesh

const clock = new THREE.Clock()

let startTime: number
let deltaTime: number = 16
let currentTime: number = 0
let elapsedTime: number = 0

export const init = (canvas: HTMLCanvasElement) => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  camera.position.z = 6
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace

  startTime = Date.now()
  currentTime = Date.now()

  updateSizes()
  setupScene()
  tick()

  window.addEventListener('resize', resize)
}

const setupScene = () => {
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' }),
  )

  scene.add(cube)
}

const updateSizes = () => {
  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const resize = () => {
  console.log('resize')

  updateSizes()
}

const tick = () => {
  const now = Date.now()

  deltaTime = now - currentTime
  currentTime = now
  elapsedTime = (currentTime - startTime) / 1000

  cube.rotation.y = elapsedTime

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
