/**
 * Scene
  */
const scene = new THREE.Scene()

/**
  * Camera
  */
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const camera = new THREE.PerspectiveCamera(70, windowWidth / windowHeight)
camera.position.y = 0.5
camera.position.z = - 1
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(windowWidth, windowHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

/**
 * Mouse
 */
const mouse = { x: 0.5, y: 0.5 }
window.addEventListener('mousemove', () =>
{
	mouse.x = event.clientX / windowWidth - 0.5
	mouse.y = event.clientY / windowHeight - 0.5
})

/**
 * Keyboard actions
 */
window.addEventListener('keydown', () =>
{

  // Movements 
	if(event.keyCode == 90)
	{
		room.container.position.z += 0.1
	}
	else if(event.keyCode == 83)
	{
		room.container.position.z -= 0.1
	}
	else if(event.keyCode == 81)
	{
		room.container.position.x += 0.1
	}
	else if(event.keyCode == 68)
	{
		room.container.position.x -= 0.1
	}
	else if(event.keyCode == 67)
	{
    camera.position.y += 0.2
	}
	else if(event.keyCode == 86)
	{
		camera.position.y -= 0.2
  }
  
  // Light switch
  else if(event.keyCode == 32)
  {
    if(roomLight.intensity)
    {
      roomLight.intensity = 0
      lightBodyMaterial.emissiveIntensity = 0

      room.container.add(room.slender)

      $video.load()
      $video.pause()

      $slender.play()
      room.container.remove(room.walls.wall3)
    }
    else
    {
      roomLight.intensity = 1
      lightBodyMaterial.emissiveIntensity = 4

      room.container.remove(room.slender)

      $video.play()

      $slender.load()
      $slender.pause()
      room.container.add(room.walls.wall3)
    }
  }
})

/**
 * DOM Variables
 */
const $video = document.querySelector('video')
const $slender = document.querySelector('audio')

/**
 * Textures
 */
// Maps
const textureLoader = new THREE.TextureLoader()

const wallTexture = textureLoader.load('assets/textures/wall.jpg')
wallTexture.wrapS = THREE.repeatWrapping
wallTexture.wrapT = THREE.repeatWrapping
wallTexture.repeat.set(16, 16)

const parquetTexture = textureLoader.load('assets/textures/parquet.jpg')
parquetTexture.wrapS = THREE.repeatWrapping
parquetTexture.wrapT = THREE.repeatWrapping
parquetTexture.repeat.set(8, 8)

const woodTexture = textureLoader.load('assets/textures/wood.jpg')

const darkWoodTexture = textureLoader.load('assets/textures/dark_wood.jpg')

const drawerTexture = textureLoader.load('assets/textures/drawer.jpg')
drawerTexture.wrapS = THREE.repeatWrapping
drawerTexture.wrapT = THREE.repeatWrapping
drawerTexture.repeat.set(2, 3)

const doorTexture = textureLoader.load('assets/textures/door.jpg')

const whiteWoodTexture = textureLoader.load('assets/textures/white_wood.jpg')
whiteWoodTexture.wrapS = THREE.repeatWrapping
whiteWoodTexture.wrapT = THREE.repeatWrapping
whiteWoodTexture.repeat.set(2, 2)

const whiteIronTexture = textureLoader.load('assets/textures/white_iron.jpg')
const bronzeTexture = textureLoader.load('assets/textures/bronze.jpg')

const bedTexture = textureLoader.load('assets/textures/bed.jpg')
const sheetsTexture = textureLoader.load('assets/textures/sheets.jpg')
const quiltTexture = textureLoader.load('assets/textures/quilt.jpg')

const posterTexture = textureLoader.load('assets/textures/poster.jpg')

const switchTexture = textureLoader.load('assets/textures/switch.jpg')

const rugTexture = textureLoader.load('assets/textures/rug.jpg')
rugTexture.wrapS = THREE.repeatWrapping
rugTexture.wrapT = THREE.repeatWrapping
rugTexture.repeat.set(16, 16)

const videoTexture = new THREE.VideoTexture($video)
videoTexture.minFilter = THREE.LinearFilter
videoTexture.magFilter = THREE.LinearFilter
videoTexture.format = THREE.RGBFormat

// Normal Maps

const normalDoor = textureLoader.load('assets/textures/normal_door.jpg')

const normalSwitch = textureLoader.load('assets/textures/normal_switch.jpg')

const normalBed = textureLoader.load('assets/textures/normal_bed.jpg')
const normalSheets = textureLoader.load('assets/textures/normal_sheets.jpg')

const normalRug = textureLoader.load('assets/textures/normal_rug.jpg')
normalRug.wrapS = THREE.repeatWrapping
normalRug.wrapT = THREE.repeatWrapping
normalRug.repeat.set(16, 16)

/**
 * Room
 */
const room = {}
room.container = new THREE.Object3D()
scene.add(room.container)

// Floor
room.floor = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5, 1, 1),
	new THREE.MeshStandardMaterial({ map: parquetTexture, metalness: 0.7, roughness: 0.4 })
)
room.floor.rotation.x = - Math.PI * 0.5
room.floor.receiveShadow = true
room.container.add(room.floor)

