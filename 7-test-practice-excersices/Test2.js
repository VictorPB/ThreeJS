import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Test2 extends THREE.Object3D {

    constructor(){
        super();

        let shape = new THREE.Shape();

        shape.moveTo(-1.2,1);
        shape.lineTo(1.2,1);
        shape.quadraticCurveTo(1.5, 1, 1.5, 0.8);
        shape.lineTo(1.5,-0.8);
        shape.quadraticCurveTo(1.5, -1, 1.2, -1);
        shape.lineTo(-1.2,-1);
        shape.quadraticCurveTo(-1.5, -1, -1.5, -0.8);
        shape.lineTo(-1.5,0.8);
        shape.quadraticCurveTo(-1.5, 1, -1.2, 1);

        let hole1 = new THREE.Shape();
        hole1.absarc(-0.5,-0.7,0.2,0,Math.PI*2);
        shape.holes.push(hole1);

        let hole2 = new THREE.Shape();
        hole2.absarc(-0.5,0.7,0.2,0,Math.PI*2);
        shape.holes.push(hole2);

        const extrudeSettings = { 
            depth: 0.2,
            steps: 1,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 10,
        };

        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings );
        geometry.rotateX(Math.PI/2);

        let material = new THREE.MeshNormalMaterial();

        //material.flatShading = true;
    	//material.needsUpdate = true;

        let mainMesh = new THREE.Mesh( geometry, material);


        let cylinderGeometry = new THREE.CylinderGeometry(0.3,0.3,2,32);
        cylinderGeometry.translate(-1,0.2,0);
        let cylinderMesh = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinderMesh);


        let cylinder2Geometry = new THREE.CylinderGeometry(0.3,0.3,4,32);
        cylinder2Geometry.translate(1,0.2,0);       
        let cylinder2Mesh = new THREE.Mesh(cylinder2Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinder2Mesh);


        let sphereGeometry = new THREE.SphereGeometry(0.5,20,20,0,Math.PI*2);
        sphereGeometry.translate(-1,0.2,0);
        let sphereMesh = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(sphereMesh);


        let cylinder5Geometry = new THREE.CylinderGeometry(0.5,0.5,1,32);
        cylinder5Geometry.rotateZ(Math.PI/2);
        cylinder5Geometry.translate(-1.5,0.2,0);
        let cylinder5Mesh = new THREE.Mesh(cylinder5Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinder5Mesh);


        let cylinder3Geometry = new THREE.CylinderGeometry(0.6,0.6,1,32);
        cylinder3Geometry.translate(0.2,0.4,0);
        let cylinder3Mesh = new THREE.Mesh(cylinder3Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinder3Mesh);


        let cylinder4Geometry = new THREE.CylinderGeometry(0.4,0.4,1,32);
        cylinder4Geometry.translate(1,0.4,0);
        let cylinder4Mesh = new THREE.Mesh(cylinder4Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinder4Mesh);


        let box1Geometry =  new THREE.BoxGeometry(0.8,0.8,0.8);
        box1Geometry.translate(0.6,0.4,0);
        let box1Mesh = new THREE.Mesh(box1Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box1Mesh);


        let box2Geometry =  new THREE.BoxGeometry(2.2,1,1.5);
        box2Geometry.translate(0.17,1.12,0);
        box2Geometry.rotateZ(-Math.PI/10);
        let box2Mesh = new THREE.Mesh(box2Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box2Mesh);


        let csg = new CSG();
       
        csg.union([mainMesh,cylinder3Mesh]);
        csg.union([cylinder4Mesh]);
        csg.union([box1Mesh]);
        csg.subtract([box2Mesh]);
        csg.subtract([cylinderMesh]);
        csg.subtract([cylinder2Mesh]);
        csg.subtract([sphereMesh]);
        csg.subtract([cylinder5Mesh]);

        let mesh = csg.toMesh();
        
        this.add (mesh);
    }

    update () {
		
    }
}

export { Test2 }