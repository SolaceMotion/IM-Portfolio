import * as T from "three"
import { useRef, useEffect } from 'react'

export default function ThreeJs() {
    const canvas = useRef()

    useEffect(() => {
        const scene: T.Scene = new T.Scene()
        const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new T.WebGLRenderer({
          canvas: canvas.current
        })
        scene.background = new T.Color("rgb(20, 20, 20)")
    
        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
    
          renderer.setSize(window.innerWidth, window.innerHeight)
          renderer.setPixelRatio(window.devicePixelRatio)
        })
    
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.position.setZ(30)
      
        const geometry = new T.TorusGeometry(10,3,16,100)
        const material = new T.MeshBasicMaterial({color: 0x000000, wireframe: true})
        const torus = new T.Mesh(geometry, material)
        scene.add(torus)
        renderer.render(scene, camera)
    
        function animate() {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
          torus.rotation.x += .003
          torus.rotation.y -= .003
        }
        animate()
      })
    return (
        <canvas ref={canvas}></canvas>
    )
}
