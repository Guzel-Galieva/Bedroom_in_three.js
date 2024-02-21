import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from 'gsap'

THREE.ColorManagement.enabled = false
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// Door
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// Floor
const floorTexture = textureLoader.load('/textures/floor/Wood_Floor_012_basecolor.jpg')
const floorAmbientOcclusionTexture = textureLoader.load('/textures/floor/Wood_Floor_012_ambientOcclusion.jpg')
const floorNormalTexture = textureLoader.load('/textures/floor/Wood_Floor_012_normal.jpg')
const floorRoughnessTexture = textureLoader.load('/textures/floor/Wood_Floor_012_roughness.jpg')
//Bed
const bedTexture = textureLoader.load('/textures/bed/Wood_Pattern_001_basecolor.jpg')
const bedAmbientOcclusionTexture = textureLoader.load('/textures/bed/Wood_Pattern_001_ambientOcclusion.jpg')
const bedHeightTexture = textureLoader.load('/textures/bed/Wood_Pattern_001_height.png')
const bedNormalTexture = textureLoader.load('/textures/bed/Wood_Pattern_001_normal.jpg')
const bedRoughnessTexture = textureLoader.load('/textures/bed/Wood_Pattern_001_roughness.jpg')
//Table
const furnTexture = textureLoader.load('/textures/furniture/Wood_011_Base_Color.jpg')
const furnAmbientOcclusionTexture = textureLoader.load('/textures/furniture/Wood_011_ambientOcclusion.jpg')
const furnHeightTexture = textureLoader.load('/textures/furniture/Wood_011_Height.png')
const furnNormalTexture = textureLoader.load('/textures/furniture/Wood_011_Normal.jpg')
const furnRoughnessTexture = textureLoader.load('/textures/furniture/Wood_011_Roughness.jpg')
// Nightstand
const furn2Texture = textureLoader.load('/textures/furniture2/Wood_025_basecolor.jpg')
const furn2AmbientOcclusionTexture = textureLoader.load('/textures/furniture2/Wood_025_ambientOcclusion.jpg')
const furn2HeightTexture = textureLoader.load('/textures/furniture2/Wood_025_height.png')
const furn2NormalTexture = textureLoader.load('/textures/furniture2/Wood_025_normal.jpg')
const furn2RoughnessTexture = textureLoader.load('/textures/furniture2/Wood_025_roughness.jpg')
// Chair
const furn3Texture = textureLoader.load('/textures/furniture2/Wood_003_COLOR.jpg')
const furn3AmbientOcclusionTexture = textureLoader.load('/textures/furniture2/Wood_003_OCC.jpg')
const furn3HeightTexture = textureLoader.load('/textures/furniture2/Wood_003_DISP.png')
const furn3NormalTexture = textureLoader.load('/textures/furniture2/Wood_003_NORM.jpg')
const furn3RoughnessTexture = textureLoader.load('/textures/furniture2/Wood_003_ROUGH.jpg')
// Bedcover
const bedcoverTexture = textureLoader.load('/textures/bedcover/Fabric_Knited_003_basecolor.jpg')
const bedcoverAmbientOcclusionTexture = textureLoader.load('/textures/bedcover/Fabric_Knited_003_ambientOcclusion.jpg')
const bedcoverHeightTexture = textureLoader.load('/textures/bedcover/Fabric_Knited_003_height.png')
const bedcoverNormalTexture = textureLoader.load('/textures/bedcover/Fabric_Knited_003_normal.jpg')
const bedcoverRoughnessTexture = textureLoader.load('/textures/bedcover/Fabric_Knited_003_roughness.jpg')
// Lamp top
const lampTopTexture = textureLoader.load('/textures/lamp/top/Paper_Lantern_001_basecolor.jpg')
const lampTopAmbientOcclusionTexture = textureLoader.load('/textures/lamp/top/Paper_Lantern_001_ambientOcclusion.jpg')
const lampTopHeightTexture = textureLoader.load('/textures/lamp/top/Paper_Lantern_001_height.png')
const lampTopNormalTexture = textureLoader.load('/textures/lamp/top/Paper_Lantern_001_normal.jpg')
const lampTopRoughnessTexture = textureLoader.load('/textures/lamp/top/Paper_Lantern_001_roughness.jpg')
// Lamp bottom
const lampBottomTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_basecolor.jpg')
const lampBottomHeightTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_height.png')
const lampBottomNormalTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_normal.jpg')
const lampBottomRoughnessTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_roughness.jpg')
const lampBottomOpacityTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_normal.jpg')
const lampBottomMetallicTexture = textureLoader.load('/textures/lamp/bottom/Metal_Corrugated_016_roughness.jpg')
//Poster
const posterColor = textureLoader.load('/textures/poster/friends.jpg')
posterColor.magFilter = THREE.NearestFilter