// Walls
room.walls = {}

room.walls.wall1 = new THREE.Mesh(
	new THREE.BoxGeometry(5, 2.5, 1),
	new THREE.MeshStandardMaterial({ map: wallTexture, metalness: 0.3, roughness: 0.8 })
)
room.walls.wall1.position.y = 1.25
room.walls.wall1.position.z = 3
room.walls.wall1.receiveShadow = true
room.container.add(room.walls.wall1) 

room.walls.wall2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 2.5, 5),
	new THREE.MeshStandardMaterial({ map: wallTexture, metalness: 0.3, roughness: 0.8 })
)
room.walls.wall2.position.x = 3
room.walls.wall2.position.y = 1.25
room.walls.wall2.receiveShadow = true
room.container.add(room.walls.wall2) 

room.walls.wall3 = new THREE.Mesh(
	new THREE.BoxGeometry(5, 2.5, 1),
	new THREE.MeshStandardMaterial({ map: wallTexture, metalness: 0.3, roughness: 0.8 })
)
room.walls.wall3.position.y = 1.25
room.walls.wall3.position.z = - 3
room.walls.wall3.receiveShadow = true
room.container.add(room.walls.wall3) 

room.walls.wall4 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 2.5, 5),
	new THREE.MeshStandardMaterial({ map: wallTexture, metalness: 0.3, roughness: 0.8 })
)
room.walls.wall4.position.x = - 3
room.walls.wall4.position.y = 1.25
room.walls.wall4.receiveShadow = true
room.container.add(room.walls.wall4) 

// Ceiling
room.ceiling = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5, 1, 1),
	new THREE.MeshStandardMaterial({ map: wallTexture, metalness: 0.3, roughness: 0.8 })
)
room.ceiling.rotation.x = Math.PI * 0.5
room.ceiling.position.y = 2.5
room.ceiling.receiveShadow = true
room.container.add(room.ceiling)

// Door
room.door = new THREE.Object3D()
room.door.position.x = 2.54
room.door.position.y = 1
room.door.position.z = - 1
room.container.add(room.door)

room.doorBody = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 2, 1, 1),
	new THREE.MeshStandardMaterial({ map: doorTexture, normalMap: normalDoor, metalness: 0.3, roughness: 0.6 })
)
room.doorBody.receiveShadow = true
room.door.add(room.doorBody)

room.doorHandle = new THREE.Mesh(
  new THREE.SphereGeometry(0.03, 23, 23),
  new THREE.MeshStandardMaterial({ map: bronzeTexture, metalness: 0.9, roughness: 0.2 })
)
room.doorHandle.position.x = - 0.08
room.doorHandle.position.y = - 0.15
room.doorHandle.position.z = 0.37
room.doorHandle.castShadow = true
room.doorHandle.receiveShadow = true
room.door.add(room.doorHandle)

room.doorHandleConnector = new THREE.Mesh(
  new THREE.BoxGeometry(0.03, 0.02, 0.02),
  new THREE.MeshStandardMaterial({ map: bronzeTexture, metalness: 0.8, roughness: 0.2 })
)
room.doorHandleConnector.position.x = - 0.04
room.doorHandleConnector.position.y = - 0.15
room.doorHandleConnector.position.z = 0.37
room.doorHandleConnector.castShadow = true
room.doorHandleConnector.receiveShadow = true
room.door.add(room.doorHandleConnector)

