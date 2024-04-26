import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Trophy extends THREE.Object3D {
    constructor() {
        super();

        let materialLoader = new MTLLoader();
        let objectLoader = new OBJLoader();

        materialLoader.load('../models/trophy/WinnerCup.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/trophy/WinnerCup.obj',
                    (object) => {
                        this.add(object);
                    }, null, null);
            });
    }


    update(){
        //this.rotation.y += 0.01;
    }

}

export { Trophy };









