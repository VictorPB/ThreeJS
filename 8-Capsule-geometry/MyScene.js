// Imports of Three.js library
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'

// Classes for the scene
import { Nitro } from './Nitro.js'


// We will use a class derived from Three.js Scene class to manage the scene and everything that happens in it.
class MyScene extends THREE.Scene {
    constructor (myCanvas) {
    
        super();
        
        // First, create the viewer, passing the canvas on which to render.
        //The canvas is the place where the scene will be rendered in the html.
        this.renderer = this.createRenderer(myCanvas);
        
        
        // GUI to manipulate the elements of the scene
        this.gui = this.createGUI ();
        
        //Initialization of the stats object
        this.initStats();


        // We build the different elements that we will have in the scene.
        // Every element that is to be taken into account in the rendering of the scene must belong to it.
        // Either as a child of the scene (this in this class) or as a child of an element that is already in the scene.
        // After creating each element, it will be added to the scene with this.add(variable)
        

        // For our scene, we will have a set of elements:

        this.createLights ();                   // We will have a set of lights
        this.createCamera ();                   // We will have a camera with mouse movement control  
        //this.createGround ();                   // We will have a ground
        this.axis = new THREE.AxesHelper (2);   // And some axes
        this.add (this.axis);
        
        
        // Finally we create and add the models to the scene.

        // The model can include its part of the user interface. We pass the reference to
        // the gui and the text under which the interface controls that the model adds will be grouped.
        this.nitro = new Nitro();
        this.nitro.position.set (0,0,0);
        this.add (this.nitro);

    }
  
    initStats() {
    
        var stats = new Stats();
        
        stats.setMode(0); // 0: fps, 1: ms
        
        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        
        $("#Stats-output").append( stats.domElement );
        
        this.stats = stats;
    }
  
    createCamera () {

        // Creating Camera

        // Creating a perspective camera
        let fov = 45;   // Field of view, in sexagesimal degrees
        let aspectRatioScreen = window.innerWidth / window.innerHeight;
        let frustumNearPlane = 0.1;//Distance units are in meters
        let frustumFarPlane = 100;
        this.camera = new THREE.PerspectiveCamera(fov, aspectRatioScreen, frustumNearPlane, frustumFarPlane);

        // Set camera position
        this.camera.position.set (30, 5, 20);

        // Set where the camera is looking
        var cameraSpotlight = new THREE.Vector3 (0,0,0);
        this.camera.lookAt(cameraSpotlight);
        
        // Add the camera to the scene
        this.add(this.camera);
        

        // Camera Control

        // To control the camera we use a class that has already implemented the orbit motions
        this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
        // Camera Movement speed
        this.cameraControl.rotateSpeed = 5;
        this.cameraControl.zoomSpeed = -2;
        this.cameraControl.panSpeed = 0.5;
        // Set Camera orbit respect the cameraSpotlight
        this.cameraControl.target = cameraSpotlight;
    }
  
    createGround () {
        // The ground is a Mesh, it needs a geometry and a material.
        
        // The geometry is a box with very low height.
        let groundWidth = 10;
        let groundHeight = 0.2;
        let groundDepth = 10;
        var geometryGround = new THREE.BoxGeometry (groundWidth,groundHeight,groundDepth);
        
        // The material will be made with a wood texture
        var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        var materialGround = new THREE.MeshStandardMaterial ({map: texture});
        
        // Build the Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Due to all figures are created centered on the origin.
        // We set the floor is lowered by half its height so that the origin of the world stays on its upper side.    
        ground.position.y = -(groundHeight/2);
        
        // Add the ground to the scene
        this.add (ground);
    }
  
