import * as THREE from '../libs/three.module.js'

class LatheGeometry extends THREE.Object3D {
    constructor(gui,titleGui,points) {
        super();
        
        this.createGUI(gui,titleGui);

        this.points = points;

        let latheGeometry = new THREE.LatheGeometry( points, 12, 0, Math.PI*2 );
        let latheMaterial = new THREE.MeshNormalMaterial();

        latheMaterial.flatShading = true;
        latheMaterial.needsUpdate = true;

        this.lathe = new THREE.Mesh( latheGeometry, latheMaterial );
        this.add (this.lathe);
        
    }

    createGUI (gui,titleGui) {

        this.guiControls = {
        
            angle : 60,
            resolution : 12.0,

            reset : () => {
                this.guiControls.angle = 60;
                this.guiControls.resolution = 12.0;
                this.updateGeometry();
            }
        } 
        
        var folder = gui.addFolder (titleGui);

        folder.add(this.guiControls, 'angle', 0.1, 2*Math.PI, 0.1).name('Angle : ').listen().onChange( () => this.updateGeometry() );
        folder.add(this.guiControls, 'resolution', 3.0, 50.0, 1.0).name('Resolution : ').listen().onChange( () => this.updateGeometry() );
        folder.add(this.guiControls, 'reset').name ('[Reset]');

    }

    updateGeometry () {
        this.lathe.geometry.dispose(); 
        let newGeometry = new THREE.LatheGeometry(this.points, this.guiControls.resolution, 0, this.guiControls.angle );
        this.lathe.geometry = newGeometry;
    }
  
    update () {
    
    }
}

export { LatheGeometry };