room.doorHandleBase = new THREE.Mesh(
  new THREE.CircleGeometry(0.04, 23),
  new THREE.MeshStandardMaterial({ map: bronzeTexture, metalness: 0.8, roughness: 0.2 })
)
room.doorHandleBase.rotation.y = - Math.PI /2
room.doorHandleBase.position.x = - 0.06
room.doorHandleBase.position.y = - 0.15
room.doorHandleBase.position.z = 0.37
room.doorHandleBase.castShadow = true
room.doorHandleBase.receiveShadow = true
room.door.add(room.doorHandleBase)

// Bed
room.bed = new THREE.Object3D()
room.bed.position.x = - 1.25
room.bed.position.y = 0.25
room.bed.position.z = 1.75
room.container.add(room.bed)

room.bedBody = new THREE.Mesh(
	new THREE.BoxGeometry(2.5, 0.25, 1.5),
	new THREE.MeshStandardMaterial({ map: sheetsTexture, normalMap: normalSheets, metalness: 0.2, roughness: 0.7 })
)
room.bedBody.castShadow = true
room.bedBody.receiveShadow = true
room.bed.add(room.bedBody)

room.bedFeet = {}

room.bedFeet.foot1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.05, 0.125, 0.05),
  new THREE.MeshStandardMaterial({ map: woodTexture, metalness: 0.3, roughness: 0.6 })
)
room.bedFeet.foot1.position.x = 1.225
room.bedFeet.foot1.position.y = - 0.1875
room.bedFeet.foot1.position.z = - 0.725
room.bedFeet.foot1.castShadow = true
room.bedFeet.foot1.receiveShadow = true
room.bed.add(room.bedFeet.foot1)

room.bedFeet.foot2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.05, 0.125, 0.05),
  new THREE.MeshStandardMaterial({ map: woodTexture, metalness: 0.3, roughness: 0.6 })
)
room.bedFeet.foot2.position.x = 1.225
room.bedFeet.foot2.position.y = - 0.1875
room.bedFeet.foot2.position.z = 0.725
room.bedFeet.foot2.castShadow = true
room.bedFeet.foot2.receiveShadow = true
room.bed.add(room.bedFeet.foot2)

room.bedFeet.foot3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.05, 0.125, 0.05),
  new THREE.MeshStandardMaterial({ map: woodTexture, metalness: 0.3, roughness: 0.6 })
)
room.bedFeet.foot3.position.x = - 1.225
room.bedFeet.foot3.position.y = - 0.1875
room.bedFeet.foot3.position.z = 0.725
room.bedFeet.foot3.castShadow = true
room.bedFeet.foot3.receiveShadow = true
room.bed.add(room.bedFeet.foot3)

room.bedFeet.foot4 = new THREE.Mesh(
  new THREE.BoxGeometry(0.05, 0.125, 0.05),
  new THREE.MeshStandardMaterial({ map: woodTexture, metalness: 0.3, roughness: 0.6 })
)
room.bedFeet.foot4.position.x = - 1.225
room.bedFeet.foot4.position.y = - 0.1875
room.bedFeet.foot4.position.z = - 0.725
room.bedFeet.foot4.castShadow = true
room.bedFeet.foot4.receiveShadow = true
room.bed.add(room.bedFeet.foot4)

// Pillows
room.pillow1 = new THREE.Mesh(
	new THREE.BoxGeometry(0.4, 0.07, 0.6),
	new THREE.MeshStandardMaterial({ map: quiltTexture, metalness: 0.3, roughness: 0.6 })
)
room.pillow1.position.x = - 1.05	
room.pillow1.position.y = 0.16
room.pillow1.position.z = - 0.4
room.pillow1.castShadow = true
room.pillow1.receiveShadow = true
room.bed.add(room.pillow1)

room.pillow2 = new THREE.Mesh(
	new THREE.BoxGeometry(0.4, 0.07, 0.6),
	new THREE.MeshStandardMaterial({ map: quiltTexture, metalness: 0.3, roughness: 0.6 })
)
room.pillow2.position.x = - 1.05	
room.pillow2.position.y = 0.16
room.pillow2.position.z = 0.3
room.pillow2.castShadow = true
room.pillow2.receiveShadow = true
room.bed.add(room.pillow2)

