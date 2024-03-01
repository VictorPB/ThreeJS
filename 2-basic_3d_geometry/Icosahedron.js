import * as THREE from '../libs/three.module.js'

class Icosahedron extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Icosahedron GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var icosahedronGeom = new THREE.IcosahedronGeometry (0.5, 0);
        var icosahedronMat = new THREE.MeshNormalMaterial();

        icosahedronGeom.flatShading = true;
    	icosahedronMat.needsUpdate = true;

        // We can now build the Mesh
        this.icosahedron = new THREE.Mesh (icosahedronGeom, icosahedronMat);
        
        // And add it as a child of the Object3D (the this)
        this.add (this.icosahedron);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of Icosahedron radiusTop, radiusBottom, height and radialSegments
		this.guiControls = {
			radius : 1.0,
            detail : 0.0,
		
			
			// Reset Button
			reset : () => {
				this.guiControls.radius = 1.0;
                this.guiControls.detail = 0.0;
			}
      	}

        // Section for Icosahedron controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'radius', 0.2, 2.0, 0.01).name ('Radius : ').listen();
        folder.add (this.guiControls, 'detail', 0.0, 3.0, 1.0).name ('Detail : ').listen();		
		
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

        this.icosahedron.geometry.dispose();
        this.icosahedron.geometry = new THREE.IcosahedronGeometry(this.guiControls.radius,
                                                                  this.guiControls.detail);
    }

}

export { Icosahedron };