    createGUI () {
        // Creating the Graphical User Interface (GUI)
        var gui = new GUI();
        
        // We create a object-dataStructure of the properties of the scene that the GUI control
        this.guiControls = {
            // ? En el contexto de una función   this   alude a la función
            lightPower : 500.0,  // In lumens
            ambientIntensity : 0.5,   
            axisOnOff : true
        }

        // Create a section for the controls of this class
        var folder = gui.addFolder ('Light and Axis');
        
        // Add to the GUI Section
        // Controller for the power of the point light
        folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
        .name('Light Power : ')
        .onChange ( (value) => this.setLightPower(value) );
        
        // Controller for the intensity of the ambient light
        folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
        .name('Ambient Intensity: ')
        .onChange ( (value) => this.setAmbientIntensity(value) );
        
        // Controller to show or hide the axes
        folder.add (this.guiControls, 'axisOnOff')
        .name ('Show Axis : ')
        .onChange ( (value) => this.setAxisVisible (value) );
        
        return gui;
    }
  
    createLights () {
        // Ambient Light is preventing areas that are not directly illuminated by a light source from being pitch black.
        // The ambient light has only one color and intensity.
        // It is declared as var and will be a local variable to this method.
        // it is done this way since it is not going to be accessed from other methods
        
        this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
        this.add (this.ambientLight);
        
        // A point light is created that will be the main light of the scene.
        // The focal light also has a position, and a Spotlight.
        // If it is not given a Spotlight, it will point to (0,0,0) in world coordinates.
        // In this case it is declared as this.attribute so that it is an attribute accessible from other methods.
        this.pointLight = new THREE.PointLight( 0xffffff );
        this.pointLight.power = this.guiControls.lightPower;
        this.pointLight.position.set( 2, 3, 1 );
        this.add (this.pointLight);
    }
  
    setLightPower (valor) {
        this.pointLight.power = valor;
    }

    setAmbientIntensity (valor) {
        this.ambientLight.intensity = valor;
    }  
  
    setAxisVisible (valor) {
        this.axis.visible = valor;
    }
  
    createRenderer (myCanvas) {
        // Receive the canvas (id of HTML section) where display the scene
        
        // Creating a WebGL Renderer   
        var renderer = new THREE.WebGLRenderer();
        
        // Set color background in render
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
        
        // Size of the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // The visualization is shown in the received canvas
        $(myCanvas).append(renderer.domElement);
        
        return renderer;  
    }
  
    getCamera () {
        // Return the only camera we have in the scene
        // If there were several cameras, this method would decide which camera to return each time it is queried.
        return this.camera;
    }
  
    setCameraAspect (ratio) {
        // Each time the user modifies the window size from the window manager of
        // your operating system, the aspect ratio of the camera must be updated.
        this.camera.aspect = ratio;
        // And if this data is changed, the projection matrix of the camera must be updated.
        this.camera.updateProjectionMatrix();
    }
  
    onWindowResize () {
        // This method is called each time the user modifies the application window size
        // The camera aspect ratio must be updated.
        this.setCameraAspect (window.innerWidth / window.innerHeight);
        
        // and also the size of the renderer
        this.renderer.setSize (window.innerWidth, window.innerHeight);
    }

    update () {
        
        if (this.stats) this.stats.update();
        
        // The scene elements are updated for each frame.
        
        // Camera position is updated according to its controller
        this.cameraControl.update();
        
        // The rest of the model is updated
        this.nitro.update();

        // We tell the renderer "visualize the scene I am showing you using the camera I am passing you".
        this.renderer.render (this, this.getCamera());

        // This method must be called every time we want to display the scene again.
        // We literally tell the browser: "The next time the screen needs to be refreshed, call the method I indicate".
        // If this line did not exist, update() would be executed only the first time.
        requestAnimationFrame(() => this.update())
    }

}   // End of MyScene

// Main function
$(function () {
  
    // The scene is instantiated by passing the id of the html section where it is to be displayed
    let idHtmlSection = "#WebGL-output";
    var scene = new MyScene(idHtmlSection);

    // Adding the listeners. 
    // In this case, the one that will check when the size of the application window is modified.
    window.addEventListener ("resize", () => scene.onWindowResize());
    
    // We update for the first display
    scene.update();
});
