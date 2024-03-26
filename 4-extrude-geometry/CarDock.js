// Imports of Three.js libraryç
import * as THREE from '../libs/three.module.js'

class CarDock extends THREE.Object3D {

    constructor(){
        super();

        let segments = 5*(2.0 * Math.PI);
        let radius = 0.5;
        const circleShapePoints = [];

        for (let i = 0; i <= segments; i++) {
            let theta = (i / segments) * 2.0 * Math.PI;
            let x = radius * Math.cos(theta);
            let y = radius * Math.sin(theta);
            circleShapePoints.push(new THREE.Vector2(x, y));
        }

        const circleShape = new THREE.Shape(circleShapePoints);
        

        let heigth = 2;
        let spiralRadius = 2;
        let spiralHeigthSegments = 4;
        let spiralPoints = [];

        for(let j=0; j<spiralHeigthSegments; j++){
            for (let i = 0; i <= segments; i++) {
                let theta = (i / segments) * 2.0 * Math.PI;
                let x = spiralRadius * Math.cos(theta);
                let z = spiralRadius * Math.sin(theta);
                let y = (heigth/segments)*i + j*heigth;
                spiralPoints.push(new THREE.Vector3(x, y, z));
            }
        }


        let path = new THREE.CatmullRomCurve3(spiralPoints);
        
        const extrudeSettings = {  
            steps: 200, 
            curveSegments: 50,
            extrudePath: path,
        };

        const CarDockGeometry = new THREE.ExtrudeGeometry(circleShape, extrudeSettings );

        let CarDockMaterial = new THREE.MeshNormalMaterial();

        CarDockMaterial.flatShading = true;
    	CarDockMaterial.needsUpdate = true;

        const mesh = new THREE.Mesh( CarDockGeometry, CarDockMaterial);        
        
        this.add (mesh);

    }


    update () {
		this.rotation.y += 0.01;
    }

}

export { CarDock };