import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as lilgui from "lil-gui"; //calculations
import { gsap } from "gsap";

//lilgui
const gui = new lilgui.GUI();

//canvas

const canvas = document.querySelector("canvas");

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  45, //Filed of view
  window.innerWidth / window.innerHeight, //Aspect Ratio
  0.1, //Near
  1000 // Far
);
//initial position of the camera
camera.position.set(3.1624410841311392,  3.8445964497229212,-4.645728276919345);
camera.rotation.set(-2.796265871608126, 0.7742558871016998, 2.8951786027994566);
 
//script.js:49 Euler {_x: -2.796265871608126, _y: 0.7742558871016998, _z: 2.8951786027994566, _order: 'XYZ', _onChangeCallback: ƒ}
//Vector3 {x: 3.1624410841311392, y: 3.8445964497229212, z: -4.645728276919345
//script.js:49 Euler {_x: -2.5167159387065925, _y: 0.585193531441967, _z: 2.76245242687245, _order: 'XYZ', _onChangeCallback: ƒ}
//Vector3 {x: -4.063603000512465, y: 2.93899266712148, z: 2.6516206690630533}
//Renderer:A renderer in the context of Three.js is responsible for taking the 3D scene and rendering it onto a 2D surface, typically a web browser window or a canvas element.
const renderer = new THREE.WebGLRenderer({  //webGlrenderer convert 3d to 2d on canvas
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true; // smooth camera  movements

 
let position =0;

// //gltf loader
const gltfLoader = new GLTFLoader();
gltfLoader.load('/model/swedish-royal/scene.gltf',(gltf)=>{
console.log('Our model here! ',gltf);
    const model = gltf.scene;
    scene.add(model);

  //   window.addEventListener("mouseup",function()
  // {
  //   console.log(camera.position);
  //   console.log(camera.rotation);

  // });

 

  window.addEventListener("mouseup",function(){
    switch(position)
    {
      case 0:
        cameraMovement(-5.119305057946188,2.7784292406577493,1.9589340573173262);
        cameraRotation(-0.9566885293635212,-0.9845941982907944,-0.8684243876745986);
        position=1;
        break;
      case 1:
        cameraMovement(-1.2402597668439481,3.9218474275014357, -2.0894551177791953);
        cameraRotation( -2.863814895501733,-1.1436309888389247,-2.887667342745716);
        position=2;
        break;
        
      case 2:
        cameraMovement(0.7886209708600742,1.2312201514145196,0.2971890935646854);
        cameraRotation(1.2991821530937224,0.2171517484806233,-0.6584439671464695);
        position=3;
        break;

   case 3:
        cameraMovement(1.2197691182782422,3.4318829781810276,0.22590663728133664);
        cameraRotation(-0.07349322348900704,0.83837244660215743, 0.054690319893499895);
        position=0;
         
        
    }
  });

 
});


function cameraMovement(x,y,z)
{
  gsap.to(camera.position,{
    x,
    y,
    z,
    duration:3,
    
  });
}
function cameraRotation(x,y,z)
{
  gsap.to(camera.rotation,
    { 
   
    x,
    y,
    z,
    duration:3,
  });
}


const animate = () => {
    renderer.render(scene,camera);
    window.requestAnimationFrame(animate);
   // controls.update();
};

animate();