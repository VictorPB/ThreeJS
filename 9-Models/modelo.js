
import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class modelo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // necesitamos las bibliotecas MTLLoader() y OBJLoader()
    var that = this;
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();

    /*materialLoader.load('..models/porsche911/911.mtl', 
          (materials) => {

            objectLoader.setMaterials(materials);
            objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                  (object) => {

                    this.modelo = object;
                    this.add(this.modelo);
                  }, null, null);
    });*/

    /*materialLoader.load('../models/porsche911/911.mtl',

      function(materials){

        objectLoader.setMaterials(materials);
        objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
      function(object){

        var m = object;
        that.add(m);
      }, null, null);
    });*/

    /*materialLoader.load('../models/ironman/IronMan.mtl',

      function(materials){

        objectLoader.setMaterials(materials);
        objectLoader.load('../models/ironman/IronMan.obj',
      function(object){

        var m = object;
        that.add(m);
      }, null, null);
    });*/

    materialLoader.load('../models/heli/Seahawk.mtl',

      function(materials){

        objectLoader.setMaterials(materials);
        objectLoader.load('../models/heli/Seahawk.obj',
      function(object){

        var m = object;
        that.add(m);
      }, null, null);
    });

    this.position.y = 0.6;
    this.scale.set(0.1, 0.1, 0.1);
    
  }


  createGUI(gui,titleGui){

    this.guiControls = {

      animacion : false,
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'animacion').name ('Animación : ');
  }


  update(){

    if( this.guiControls.animacion ){

      this.rotation.y += 0.01;
    }
  }

}

export { modelo };









