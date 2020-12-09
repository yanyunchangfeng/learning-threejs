import * as THREE from 'three';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import  persCamera from '../../assets/img/camera.png'
let scene, camera, renderer, cube;
const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const texture = new THREE.TextureLoader().load(persCamera)
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0x009688 });
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
}


const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('')
}
const resize$ = fromEvent(window, 'resize').pipe(
    throttleTime(1000)
)
resize$.subscribe(_ => onWindowResize())
init();
animate();