// Imports of Three.js libraryç
import * as THREE from '../libs/three.module.js'

class Heart extends THREE.Object3D {

    constructor(){
        super();

        const heartShape = new THREE.Shape();

        heartShape.moveTo( 2.5, 2.5 );
        heartShape.bezierCurveTo( 2.5, 2.5, 2.0, 0, 0, 0 );
        heartShape.bezierCurveTo( - 3.0, 0, - 3.0, 3.5, - 3.0, 3.5 );
        heartShape.bezierCurveTo( - 3.0, 5.5, - 1.0, 7.7, 2.5, 9.5 );
        heartShape.bezierCurveTo( 6.0, 7.7, 8.0, 5.5, 8.0, 3.5 );
        heartShape.bezierCurveTo( 8.0, 3.5, 8.0, 0, 5.0, 0 );
        heartShape.bezierCurveTo( 3.5, 0, 2.5, 2.5, 2.5, 2.5 );

        const extrudeSettings = { 
            depth: 1, 
            bevelEnabled: true, 
            bevelSegments: 2, 
            steps: 2, 
            bevelSize: 1, 
            bevelThickness: 1 
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings );

        let heartMaterial = new THREE.MeshNormalMaterial()

        heartMaterial.flatShading = true;
    	heartMaterial.needsUpdate = true;

        const mesh = new THREE.Mesh( geometry, heartMaterial);        
        this.rotation.z = Math.PI;

        this.add (mesh);

    }


    update () {
        
		this.rotation.y += 0.01;

    }

}

export { Heart };