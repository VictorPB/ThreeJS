import * as THREE from '../libs/three.module.js'

class Cone extends THREE.Object3D {

    constructor(gui,titleGui){
        super();

        // Cone GUI
        // It is created first because other methods use the variables that are defined for the interface.
        this.createGUI(gui,titleGui);
        
        // A Mesh is made up of geometry and material
        var coneGeom = new THREE.ConeGeometry (1,1,3);
        var coneMat = new THREE.MeshNormalMaterial();
        
        // We can now build the Mesh
        this.cone = new THREE.Mesh (coneGeom, coneMat);

		this.axis = new THREE.AxesHelper (2);   // And some axes
        this.add (this.axis);
        
        // And add it as a child of the Object3D (the this)
        this.add (this.cone);

        // Geometries are created centered on the origin.
    }

    createGUI (gui,titleGui) {
        // Data structure for controls of cone radius, height and radialSegments
		this.guiControls = {
			radius : 1.0,
			height : 1.0,
			radialSegments : 3.0,
			
			
			// Reset Button
			reset : () => {
				this.guiControls.radius = 1.0;
				this.guiControls.height = 1.0;
				this.guiControls.radialSegments = 3.0;
			}
      	}

        // Section for cone controls
		var folder = gui.addFolder (titleGui);
		// These lines are the ones that add the interface components
		// The three digits indicate a minimum, maximum and increment value
		// The listen() method allows that if the value of the variable is changed in code, the interface slider is updated.
		folder.add (this.guiControls, 'radius', 0.2, 2.0, 0.01).name ('Radius : ').listen();
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

        this.cone.geometry.dispose();
        this.cone.geometry = new THREE.ConeGeometry(this.guiControls.radius, this.guiControls.height, this.guiControls.radialSegments);
    }

}

export { Cone };