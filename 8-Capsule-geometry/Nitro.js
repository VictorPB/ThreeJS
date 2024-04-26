// Imports of Three.js library
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Nitro extends THREE.Object3D {

    constructor(){
        super();

        let nitroGeometry = new THREE.CapsuleGeometry( 1, 3, 10, 10 ); 
        let nitroMaterial = new THREE.MeshPhongMaterial({color: 0x28AEE4}); 
        
        nitroMaterial.flatShading = true;
    	nitroMaterial.needsUpdate = true;
        
        let nitroMesh = new THREE.Mesh( nitroGeometry, nitroMaterial );
        this.add(nitroMesh);

        let cylinderGeometry = new THREE.CylinderGeometry(0.1,0.1,0.3,32);
        cylinderGeometry.translate(0,2.6,0);
        let cylinderMaterial = new THREE.MeshPhongMaterial({color: 0xF4EBE8});
        let cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this.add(cylinderMesh);
        

        let capsule1Geometry = new THREE.CapsuleGeometry( 0.1, 0.5, 6, 6 );
        capsule1Geometry.rotateX(Math.PI/2);
        capsule1Geometry.rotateY(Math.PI/2);
        capsule1Geometry.translate(0,2.8,0);
        let capsule1Material = new THREE.MeshPhongMaterial({color: 0xD11149});
        let capsule1Mesh = new THREE.Mesh(capsule1Geometry, capsule1Material);
        this.add(capsule1Mesh);

        let capsule2Geometry = new THREE.CapsuleGeometry( 0.1, 0.5, 6, 6 );
        capsule2Geometry.rotateX(Math.PI/2);
        capsule2Geometry.translate(0,2.8,0);
        let capsule2Mesh = new THREE.Mesh(capsule2Geometry, capsule1Material);
        this.add(capsule2Mesh);

    }


    update () {
		this.rotation.y += 0.01;
    }

}

export { Nitro };