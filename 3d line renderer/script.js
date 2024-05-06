//TODO      RUN INITIALLY
//TODO      1) Calculate horizontal distance between vertex and 0,0 (radius)
//TODO      2) Correct radius to be 1 (This is not necessary, as trigonometry still works out, however is good practice)
//TODO      3) Calculate the initial angle of the vertex relative to the camera
//TODO      4) Calculate initial projection of vertices using projection equation (focal_length * x_coordinate) / |camera_z_coordinate - z_coordinate|

//TODO      RUN WHEN ARROW IS PRESSED
//TODO      5) Update relative vertex angle (± 5°)
//TODO      6) Calculate new vertex coordinates
//TODO      7) Calculate new projection of vertices using projection equation (focal_length * x_coordinate) / |camera_z_coordinate - z_coordinate|


//TODO      x,z coordinates = -sinθ,-cosθ (this starts at 0,-1 (6 o'clock) and rotates clockwise)
//TODO      Distance between x,z and 0,0 calculated by √(x^2 + z^2)
//TODO      Initial relative angle of vertex calculated by -arctan(sinx/cosz)

//TODO      Rules for calculating angles:
//TODO                                    If x positive, angle = -arctan(cosz/sinx) + 90
//TODO                                    If x negative, angle = -arctan(cosz/sinx) + 270

//TODO      NOTES:
//TODO             Vertices are being rotated and not the camera
//TODO             Multiplier converts between corrected radius and actual radius, ie. if actual radius (of the vertex) is 1.5u, multipler = 1.5, and allows to correct 



const cube_button = document.getElementById("cube_button");
const pyramid_button = document.getElementById("pyramid_button");
const clear_button = document.getElementById("clear_button");
const arrow_left = document.getElementById("arrow_left");
const arrow_right = document.getElementById("arrow_right");
var vertex_list = document.getElementById("vertices");

var vertices = {};
var vertices_coords = {};
var vertices_angle = {};
var vertices_multiplier = {};
var vertices_projected_coords = {};

let angle = 0;
const focal_length = 10;
let preset = 0;
// Custom = 1
// Cube = 2
// Pyramid = 3


function template_cube() {

    // Makes sure that cube is only generated once (stops duplicates)
    if (preset == 0) {

        list_length = 8

        // Create object to store html vertex elements and push these to the document:
        for (let i = 0; i < list_length; i++) {
            vertices[`vertex${i + 1}`] = document.createElement("div");
            vertices[`vertex${i + 1}`].classList.add(`template_vertices`);
            vertex_list.appendChild(vertices[`vertex${i + 1}`]);
        };

        // Creates an object to store vertex coordinates
        for (let i = 0; i < list_length; i++) {
            vertices_coords[`vertex${i + 1}_coords`] = [];
        };

        // Adds coordinates to the vertices
        // [x,y,z]
        // ie. vertex1_coords = [-1,1,1] means vertex1 is at x=-1, y=1, z=1;
        vertices_coords["vertex1_coords"] = [-1, 1, 1];
        vertices_coords["vertex2_coords"] = [ 1, 1, 1];
        vertices_coords["vertex3_coords"] = [-1, 1,-1];
        vertices_coords["vertex4_coords"] = [ 1, 1,-1];
        vertices_coords["vertex5_coords"] = [-1,-1, 1];
        vertices_coords["vertex6_coords"] = [ 1,-1, 1];
        vertices_coords["vertex7_coords"] = [-1,-1,-1];
        vertices_coords["vertex8_coords"] = [ 1,-1,-1];

        // Creates an object to store initial vertex angles
        for (let i = 0; i < list_length; i++) {
            vertices_angle[`vertex${i + 1}_angle`] = 0;
        };

        // Creates an object to store multiplier for each vertex 
        for (let i = 0; i < list_length; i++) {
            vertices_multiplier[`vertex${i + 1}_multiplier`] = 0;
        };

        // Calculates initial vertex angle
        for (let i = 0; i < list_length; i++) {

            vertices_multiplier[`vertex${i + 1}_multiplier`] = Math.sqrt((vertices_coords[`vertex${i + 1}_coords`][0])**2 + (vertices_coords[`vertex${i + 1}_coords`][2])**2);

            // Corrects each coordinate such that radius = 1
            vertices_coords[`vertex${i + 1}_coords`][0] = vertices_coords[`vertex${i + 1}_coords`][0] / vertices_multiplier[`vertex${i + 1}_multiplier`]
            vertices_coords[`vertex${i + 1}_coords`][1] = vertices_coords[`vertex${i + 1}_coords`][1] / vertices_multiplier[`vertex${i + 1}_multiplier`]
            vertices_coords[`vertex${i + 1}_coords`][2] = vertices_coords[`vertex${i + 1}_coords`][2] / vertices_multiplier[`vertex${i + 1}_multiplier`] 
            
            // Calulates each vertex's initial angle
            //TODO      -arctan(sinx/cosz)
            vertices_angle[`vertex${i + 1}_angle`] = -1 * Math.atan(vertices_coords[`vertex${i + 1}_coords`][0] / vertices_coords[`vertex${i + 1}_coords`][2]);

            if (vertices_coords[`vertex${i + 1}_coords`][0] >= 0 && vertices_coords[`vertex${i + 1}_coords`][2] >= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] * -1
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] >= 0 && vertices_coords[`vertex${i + 1}_coords`][2] <= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 0.5*Math.PI
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] <= 0 && vertices_coords[`vertex${i + 1}_coords`][2] <= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 3*Math.PI/2
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] <= 0 && vertices_coords[`vertex${i + 1}_coords`][2] >= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 3*Math.PI/2
            }

            else {
                console.log("There was a problem calculating the initial vertex angles");
            };

        };

        preset = 2;

        update_projections();

    }
    
};

