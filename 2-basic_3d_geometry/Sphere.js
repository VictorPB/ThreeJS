import * as THREE from '../libs/three.module.js'

class Sphere extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Sphere GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var sphereGeom = new THREE.SphereGeometry (1,3,2);
        var sphereMat = new THREE.MeshNormalMaterial();

        sphereMat.flatShading = true;
    	sphereMat.needsUpdate = true;
        
        // We can now build the Mesh
        this.sphere = new THREE.Mesh (sphereGeom, sphereMat);
        
        // And add it as a child of the Object3D (the this)
        this.add (this.sphere);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of sphere radiusTop, radiusBottom, height and radialSegments
		this.guiControls = {
			radius : 1.0,
            widthSegments : 15.0,
			heightSegments : 15.0,
		
			
			// Reset Button
			reset : () => {
				this.guiControls.radius = 1.0;
                this.guiControls.widthSegments = 3.0;
                this.guiControls.heightSegments = 2.0;
			}
      	}

        // Section for sphere controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'radius', 0.2, 2.0, 0.01).name ('Radius : ').listen();
        folder.add (this.guiControls, 'widthSegments', 3.0, 30.0, 2.0).name ('Width Segments : ').listen();
		folder.add (this.guiControls, 'heightSegments', 2.0, 30.0, 2.0).name ('Height Segments : ').listen();
		
		
		folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update () {
        // Regardless of how the next 3 lines are written, 
        //the order in which the transformations are applied is:
		// First, the scaling
		// Second, the Z-rotation
		// Then, the Y rotation
		// Then, the rotation in X
		// And finally the translation

		this.rotation.x += 0.01;
		this.rotation.y += 0.01;
		this.rotation.z += 0.01;

        this.sphere.geometry.dispose();
        this.sphere.geometry = new THREE.SphereGeometry(this.guiControls.radius,
                                                        this.guiControls.widthSegments,
                                                        this.guiControls.heightSegments);
    }

}

export { Sphere };