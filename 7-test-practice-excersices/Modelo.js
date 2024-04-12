import * as THREE from 'three'
import { CSG } from '../libs/CSG-v2.js'

// ROJO X
// VERDE Y
// AZUL Z

class Modelo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui, titleGui);

    // El material se usa desde varios métodos. Por eso se alamacena en un atributo
    this.material = new THREE.MeshNormalMaterial({ flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });
    this.materialSubtract = new THREE.MeshPhysicalMaterial({ color: 0x008000, flatShading: true, side: THREE.DoubleSide, transparent: false, opacity: 0.5 });

    this.createShapeBase();


  }

  createShapeBase() {
    var figBaseShape = new THREE.Shape();
    figBaseShape.moveTo(-5.5, -7);
    figBaseShape.lineTo(5.5, -7);
    figBaseShape.lineTo(5.5, 7);
    figBaseShape.lineTo(-5.5, 7);
    figBaseShape.lineTo(-5.5, -7);

    var hole1 = new THREE.Shape();
    hole1.moveTo(-4.5, -3);
    hole1.quadraticCurveTo(-4.5, -4, -3.5, -4);
    hole1.quadraticCurveTo(-2.5, -4, -2.5, -3);
    hole1.quadraticCurveTo(-2.5, -2, -3.5, -2);
    hole1.quadraticCurveTo(-4.5, -2, -4.5, -3);


    figBaseShape.holes.push(hole1);

    var hole2 = new THREE.Shape();
    hole2.moveTo(4.5, -3);
    hole2.quadraticCurveTo(4.5, -2, 3.5, -2);
    hole2.quadraticCurveTo(2.5, -2, 2.5, -3);
    hole2.quadraticCurveTo(2.5, -4, 3.5, -4);
    hole2.quadraticCurveTo(4.5, -4, 4.5, -3);

    figBaseShape.holes.push(hole2);

    const extrudeSettings = {
      steps: 5, // Número de divisiones a lo largo de la extrusión
      depth: 0.5, // Profundidad de la extrusión
      bevelEnabled: true, // Desactivar el bisel para obtener una extrusión plana
      bevelThickness: 0.50, // Grosor del bisel
      bevelSize: 0.25, // Tamaño del bisel
      bevelSegments: 30 // Número de segmentos del bisel
    };

    var figBaseGeometry = new THREE.ExtrudeGeometry(figBaseShape, extrudeSettings);
    this.figBase = new THREE.Mesh(figBaseGeometry, this.material);
    //this.add(this.figBase);

    // =============================================================================

    // Hueco en la base
    var figBorrarShape = new THREE.Shape();
    figBorrarShape.moveTo(2, 2);
    figBorrarShape.lineTo(2, 6);
    figBorrarShape.quadraticCurveTo(2, 8, 0, 8);
    figBorrarShape.quadraticCurveTo(-2, 8, -2, 6);
    figBorrarShape.lineTo(-2, 2);

    const extrudeSettings2 = {
      steps: 5, // Número de divisiones a lo largo de la extrusión
      depth: 5, // Profundidad de la extrusión
      bevelEnabled: true, // Desactivar el bisel para obtener una extrusión plana
      bevelThickness: 0.50, // Grosor del bisel
      bevelSize: 0.25, // Tamaño del bisel
      bevelSegments: 30 // Número de segmentos del bisel
    };

    var figBorrarGeometry = new THREE.ExtrudeGeometry(figBorrarShape, extrudeSettings2);
    figBorrarGeometry.scale(0.9, 1, 1);
    figBorrarGeometry.translate(0, -11, 0.55);
    var figBorrar = new THREE.Mesh(figBorrarGeometry, this.materialSubtract);
    //this.add(figBorrar);


    // =============================================================================

    var baseCSG = new CSG();
    var base = baseCSG.subtract([this.figBase, figBorrar]);
    this.baseFinal = new THREE.Mesh(base.toGeometry(), this.material);

    //this.add(this.baseFinal);


    // =============================================================================

    // Hueco en la base
    var cilGeometryBot = new THREE.CylinderGeometry(1, 1, 15, 20);
    cilGeometryBot.translate(0, 0, -4);
    cilGeometryBot.rotateX(Math.PI / 2);
    var cilMeshBot = new THREE.Mesh(cilGeometryBot, this.materialSubtract);
    //this.add(cilMeshBot);

    var cilGeometryTop = new THREE.CylinderGeometry(1, 1, 15, 20);
    cilGeometryTop.translate(0, 0, 4.5);
    cilGeometryTop.rotateX(Math.PI / 2);
    var cilMeshTop = new THREE.Mesh(cilGeometryTop, this.materialSubtract);
    //this.add(cilMeshTop);

    var cilsCSG = new CSG();

    var cilWithBase = cilsCSG.union([cilMeshBot, cilMeshTop]);
    var cilindros = new THREE.Mesh(cilWithBase.toGeometry(), this.materialSubtract);
    //this.add(cilindros);

    // =============================================================================

    // Figura top

    var cilGeometry = new THREE.CylinderGeometry(1.5, 1.5, 5, 20);
    var cilMesh = new THREE.Mesh(cilGeometry, this.materialSubtract);
    //this.add(cilMesh);

    var figTopShape = new THREE.Shape();
    figTopShape.moveTo(2, 2);
    figTopShape.lineTo(2, 6);
    figTopShape.quadraticCurveTo(2, 8, 0, 8);
    figTopShape.quadraticCurveTo(-2, 8, -2, 6);
    figTopShape.lineTo(-2, 2);

    const extrudeSettings3 = {
      steps: 20, // Número de divisiones a lo largo de la extrusión
      depth: 5, // Profundidad de la extrusión
      bevelEnabled: false, // Desactivar el bisel para obtener una extrusión plana
    };

    var figTopGeometry = new THREE.ExtrudeGeometry(figTopShape, extrudeSettings3);
    figTopGeometry.scale(0.6, 0.6, 0.6);
    figTopGeometry.rotateX(Math.PI / 2);
    figTopGeometry.translate(0, 0.5, -1);
    this.figTop = new THREE.Mesh(figTopGeometry, this.material);
    //this.add(this.figTop);

    var cilWithShapeCSG = new CSG();
    var top = cilWithShapeCSG.union([this.figTop, cilMesh]);
    var figuraTop = new THREE.Mesh(top.toGeometry(), this.material);
    figuraTop.rotateY(-Math.PI / 2);
    //this.add(figuraTop);

    // =============================================================================

    // Box que se resta
    var box = new THREE.BoxGeometry(7, 5, 5);
    box.translate(-1, 0.85, -0.5);
    box.rotateZ(Math.PI / 15);
    var boxMesh = new THREE.Mesh(box, this.materialSubtract);
    //this.add(boxMesh);

    // =============================================================================

    var figTopCSG = new CSG();
    var final = figTopCSG.subtract([figuraTop, boxMesh]);

    var qqq = final.toGeometry();
    qqq.rotateY(-Math.PI / 2);
    this.finalTop = new THREE.Mesh(qqq, this.material);
    this.finalTop.scale.set(1.7, 1.7, 1.7);
    this.finalTop.rotateX(Math.PI / 2);
    //this.add(this.finalTop);

    // =============================================================================

    var figuraCSG = new CSG();
    var figurasCompleta = figuraCSG.subtract([this.baseFinal, cilindros]);
    var figurasComp = new THREE.Mesh(figurasCompleta.toGeometry(), this.material);
    //this.add(figurasComp);

    var completoCSG = new CSG();
    var completo = completoCSG.subtract([this.finalTop, cilindros]);
    var finalCompleto = new THREE.Mesh(completo.toGeometry(), this.material);
    finalCompleto.position.z = 5.25;
    this.add(finalCompleto);

    // =============================================================================

    var boxBorrar = new THREE.BoxGeometry(13, 15, 1);
    boxBorrar.translate(0, 0, -0.85);
    var boxBorrarMesh = new THREE.Mesh(boxBorrar, this.materialSubtract);
    //this.add(boxBorrarMesh);


    var FIGFINAL = new CSG();
    var finalFinal = FIGFINAL.subtract([figurasComp, boxBorrarMesh]);
    var final = new THREE.Mesh(finalFinal.toGeometry(), this.material);
    this.add(final);
  }

  createGUI(gui, titleGui) {
    // Sin implementar
  }

  update() {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Modelo }