// Text
const matcapTexture = textureLoader.load('/textures/matcap/text.png')

// Statuette
const cubeTextureLoader = new THREE.CubeTextureLoader()
const cubeMapTexture = cubeTextureLoader.load([
    '/textures/Cube-Map/px.png',
    '/textures/Cube-Map/px.png',
    '/textures/Cube-Map/py.png',
    '/textures/Cube-Map/ny.png',
    '/textures/Cube-Map/pz.png',
    '/textures/Cube-Map/nz.png'
])
/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/font/helvetiker_bold.typeface.json',
    (font) => {
        const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

        const textGeometry = new TextGeometry('Bedroom', {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 1
        })
        const text = new THREE.Mesh(textGeometry, material)

        textGeometry.computeBoundingBox()
        textGeometry.translate(
            -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
            textGeometry.boundingBox.max.y + 5,
            textGeometry.boundingBox.max.z - 7,
        )
        scene.add(text)
    }
)
/**
 * Room
 */
// Room container
const room = new THREE.Group()
scene.add(room)

//Walls
const wallMaterial = new THREE.MeshStandardMaterial({color: 0xe3bfc5})
const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(10, 5.5, 0.2),
    wallMaterial
)
wall1.position.z = -7.6
room.add(wall1)

const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(7, 5.5, 0.2),
    wallMaterial
)
wall2.rotation.y = wall2.rotation.y + Math.PI * 0.5
wall2.position.set(-4.9,0,-4)
room.add(wall2)

gui.addColor(wall1.material, 'color').onChange(()=> {
    wall1.color.set(wall1.color)
}).name('walls')

// Poster
const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 3),
    new THREE.MeshStandardMaterial({map: posterColor})
)
poster.rotation.y = poster.rotation.y + Math.PI * 0.5
poster.position.set(-4.79,0,-6)
room.add(poster)
gui.add(poster.material, 'visible').name('poster')
/**
 * floor
 */
const floor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 7.2, 0.2),
    new THREE.MeshStandardMaterial({
        map: floorTexture,
        transparent: true,
        aoMap: floorAmbientOcclusionTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorRoughnessTexture
    })
)
floor.rotation.x = wall2.rotation.x + Math.PI * 0.5
floor.position.set(0,-2.85,-4.1)
room.add(floor)

gui.add(room.position, 'x').min(-3).max(3).step(0.001).name('room-x')
gui.add(room.position, 'y').min(-5).max(0).step(0.001).name('room-y')
gui.add(room.position, 'z').min(-6).max(-3).step(0.001).name('room-z')

// Material for furniture
//Table
const furnMaterial = new THREE.MeshStandardMaterial({
    map: furnTexture,
    transparent: true,
    aoMap: furnAmbientOcclusionTexture,
    displacementMap: furnHeightTexture,
    displacementScale: 0,
    normalMap: furnNormalTexture,
    roughnessMap: furnRoughnessTexture
})
//Nightstand
const furn2Material = new THREE.MeshStandardMaterial({
    map: furn2Texture,
    transparent: true,
    aoMap: furn2AmbientOcclusionTexture,
    displacementMap: furn2HeightTexture,
    displacementScale: 0,
    normalMap: furn2NormalTexture,
    roughnessMap: furn2RoughnessTexture
})
//Chair
const chairMaterial = new THREE.MeshStandardMaterial({
    map: furn3Texture,
    transparent: true,
    aoMap: furn3AmbientOcclusionTexture,
    displacementMap: furn3HeightTexture,
    displacementScale: 0,
    normalMap: furn3NormalTexture,
    roughnessMap: furn3RoughnessTexture
})
//Bed
const bedMaterial = new THREE.MeshStandardMaterial({
    map: bedTexture,
    transparent: true,
    aoMap: bedAmbientOcclusionTexture,
    displacementMap: bedHeightTexture,
    displacementScale: 0,
    normalMap: bedNormalTexture,
    roughnessMap: bedRoughnessTexture
})
/**
 * Bed
 */
