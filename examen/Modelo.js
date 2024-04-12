import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'


class Modelo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        
        let shape = new THREE.Shape();

        //shape.lineTo(0,1);
        //shape.lineTo(0.5,1);
        //shape.quadraticCurveTo(1, 1, 1, 0.5);
        //shape.lineTo(1,0);
        //shape.lineTo(0,0);

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

        material.flatShading = true;
    	material.needsUpdate = true;
        
        let mainMesh = new THREE.Mesh( geometry, material);


        let csg = new CSG();



        let mesh = csg.toMesh();

        this.add (mainMesh);

    }

    update () {
		
    }
}

export { Modelo }