// Imports of Three.js library
import * as THREE from '../libs/three.module.js'

class Circuit extends THREE.Object3D {

    constructor(){
        super();

        //Points through which the pipe passes
        let pathPoints = [];

        
        



        //--------------------Spiral segment--------------------
        let spiralHeigth = 10;
        let spiralRadius = 1.5;
        let spiralHeigthSegments = 5;
        let spiralSegments = spiralRadius*(2.0 * Math.PI);  

        for(let j=0; j<spiralHeigthSegments; j++){
            for (let i = 0; i <= spiralSegments; i++) {
                let theta = (i / spiralSegments) * 2.0 * Math.PI;
                let x = spiralRadius * Math.cos(theta);
                let z = spiralRadius * Math.sin(theta);
                let y = (spiralHeigth/spiralSegments)*i + j*spiralHeigth;
                pathPoints.push(new THREE.Vector3(x, y, z));
            }
        }
        //------------------------------------------------------

        pathPoints.push(new THREE.Vector3(15,50,20));

        //--------------------ZigZag segment--------------------
        /*let zigzagRadius = 1.5;
        let zigzagSegments = 8;
        for(let i=50; i>0; i = i - 0.1){
            let theta =  (i / zigzagSegments) * 2.0 * Math.PI;
            let x = zigzagRadius * Math.sin(theta);
            pathPoints.push(new THREE.Vector3(20+x, i, -10));
        }
        */
        //------------------------------------------------------

        pathPoints.push(new THREE.Vector3(15,-20,20));
        pathPoints.push(new THREE.Vector3(20,-20,0));
        pathPoints.push(new THREE.Vector3(20,20,0));
        pathPoints.push(new THREE.Vector3(0,20,20));
        pathPoints.push(new THREE.Vector3(0,0,30));
        pathPoints.push(new THREE.Vector3(20,0,40));
        pathPoints.push(new THREE.Vector3(30,0,30));
        

        let path = new THREE.CatmullRomCurve3(pathPoints,true);//true to close the curve


        let resolution = 200;
        let radius = 1;
        let segmentosCirculo = 20;
        let closed = false;
        
        let tubeGeometria = new THREE.TubeGeometry(path,resolution,radius,segmentosCirculo,closed) ;

        let tubeMaterial = new THREE.MeshNormalMaterial();

        tubeMaterial.flatShading = true;
    	tubeMaterial.needsUpdate = true;

        const mesh = new THREE.Mesh( tubeGeometria, tubeMaterial);        
        
        this.add (mesh);

    }


    update () {
		//this.rotation.y += 0.01;
    }

}

export { Circuit };