import * as THREE from '../libs/three.module.js'

class Cylinder extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Cylinder GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var cylinderGeom = new THREE.CylinderGeometry (1,1,1,3);
        var cylinderMat = new THREE.MeshNormalMaterial();

        cylinderMat.flatShading = true;
    	cylinderMat.needsUpdate = true;
        
        // We can now build the Mesh
        this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
        
        // And add it as a child of the Object3D (the this)
        this.add (this.cylinder);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of cylinder radiusTop, radiusBottom, height and radialSegments
		this.guiControls = {
			radiusTop : 0.5,
            radiusBottom : 0.5,
			height : 3.0,
			radialSegments : 15.0,
			
			
			// Reset Button
			reset : () => {
				this.guiControls.radiusTop = 1.0;
                this.guiControls.radiusBottom = 1.0;
				this.guiControls.height = 1.0;
				this.guiControls.radialSegments = 3.0;
			}
      	}

        // Section for cylinder controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'radiusTop', 0.2, 2.0, 0.01).name ('Top radius : ').listen();
        folder.add (this.guiControls, 'radiusBottom', 0.2, 2.0, 0.01).name ('Botton radius : ').listen();
		folder.add (this.guiControls, 'height', 1.0, 6.0, 0.1).name ('Height : ').listen();
		folder.add (this.guiControls, 'radialSegments', 3.0, 30.0, 2.0).name ('RadialSegments : ').listen();
		
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

        this.cylinder.geometry.dispose();
        this.cylinder.geometry = new THREE.CylinderGeometry(this.guiControls.radiusTop,
                                                            this.guiControls.radiusBottom,
                                                            this.guiControls.height, 
                                                            this.guiControls.radialSegments);
    }

}

export { Cylinder };