function template_pyramid() {

    // Makes sure that cube is only generated once (stops duplicates)
    if (preset == 0) {

        list_length = 5

        // Create object to store html vertex elements and push these to the document:
        for (let i = 0; i < list_length; i++) {
            vertices[`vertex${i + 1}`] = document.createElement("div");
            vertices[`vertex${i + 1}`].classList.add(`template_vertices`);
            vertex_list.appendChild(vertices[`vertex${i + 1}`]);
        };

        // Creates an object to store vertex coordinates
        for (let i = 0; i < list_length; i++) {
            vertices_coords[`vertex${i + 1}_coords`] = [];
        };

        // Adds coordinates to the vertices
        // [x,y,z]
        // ie. vertex1_coords = [-1,1,1] means vertex1 is at x=-1, y=1, z=1;
        vertices_coords["vertex1_coords"] = [-1,-1, 1];
        vertices_coords["vertex2_coords"] = [ 1,-1, 1];
        vertices_coords["vertex3_coords"] = [-1,-1,-1];
        vertices_coords["vertex4_coords"] = [ 1,-1,-1];
        vertices_coords["vertex5_coords"] = [ 0, 0.5, 0];

        // Creates an object to store initial vertex angles
        for (let i = 0; i < list_length; i++) {
            vertices_angle[`vertex${i + 1}_angle`] = 0;
        };

        // Creates an object to store multiplier for each vertex 
        for (let i = 0; i < list_length; i++) {
            vertices_multiplier[`vertex${i + 1}_multiplier`] = 0;
        };

        // Calculates initial vertex angle
        for (let i = 0; i < (list_length - 1); i++) {

            vertices_multiplier[`vertex${i + 1}_multiplier`] = Math.sqrt((vertices_coords[`vertex${i + 1}_coords`][0])**2 + (vertices_coords[`vertex${i + 1}_coords`][2])**2);

            // Corrects each coordinate such that radius = 1
            vertices_coords[`vertex${i + 1}_coords`][0] = vertices_coords[`vertex${i + 1}_coords`][0] / vertices_multiplier[`vertex${i + 1}_multiplier`]
            vertices_coords[`vertex${i + 1}_coords`][1] = vertices_coords[`vertex${i + 1}_coords`][1] / vertices_multiplier[`vertex${i + 1}_multiplier`]
            vertices_coords[`vertex${i + 1}_coords`][2] = vertices_coords[`vertex${i + 1}_coords`][2] / vertices_multiplier[`vertex${i + 1}_multiplier`] 

        };

        for (let i = 0; i < list_length; i++) {
            
            // Calulates each vertex's initial angle
            //TODO      -arctan(sinx/cosz)
            vertices_angle[`vertex${i + 1}_angle`] = -1 * Math.atan(vertices_coords[`vertex${i + 1}_coords`][0] / vertices_coords[`vertex${i + 1}_coords`][2]);

            if (vertices_coords[`vertex${i + 1}_coords`][0] >= 0 && vertices_coords[`vertex${i + 1}_coords`][2] >= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] * -1
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] >= 0 && vertices_coords[`vertex${i + 1}_coords`][2] <= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 0.5*Math.PI
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] <= 0 && vertices_coords[`vertex${i + 1}_coords`][2] <= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 3*Math.PI/2
            }

            else if (vertices_coords[`vertex${i + 1}_coords`][0] <= 0 && vertices_coords[`vertex${i + 1}_coords`][2] >= 0) {
                vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + 3*Math.PI/2
            }

            else {
                console.log("There was a problem calculating the initial vertex angles");
            };

        };

        preset = 3;

        update_projections();

    }
    
};