const bed = new THREE.Group()
scene.add(bed)

// Place for mattress
const mat = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 5, 0.5),
    bedMaterial
)

mat.rotation.x = mat.rotation.x + Math.PI * 0.5
mat.position.set(1.2,-2,-4.9)
bed.add(mat)

// Mattress
const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 4.9, 0.2),
    new THREE.MeshStandardMaterial({
        map: bedcoverTexture,
        transparent: true,
        aoMap: bedcoverAmbientOcclusionTexture,
        displacementMap: bedcoverHeightTexture,
        displacementScale: 0,
        normalMap: bedcoverNormalTexture,
        roughnessMap: bedcoverRoughnessTexture    })
)

mattress.rotation.x = mattress.rotation.x + Math.PI * 0.5
mattress.position.set(1.2,-1.65,-4.9)
bed.add(mattress)

// Back of bed
const back = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 2.5, 0.1),
    bedMaterial
)
back.position.set(1.2,-1.5,-7.4)
bed.add(back)

// Front of bed
const front = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.8, 0.1),
    bedMaterial
)
front.position.set(1.2,-1.85,-2.35)
bed.add(front)

// Pillow
const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.8, 0.2),
    new THREE.MeshStandardMaterial({color: 0x4d435c})
)
pillow.rotation.x = pillow.rotation.x - Math.PI * 0.25
pillow.position.set(1.2,-1.2,-7)
bed.add(pillow)

gui.addColor(pillow.material, 'color').onChange(()=> {
    pillow.color.set(pillow.color)
}).name('pillow')
gui.add(bed.position, 'x').min(-3).max(3).step(0.001).name('bed-x')
gui.add(bed.position, 'y').min(-5).max(0).step(0.001).name('bed-y')
gui.add(bed.position, 'z').min(-2).max(4).step(0.001).name('bed-z')
/**
* Table
*/
const table = new THREE.Group()
scene.add(table)

// Left side of table
const sideL = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 2, 0.1),
    furnMaterial
)
sideL.position.set(-3.8,-1.75,-1)
table.add(sideL)

// Right side of table
const sideR = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 2, 0.1),
    furnMaterial
)
sideR.position.set(-3.8,-1.75,-3.6)
table.add(sideR)

// Tabletop
const tabletop = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 2.7, 0.1),
    furnMaterial
)
tabletop.rotation.x = tabletop.rotation.x - Math.PI * 0.5
tabletop.position.set(-3.8,-0.7,-2.3)
table.add(tabletop)

gui.add(table.position, 'x').min(-1).max(4).step(0.001).name('table-x')
gui.add(table.position, 'y').min(-1).max(1).step(0.001).name('table-y')
gui.add(table.position, 'z').min(-2).max(1).step(0.001).name('table-z')
/**
 * Chair
 */
const chair = new THREE.Group()
scene.add(chair)

// Seat
const seat = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1, 0.2),
    chairMaterial
)
seat.rotation.x = seat.rotation.x - Math.PI * 0.5
seat.position.set(-1.3,-1.4,-2.3)
chair.add(seat)

// Back of chair
const chairBack = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.1),
    chairMaterial
)
chairBack.rotation.y = seat.rotation.y - Math.PI * 0.5
chairBack.position.set(-0.75,-0.55,-2.3)
chair.add(chairBack)

// First leg of chair
const leg1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.27, 0.2),
    chairMaterial
)
leg1.position.set(-0.8,-2.11,-1.9)
chair.add(leg1)

// Second leg of chair
const leg2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.27, 0.2),
    chairMaterial
)
leg2.position.set(-0.8,-2.11,-2.7)
chair.add(leg2)

// Third leg of chair
const leg3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.27, 0.2),
    chairMaterial
)
leg3.position.set(-1.8,-2.11,-2.7)
chair.add(leg3)

// Forth leg of chair
const leg4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1.27, 0.2),
    chairMaterial
)
leg4.position.set(-1.8,-2.11,-1.9)
chair.add(leg4)

chair.position.x = -1.7
gui.add(chair.position, 'x').min(-2).max(2).step(0.001).name('chair-x')
gui.add(chair.position, 'y').min(-1).max(1).step(0.001).name('chair-y')
gui.add(chair.position, 'z').min(-3).max(2).step(0.001).name('chair-z')
/**
 * Nightstand
 */
