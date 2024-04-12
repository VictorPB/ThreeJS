// Imports of Three.js library
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class GasolineCan extends THREE.Object3D {

    constructor(){
        super();

        let mainBoxGeometry = new THREE.BoxGeometry(4,5,2);

        let mainBoxMaterial = new THREE.MeshPhongMaterial({color: 0xF80000});

        mainBoxMaterial.flatShading = true;
    	mainBoxMaterial.needsUpdate = true;

        let boxMesh = new THREE.Mesh( mainBoxGeometry, mainBoxMaterial);
        

        let box1Geometry =  new THREE.BoxGeometry(2,0.6,2.5);
        box1Geometry.translate(0.4,1.8,0);
        let box1Mesh = new THREE.Mesh(box1Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box1Mesh);

        let box2Geometry = new THREE.BoxGeometry(2,1,1);
        box2Geometry.translate(0.4,2.2,0.8);
        let box2Mesh = new THREE.Mesh( box2Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box2Mesh);

        let box3Geometry = new THREE.BoxGeometry(2,1,1);
        box3Geometry.translate(0.4,2.2,-0.8);
        let box3Mesh = new THREE.Mesh(box3Geometry, new THREE.MeshPhongMaterial({color: 0x00FF00}));
        //this.add(box3Mesh);

        let sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(3,32,32),mainBoxMaterial);

        let cylinderGeometry = new THREE.CylinderGeometry(0.1,0.3,2,32);
        cylinderGeometry.rotateZ(Math.PI/4);
        cylinderGeometry.translate(-2,2.6,0);
        let cylinderMesh = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}));
        this.add(cylinderMesh);

        let csg = new CSG();
        csg.intersect([boxMesh,sphereMesh]);
        csg.subtract([box1Mesh]);
        csg.subtract([box2Mesh]);
        csg.subtract([box3Mesh]);
        //csg.union([cylinderMesh]);


        let mesh = csg.toMesh();
        this.add (mesh);
    }

    update () {
		this.rotation.y += 0.01;
    }

}

export { GasolineCan };