// Quilt
room.quilt = new THREE.Mesh(
	new THREE.BoxGeometry(2.02, 0.2, 1.52),
	new THREE.MeshStandardMaterial({ map: quiltTexture, metalness: 0.3, roughness: 0.6 })
)
room.quilt.position.x = 0.25
room.quilt.position.y = 0.05
room.quilt.receiveShadow = true
room.bed.add(room.quilt)

room.surQuilt = new THREE.Mesh(
	new THREE.BoxGeometry(0.2, 0.21, 1.53),
	new THREE.MeshStandardMaterial({ map: sheetsTexture, metalness: 0.3, roughness: 0.6 })
)
room.surQuilt.position.x = - 0.67
room.surQuilt.position.y = 0.05
room.surQuilt.receiveShadow = true
room.bed.add(room.surQuilt)

// Furniture
room.furniture = new THREE.Object3D()
room.furniture.position.x = - 2.175
room.furniture.position.y = 0.5
room.furniture.position.z = - 0.5
room.container.add(room.furniture)

room.furnitureBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.1, 2.5),
  new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureBase.position.y = - 0.5
room.furnitureBase.castShadow = true
room.furnitureBase.receiveShadow = true
room.furniture.add(room.furnitureBase)

room.furnitureTop = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.05, 2.5),
  new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureTop.position.y = 0.025
room.furnitureTop.castShadow = true
room.furnitureTop.receiveShadow = true
room.furniture.add(room.furnitureTop)

room.furnitureLeft = new THREE.Mesh(
	new THREE.BoxGeometry(0.75, 0.45, 0.05),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureLeft.position.y = - 0.225
room.furnitureLeft.position.z = 1.225
room.furnitureLeft.castShadow = true
room.furnitureLeft.receiveShadow = true
room.furniture.add(room.furnitureLeft)

room.furnitureRight = new THREE.Mesh(
	new THREE.BoxGeometry(0.75, 0.45, 0.05),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureRight.position.y = - 0.225
room.furnitureRight.position.z = - 1.225
room.furnitureRight.castShadow = true
room.furnitureRight.receiveShadow = true
room.furniture.add(room.furnitureRight)

room.furnitureSeparator1 = new THREE.Mesh(
	new THREE.BoxGeometry(0.75, 0.45, 0.05),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureSeparator1.position.y = - 0.225
room.furnitureSeparator1.position.z = 0.625
room.furnitureSeparator1.castShadow = true
room.furnitureSeparator1.receiveShadow = true
room.furniture.add(room.furnitureSeparator1)

room.furnitureSeparator2 = new THREE.Mesh(
	new THREE.BoxGeometry(0.75, 0.45, 0.05),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureSeparator2.position.y = - 0.225
room.furnitureSeparator2.castShadow = true
room.furnitureSeparator2.receiveShadow = true
room.furniture.add(room.furnitureSeparator2)

room.furnitureSeparator3 = new THREE.Mesh(
	new THREE.BoxGeometry(0.75, 0.45, 0.05),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureSeparator3.position.y = - 0.225
room.furnitureSeparator3.position.z = - 0.625
room.furnitureSeparator3.castShadow = true
room.furnitureSeparator3.receiveShadow = true
room.furniture.add(room.furnitureSeparator3)

room.furnitureDoor1 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.54, 0.44, 1),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureDoor1.rotation.y = Math.PI / 2
room.furnitureDoor1.position.x = 0.375
room.furnitureDoor1.position.y = - 0.225
room.furnitureDoor1.position.z = - 0.925
room.furniture.add(room.furnitureDoor1)

room.furnitureDoor2 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.57, 0.44, 1),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureDoor2.rotation.y = Math.PI / 2
room.furnitureDoor2.position.x = 0.375
room.furnitureDoor2.position.y = - 0.225
room.furnitureDoor2.position.z = - 0.313
room.furniture.add(room.furnitureDoor2)

room.furnitureDoor3 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.57, 0.44, 1),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureDoor3.rotation.y = Math.PI / 2
room.furnitureDoor3.position.x = 0.375
room.furnitureDoor3.position.y = - 0.225
room.furnitureDoor3.position.z = 0.313
room.furniture.add(room.furnitureDoor3)

room.furnitureDoor4 = new THREE.Mesh(
  new THREE.PlaneGeometry(0.54, 0.44, 1),
	new THREE.MeshStandardMaterial({ map: whiteWoodTexture, metalness: 0.3, roughness: 0.7 })
)
room.furnitureDoor4.rotation.y = Math.PI / 2
room.furnitureDoor4.position.x = 0.375
room.furnitureDoor4.position.y = - 0.225
room.furnitureDoor4.position.z = 0.925
room.furniture.add(room.furnitureDoor4)



// Drawer
room.drawer = new THREE.Object3D()
room.drawer.position.x = 1
room.drawer.position.y = 0.375
room.drawer.position.z = 2.25
room.container.add(room.drawer)

room.drawerBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.75, 0.5),
  new THREE.MeshStandardMaterial({ map: darkWoodTexture })
)
room.drawerBody.castShadow = true
room.drawerBody.receiveShadow = true
room.drawer.add(room.drawerBody)

