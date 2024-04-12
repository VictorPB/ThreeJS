// Imports of Three.js library
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Test1 extends THREE.Object3D {

    constructor(){
        super();

        let shape = new THREE.Shape();

        shape.lineTo(0,1);
        shape.lineTo(0.5,1);
        shape.quadraticCurveTo(1, 1, 1, 0.5);
        shape.lineTo(1,0);
        shape.lineTo(0,0);

        const extrudeSettings = { 
            depth: 0.3,
            steps: 1,
            bevelEnabled: true, 
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 10, 
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings );

        let material = new THREE.MeshNormalMaterial();

        //material.flatShading = true;
    	//material.needsUpdate = true;
        
        let mainMesh = new THREE.Mesh( geometry, material);


        let box1Geometry =  new THREE.BoxGeometry(1.5,0.3,1.5);
        box1Geometry.translate(0.5,0,0);
        let box1Mesh = new THREE.Mesh(box1Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box1Mesh);

        let box2Geometry =  new THREE.BoxGeometry(1.5,0.3,1.5);
        box2Geometry.rotateZ(Math.PI/2);
        box2Geometry.translate(0,0.5,0);
        let box2Mesh = new THREE.Mesh(box2Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box2Mesh);

        let box3Geometry =  new THREE.BoxGeometry(1.5,0.3,1.5);
        box3Geometry.rotateZ(Math.PI/2);
        box3Geometry.rotateY(Math.PI/2);
        box3Geometry.translate(0.8,1,0.15 );
        let box3Mesh = new THREE.Mesh(box3Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box3Mesh);


        let cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
        cylinderGeometry.rotateX(Math.PI/2);
        cylinderGeometry.translate(0.6,0.6,0.2);
        let cylinderMesh = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinderMesh);


        let cylinder2Geometry = new THREE.CylinderGeometry(0.08,0.04,0.1,32);
        cylinder2Geometry.scale(2,1,1);
        cylinder2Geometry.translate(0.6,0.2,0.15);
        let cylinder2Mesh = new THREE.Mesh(cylinder2Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(cylinder2Mesh);

        
        let csg = new CSG();
        csg.subtract([mainMesh,box1Mesh]); 
        csg.subtract([box2Mesh]); 
        csg.subtract([box3Mesh]);
        csg.subtract([cylinderMesh]);
        csg.subtract([cylinder2Mesh]); 
        
        let mesh = csg.toMesh();
        
        this.add (mesh);
    }

    update () {
		
    }
}

export { Test1 }