function rotate_left() {

    if (preset > 0) {

        angle -= Math.PI * 0.05;
        if (angle < 0) {
            angle += Math.PI * 2
        };
        console.log("angle = " + angle + " radians");

        // Update each vertex's relative angle
        for (let i = 0; i < list_length; i++) {
            vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] - (Math.PI * 0.05);
            if (vertices_angle[`vertex${i + 1}_angle`] <= 0) {
                vertices_angle[`vertex${i + 1}_angle`] += Math.PI * 2;
            }
        };

        update_vertex_coordinates()
        update_projections()

    }

    else {

        console.log("No vertices rendered");

    };

};

function rotate_right() {

    if (preset > 0) {

        angle += Math.PI * 0.05;
        if (angle >= Math.PI * 2) {
            angle -= Math.PI * 2
        };
        console.log("angle = " + angle + " radians");

        // Update each vertex's relative angle
        for (let i = 0; i < list_length; i++) {
            vertices_angle[`vertex${i + 1}_angle`] = vertices_angle[`vertex${i + 1}_angle`] + (Math.PI * 0.05);
            if (vertices_angle[`vertex${i + 1}_angle`] >= Math.PI * 2) {
                vertices_angle[`vertex${i + 1}_angle`] -= Math.PI * 2;
            }
        };

        update_vertex_coordinates()
        update_projections()

    }

    else {

        console.log("No vertices rendered");

    };
    
};

function update_vertex_coordinates() {

    console.log(vertices_angle);

    for (let i = 0; i < list_length; i++) {
        vertices_coords[`vertex${i + 1}_coords`][0] = Math.sin(vertices_angle[`vertex${i + 1}_angle`]);

        vertices_coords[`vertex${i + 1}_coords`][2] = Math.cos(vertices_angle[`vertex${i + 1}_angle`]);
    };

};

function update_projections() {

    // Creates object to store projected coordinates x,y 
    for (let i = 0; i < list_length; i++) {
        vertices_projected_coords[`vertex${i + 1}_projected_coords`] = [];
    };

    // Calculates new projected coordinates for each vertex
    for (let i = 0; i < list_length; i++) {
        vertices_projected_coords[`vertex${i + 1}_projected_coords`][0] = (focal_length * vertices_coords[`vertex${i + 1}_coords`][0]) / (Math.abs(focal_length - vertices_coords[`vertex${i + 1}_coords`][2]));

        vertices_projected_coords[`vertex${i + 1}_projected_coords`][1] = (focal_length * vertices_coords[`vertex${i + 1}_coords`][1]) / (Math.abs(focal_length - vertices_coords[`vertex${i + 1}_coords`][2]));
    };

    for (let i = 0; i < list_length; i++) {
        vertices[`vertex${i + 1}`].style.left = `${vertices_projected_coords[`vertex${i + 1}_projected_coords`][0] * 200}px`

        vertices[`vertex${i + 1}`].style.top = `${vertices_projected_coords[`vertex${i + 1}_projected_coords`][1] * -200}px`
        // Note that when positioning vertex element vertically, multiply by -1 (idk why but it works)
    };

    console.log("");
    console.log("projection updated");

};

function clear_screen() {
    preset = 0

    for (let i = 0; i < list_length; i++) {
        // vertices[`vertex${i + 1}`] = document.createElement("div");
        // vertices[`vertex${i + 1}`].classList.add(`template_vertices${i + 1}`);
        vertex_list.removeChild(vertices[`vertex${i + 1}`])
    };
};

cube_button.addEventListener("click",template_cube); // Generates cube on click (Note: once cube is generated, cannot be regenerated without clearing screen)
pyramid_button.addEventListener("click",template_pyramid); // Generates pyramid on click (Note: once cube is generated, cannot be regenerated without clearing screen)
arrow_left.addEventListener("click",rotate_left);
arrow_right.addEventListener("click",rotate_right);
clear_button.addEventListener("click",clear_screen);