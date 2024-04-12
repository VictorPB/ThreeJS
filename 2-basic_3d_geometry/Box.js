// Imports of Three.js library
import * as THREE from '../libs/three.module.js'

class Box extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Box GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var boxGeom = new THREE.BoxGeometry (1,1,1);
        var boxMat = new THREE.MeshNormalMaterial();

		boxMat.flatShading = true;
    	boxMat.needsUpdate = true;
        
        // We can now build the Mesh
        var box = new THREE.Mesh (boxGeom, boxMat);
        
        // And add it as a child of the Object3D (the this)
        this.add (box);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of box size, orientation and position
		this.guiControls = {
			sizeX : 1.5,
			sizeY : 1.5,
			sizeZ : 1.5,
			
			
			// Reset Button
			reset : () => {
				this.guiControls.sizeX = 1.0;
				this.guiControls.sizeY = 1.0;
				this.guiControls.sizeZ = 1.0;
			}
      	}

        // Section for box controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Size X : ').listen();
		folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Size Y : ').listen();
		folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Size Z : ').listen();
		
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
		this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    }

}

export { Box };