room.drawerFront = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 0.75),
  new THREE.MeshStandardMaterial({ map: drawerTexture })
)
room.drawerFront.rotation.x = Math.PI
room.drawerFront.position.z = - 0.26
room.drawerFront.castShadow = true
room.drawerFront.receiveShadow = true
room.drawer.add(room.drawerFront)

// Poster
room.poster = new THREE.Mesh(
  new THREE.PlaneGeometry(1.8, 1, 1),
  new THREE.MeshStandardMaterial({ map: posterTexture, metalness: 0.4, roughness: 0.2 })
)
room.poster.rotation.y = Math.PI / 2
room.poster.position.x = - 2.49
room.poster.position.y = 1.5
room.poster.position.z = - 0.5
room.container.add(room.poster)

// Rug
room.rug = new THREE.Mesh(
  new THREE.CircleGeometry(1.2, 23),
  new THREE.MeshStandardMaterial({ map: rugTexture, normalMap: normalRug, metalness: 0, roughness: 0.8 })
)
room.rug.rotation.x = - Math.PI / 2
room.rug.position.y = 0.01
room.rug.position.z = - 0.4
room.container.add(room.rug)

// Switch
room.switch = new THREE.Mesh(
	new THREE.BoxGeometry(0.05, 0.1, 0.1),
	new THREE.MeshStandardMaterial({ map: switchTexture, normalMap: normalSwitch, color: 0xffffff, metalness: 0.4, roughness: 0.2 })
)
room.switch.position.x = 2.52
room.switch.position.y = 1
room.switch.position.z = - 0.35
room.switch.castShadow = true
room.switch.receiveShadow = true
room.container.add(room.switch)

// TV
let tvMaterial = new THREE.MeshStandardMaterial({ map: videoTexture, color: null, metalness: 0.6, roughness: 0 })
room.tv = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 1.5, 2.67),
	tvMaterial
)
room.tv.position.x = 2.54
room.tv.position.y = 1.2
room.tv.position.z = 1.15
room.container.add(room.tv)

// Radiator 
room.radiator = new THREE.Object3D() 
room.radiator.position.x = - 2.45
room.radiator.position.y = 0.475
room.radiator.position.z = - 2
room.container.add(room.radiator)

room.radiator1 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.75, 0.05),
	new THREE.MeshPhongMaterial({ map: whiteIronTexture })
)
room.radiator1.castShadow = true
room.radiator1.receiveShadow = true
room.radiator.add(room.radiator1)

room.radiator2 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.75, 0.05),
	new THREE.MeshPhongMaterial({ map: whiteIronTexture })
)
room.radiator2.position.z = - 0.1
room.radiator2.castShadow = true
room.radiator2.receiveShadow = true
room.radiator.add(room.radiator2)

room.radiator3 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.75, 0.05),
	new THREE.MeshPhongMaterial({ map: whiteIronTexture })
)
room.radiator3.position.z = - 0.2
room.radiator3.castShadow = true
room.radiator3.receiveShadow = true
room.radiator.add(room.radiator3)

room.radiator4 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.75, 0.05),
	new THREE.MeshPhongMaterial({ map: whiteIronTexture })
)
room.radiator4.position.z = - 0.3
room.radiator4.castShadow = true
room.radiator4.receiveShadow = true
room.radiator.add(room.radiator4)

