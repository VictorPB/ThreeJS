import * as THREE from '../libs/three.module.js'

class Torus extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Torus GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var torusGeom = new THREE.TorusGeometry (0.5,0.3,3,3);
        var torusMat = new THREE.MeshNormalMaterial();

        torusMat.flatShading = true;
    	torusMat.needsUpdate = true;
        
        // We can now build the Mesh
        this.torus = new THREE.Mesh (torusGeom, torusMat);
        
        // And add it as a child of the Object3D (the this)
        this.add (this.torus);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of Torus radiusTop, radiusBottom, height and radialSegments
		this.guiControls = {
			radius : 1.0,
            tube : 0.3,
			radialSegments : 15.0,
			tubularSegments : 15.0,
			
			
			// Reset Button
			reset : () => {
				this.guiControls.radius = 0.5;
                this.guiControls.tube = 0.3;
				this.guiControls.radialSegments = 3.0;
				this.guiControls.tubularSegments = 3.0;
			}
      	}

        // Section for Torus controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'radius', 0.5, 3.0, 0.1).name ('Radius : ').listen();
        folder.add (this.guiControls, 'tube', 0.3, 2.0, 0.1).name ('Tube : ').listen();
		folder.add (this.guiControls, 'radialSegments', 3.0, 30.0, 1.0).name ('Radial Segments : ').listen();
		folder.add (this.guiControls, 'tubularSegments', 3.0, 30.0, 1.0).name ('Tubular Segments : ').listen();
		
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

        this.torus.geometry.dispose();
        this.torus.geometry = new THREE.TorusGeometry(this.guiControls.radius,
                                                     this.guiControls.tube,
                                                     this.guiControls.radialSegments, 
                                                     this.guiControls.tubularSegments);
    }

}

export { Torus };