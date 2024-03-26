// Imports of Three.js libraryç
import * as THREE from '../libs/three.module.js'

class Lightning extends THREE.Object3D {

    constructor(){
        super();

        const lightningShapePoints = [
            new THREE.Vector2(2, 4),
            new THREE.Vector2(-1, 4),
            new THREE.Vector2(-4.5, -2),
            new THREE.Vector2(-2, -2),
            new THREE.Vector2(-4, -8),
            new THREE.Vector2(2.8, 0),
            new THREE.Vector2(0, 0),
        ];


        const lightningShape = new THREE.Shape(lightningShapePoints);

        const extrudeSettings = { 
            depth: 1, 
            bevelEnabled: true, 
            bevelSegments: 5, 
            steps: 2, 
            bevelSize: 1, 
            bevelThickness: 1 
        };

        const geometry = new THREE.ExtrudeGeometry(lightningShape, extrudeSettings );

        let lightningMaterial = new THREE.MeshNormalMaterial();

        lightningMaterial.flatShading = true;
    	lightningMaterial.needsUpdate = true;

        const mesh = new THREE.Mesh( geometry, lightningMaterial);        
        
        this.add (mesh);

    }


    update () {
		this.rotation.y += 0.01;
    }

}

export { Lightning };