room.radiator5 = new THREE.Mesh(
	new THREE.BoxGeometry(0.1, 0.75, 0.05),
	new THREE.MeshPhongMaterial({ map: whiteIronTexture })
)
room.radiator5.position.z = - 0.4
room.radiator5.castShadow = true
room.radiator5.receiveShadow = true
room.radiator.add(room.radiator5)

// Light
room.light = new THREE.Object3D()
room.light.position.y = 2.1
room.container.add(room.light)

let lightBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.6, emissive: 0xffffff, emissiveIntensity: 4 })
room.lightBody = new THREE.Mesh(
	new THREE.SphereGeometry(0.15	, 24, 24),
  lightBodyMaterial
)
room.lightBody.castShadow = true
room.lightBody.receiveShadow = true
room.light.add(room.lightBody)

room.lightConnector = new THREE.Mesh(
	new THREE.BoxGeometry(0.01, 0.4, 0.01),
	new THREE.MeshStandardMaterial({ color: 0xfefefe, metalness: 0.6, roughness: 0.2 })
)
room.lightConnector.position.y = 0.2
room.lightConnector.castShadow = true
room.lightConnector.receiveShadow = true
room.light.add(room.lightConnector)

// Slender
room.slender = new THREE.Object3D()
room.slender.rotation.y = - Math.PI / 3
room.slender.position.x = - 1
room.slender.position.y = 1.2
room.slender.position.z = - 1.5

room.slenderBody = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 1.2, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slender.add(room.slenderBody)

room.slenderHead = new THREE.Mesh(
  new THREE.SphereGeometry(0.15, 23, 23),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 })
)
room.slenderHead.position.y = 0.75
room.slender.add(room.slenderHead)

room.slenderLeftShoulder = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 0.2, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderLeftShoulder.position.y = 0.5 
room.slenderLeftShoulder.position.z = 0.3 
room.slender.add(room.slenderLeftShoulder)

room.slenderLeftArm = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 0.7, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderLeftArm.position.y = 0.25 
room.slenderLeftArm.position.z = 0.35 
room.slender.add(room.slenderLeftArm)

room.slenderRightShoulder = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 0.2, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderRightShoulder.position.y = 0.5 
room.slenderRightShoulder.position.z = - 0.3 
room.slender.add(room.slenderRightShoulder)

room.slenderRightArm = new THREE.Mesh(
  new THREE.BoxGeometry(0.25, 0.7, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderRightArm.position.y = 0.25 
room.slenderRightArm.position.z = - 0.35 
room.slender.add(room.slenderRightArm)

room.slenderLeftLeg = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.7, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderLeftLeg.position.y = - 0.9 
room.slenderLeftLeg.position.z = 0.15 
room.slender.add(room.slenderLeftLeg)

room.slenderRightLeg = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.7, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
)
room.slenderRightLeg.position.y = - 0.9 
room.slenderRightLeg.position.z = - 0.15 
room.slender.add(room.slenderRightLeg)

// Eyes
room.eye1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 23, 23),
  new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 4 })
)
room.eye1.position.x = - 5
room.eye1.position.y = 4
room.eye1.position.z = - 10
room.container.add(room.eye1)

room.eye2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 23, 23),
  new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 4 })
)
room.eye2.position.x = 5
room.eye2.position.y = 4
room.eye2.position.z = - 10
room.container.add(room.eye2)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x555555)
room.container.add(ambientLight)

const roomLight = new THREE.PointLight(0xffffff, 1, 20, 2)
roomLight.position.y = 2
roomLight.castShadow = true
room.lightBody.add(roomLight)

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight

	camera.aspect = windowWidth / windowHeight
	camera.updateProjectionMatrix()

	renderer.setSize(windowWidth, windowHeight)
})

/**
 * Loop
 */
const loop = () =>
{
	window.requestAnimationFrame(loop)

	// Update camera with mouse position
	if(mouse.x > 0.4)
	{
		room.container.rotation.y += 0.05
	}
	else if(mouse.x < -0.4)
	{
		room.container.rotation.y -= 0.05
	}

	if(mouse.y > 0.4)
	{
		if(camera.rotation.x > -(Math.PI/2))
		{
			camera.rotation.x -= 0.05
		}
	}
	else if(mouse.y < -0.4)
	{
		if(camera.rotation.x < (Math.PI/2))
			camera.rotation.x += 0.05
  }

	// Render
	renderer.render(scene, camera)
}

loop()
