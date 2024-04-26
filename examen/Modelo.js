import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'


class Modelo extends THREE.Object3D {
    constructor() {
        super();
        
        let shape = new THREE.Shape();

        
        shape.moveTo(0.2, 0.8);
        shape.lineTo(1.3, 0.2);
        shape.quadraticCurveTo(1.5, 0, 1.3, -0.2);
        shape.lineTo(0.2,-0.8);
        shape.quadraticCurveTo(0, -0.9, -0.2, -0.8);
        shape.lineTo(-1.3,-0.2);
        shape.quadraticCurveTo(-1.5, 0, -1.3, 0.2);
        shape.lineTo(-0.2,0.8);
        shape.quadraticCurveTo(0, 0.9, 0.2, 0.8);
        
        let hole1 = new THREE.Shape();
        hole1.absarc(-1,0,0.2,0,Math.PI*2);
        shape.holes.push(hole1);

        let hole2 = new THREE.Shape();
        hole2.absarc(1,0,0.2,0,Math.PI*2);
        shape.holes.push(hole2);

        const extrudeSettings = { 
            depth: 0.3,
            steps: 1,
            bevelEnabled: true, 
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 10, 
        };

        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings );
        geometry.rotateX(Math.PI/2);

        let material = new THREE.MeshNormalMaterial();

        material.flatShading = true;
    	material.needsUpdate = true;
        
        let mainMesh = new THREE.Mesh( geometry, material);


        let box1Geometry =  new THREE.BoxGeometry(4,0.2,4);
        box1Geometry.translate(0,-0.4,0);
        let box1Mesh = new THREE.Mesh(box1Geometry, material);
        //this.add(box1Mesh);


        let cylinder1Geometry = new THREE.CylinderGeometry(0.5,0.5,0.15,24);
        cylinder1Geometry.translate(0,0.2,0);
        let cylinder1Mesh = new THREE.Mesh(cylinder1Geometry, material);
        //this.add(cylinder1Mesh);


        let cylinder2Geometry = new THREE.CylinderGeometry(0.2,0.2,3,24);
        cylinder2Geometry.translate(0,0.5,0);
        let cylinder2Mesh = new THREE.Mesh(cylinder2Geometry, material);
        //this.add(cylinder2Mesh);


        let torusGeometry = new THREE.TorusGeometry(0.5,0.1, 24,24, Math.PI*2);
        torusGeometry.rotateX(Math.PI/2);
        torusGeometry.translate(0,0.3,0);
        let torusMesh = new THREE.Mesh(torusGeometry, material);
        //this.add(torusMesh);


        let cylinder3Geometry = new THREE.CylinderGeometry(0.4,0.4,0.8,24);
        cylinder3Geometry.translate(0,0.5,0);
        let cylinder3Mesh = new THREE.Mesh(cylinder3Geometry, material);
        //this.add(cylinder3Mesh);
        

        let csg = new CSG();
        csg.union([mainMesh,cylinder1Mesh]);
        csg.subtract([torusMesh]);
        csg.union([cylinder3Mesh]);
        csg.subtract([box1Mesh]);
        csg.subtract([cylinder2Mesh]);


        let mesh = csg.toMesh();

        this.add (mesh);

    }

    update () {
		
    }
}

export { Modelo }