const nightstand = new THREE.Group()
scene.add(nightstand)

// Shelves of nightstand
const shelves = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1),
    furn2Material
)
shelves.position.set(3.3,-1.95,-6.9)
nightstand.add(shelves)

// First leg of nightstand
const leg1N = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
leg1N.position.set(3.8,-2.65,-6.5)
nightstand.add(leg1N)

// Second leg of nightstand
const leg2N = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
leg2N.position.set(3.8,-2.65,-7.3)
nightstand.add(leg2N)

// Third leg of nightstand
const leg3N = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
leg3N.position.set(2.8,-2.65,-6.5)
nightstand.add(leg3N)

// Third leg of nightstand
const leg4N = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
leg4N.position.set(2.8,-2.65,-7.3)
nightstand.add(leg4N)

// First handle of nightstand
const handle1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.05, 0.1),
    new THREE.MeshStandardMaterial({color: 0xffffff, metalness:0.7})
)
handle1.position.set(3.3,-1.7,-6.35)
nightstand.add(handle1)

// Second handle of nightstand
const handle2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.05, 0.1),
    new THREE.MeshStandardMaterial({color: 0xffffff, metalness:0.7})
)
handle2.position.set(3.3,-2.3,-6.35)
nightstand.add(handle2)

// gap of nightstand
const gap = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.05),
    new THREE.MeshStandardMaterial({color: 0x000000})
)
gap.position.set(3.3,-2,-6.39)
nightstand.add(gap)

gui.add(nightstand.position, 'x').min(-5).max(1).step(0.001).name('nightstand-x')
gui.add(nightstand.position, 'y').min(-4).max(2).step(0.001).name('nightstand-y')
gui.add(nightstand.position, 'z').min(-1).max(4).step(0.001).name('nightstand-z')

/**
 * Lamp
 */
const lamp = new THREE.Group()
scene.add(lamp)

// Lamp base
const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.3, 0.55, 14),
    new THREE.MeshStandardMaterial({
        map: lampBottomTexture,
        displacementMap: lampBottomHeightTexture,
        displacementScale: 0,
        normalMap: lampBottomNormalTexture,
        roughnessMap: lampBottomRoughnessTexture,
        metalnessMap: lampBottomMetallicTexture,
        alphaMap: lampBottomOpacityTexture
    })
)
lampBase.position.set(3.1,-1.07,-6.9)
lamp.add(lampBase)

// Torchere
const torchere = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 0.4, 14, 1, true),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: lampTopTexture,
        transparent: true,
        opacity: 0.8,
        aoMap: lampTopAmbientOcclusionTexture,
        displacementMap: lampTopHeightTexture,
        displacementScale: 0,
        normalMap: lampTopNormalTexture,
        roughnessMap: lampTopRoughnessTexture
    })
)
torchere.position.set(3.1,-0.5,-6.9)
lamp.add(torchere)

// Stick for lamp
const stick = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.05, 0.05, 0.2, 10),
    new THREE.MeshStandardMaterial({color: 0x102141, side: THREE.DoubleSide})
)
stick.position.set(3.1,-0.75,-6.9)
lamp.add(stick)
nightstand.add(lamp)

gui.add(lamp.position, 'x').min(-7).max(2).step(0.001).name('lamp-x')
gui.add(lamp.position, 'y').min(-2).max(4).step(0.001).name('lamp-y')
gui.add(lamp.position, 'z').min(-1).max(5).step(0.001).name('lamp-z')
/**
 * Sphere on Table
 */
const statuette = new THREE.Group()
scene.add(statuette)

const donut = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    new THREE.MeshStandardMaterial({metalness: 0.7, roughness: 0.1, envMap: cubeMapTexture}))
donut.position.set(-3.9,0.14,-2.4)
donut.rotation.y += Math.PI * 0.5
statuette.add(donut)

const donutBase = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.25, 0.4, 0.3, 12),
    new THREE.MeshStandardMaterial({
        color: '#C0C0C0', side: THREE.DoubleSide,
        roughness: 0.5, metalness: 0.3})
)
donutBase.position.set(-3.9,-0.5,-2.4)
statuette.add(donutBase)

gui.add(statuette.position, 'x').min(-7).max(2).step(0.001).name('statuette-x')
gui.add(statuette.position, 'y').min(-2).max(4).step(0.001).name('statuette-y')
gui.add(statuette.position, 'z').min(-8).max(-1).step(0.001).name('statuette-z')
/**
 * Door
 */
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5.5),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture})
)
door.position.set(-2.5,-0.3,-7.49)
scene.add(door)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#fff0d1', 0)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('amb intensity')
scene.add(ambientLight)

// Directional light from window
const windowLight = new THREE.DirectionalLight('#d2d1ff', 1.2)
windowLight.position.set(2, 3, 4)
scene.add(windowLight)

gui.addColor(windowLight, 'color').onChange(()=> {
    windowLight.color.set(windowLight.color)
}).name('window light')
gui.add(windowLight, 'intensity').min(0).max(1.5).step(0.001).name('win intensity')
gui.add(windowLight.position, 'x').min(- 1).max(10).step(0.001).name('win-x')
gui.add(windowLight.position, 'y').min(- 1).max(10).step(0.001).name('win-y')
gui.add(windowLight.position, 'z').min(- 1).max(10).step(0.001).name('win-z')

// Point light from lamp
const lampLight = new THREE.PointLight('#ff7d46', 1.5, 10)
lampLight.position.set(3.05, -0.6, -6.8)
lamp.add(lampLight)

gui.addColor(lampLight, 'color').onChange(()=> {
    lampLight.color.set(lampLight.color)
}).name('lamp')
gui.add(lampLight, 'intensity').min(0).max(10).step(0.001)
gui.add(lampLight, 'distance').min(0).max(15).step(0.001)
/**
 * Shadows
 */
lampLight.castShadow = true
windowLight.castShadow = true
//room
floor.receiveShadow = true
wall1.receiveShadow = true
wall2.receiveShadow = true
// nightstand
shelves.castShadow = true
shelves.receiveShadow = true
// Bed
mattress.receiveShadow = true
pillow.castShadow = true
back.castShadow = true
back.receiveShadow = true
front.castShadow = true
front.receiveShadow = true
mat.castShadow = true
mat.receiveShadow = true
//Table
sideL.castShadow = true
sideR.castShadow = true
sideR.receiveShadow = true
tabletop.castShadow = true
tabletop.receiveShadow = true
//Chair
chairBack.castShadow = true
seat.castShadow = true
seat.receiveShadow = true
leg1.castShadow = true
leg2.castShadow = true
leg2.receiveShadow = true
leg3.castShadow = true
leg3.receiveShadow = true
leg4.castShadow = true
leg4.receiveShadow = true
// Lamp
lampBase.castShadow = true
lampBase.receiveShadow = true
stick.castShadow = true
stick.receiveShadow = true
torchere.castShadow = true
torchere.receiveShadow = true
//Statuette
donut.castShadow = true
donutBase.castShadow = true
donutBase.receiveShadow = true

lampLight.shadow.mapSize.width = 256
lampLight.shadow.mapSize.height = 256
lampLight.shadow.camera.far = 7

windowLight.shadow.mapSize.width = 512
windowLight.shadow.mapSize.height = 512
windowLight.shadow.camera.near = 4
windowLight.shadow.camera.far = 16
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,4.5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})
/**
 * Animate
 */
const donutAnime = {
    spinDonut : () => {
        gsap.to(donut.rotation, {duration: 2, y: donut.rotation.y + Math.PI * 4, ease: "circ.out"})
    }
}
gui.add(donutAnime, 'spinDonut')

const bedAnime = {
    reShuffle : () => {
        const tl = gsap.timeline({repeat: 1, repeatDelay: 1, yoyo: true});
        tl.to(bed.position, {duration: 1, z: 1.5})
        tl.to(nightstand.position, {duration: 1, x: -3})
        tl.to(bed.position, {duration: 1, x: 1.2})
        tl.to(bed.position, {duration: 1, z: 0})
    }
}
gui.add(bedAnime, 'reShuffle')

// Turn off or on lamp
window.addEventListener('keydown', (event) => {
    if (lampLight.intensity > 0.1) {
        lampLight.intensity = 0.1
    }
    else lampLight.intensity = 1.2
})

// Move chair
let x_cursor = 0
window.addEventListener('mousemove', (event) => {
    x_cursor = (event.clientX) / sizes.width * 2 - 2
})

const tick = () =>
{
    // Update controls
    controls.update()

    // Move chair
    chair.position.x = x_cursor

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()