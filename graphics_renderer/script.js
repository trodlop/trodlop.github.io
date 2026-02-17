// Import geometry from JSON file
let geometry = {};
async function load_geometry_data() {
    const response = await fetch('./geometry.json');
    geometry = await response.json();
};
load_geometry_data();

// Global constants
const camera_coords = [0, 0, -5];

const fov = 1.309; // ~ 75 degrees
const focal_length = 1 / (Math.tan(fov / 2));

const screen_height = 1000;
const screen_width = 1000;

const rotation_angle = Math.PI / 12;

const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

// Control window state (prevent overlaying multiple shapes at once, by spamming generate_shape
let window_state = false;

class Renderer {
    constructor(ctx) {this.ctx = ctx}

    // Takes in a list of vertices (eg. vertices = [ p1, p2, p3, ... ] )
    //# Vertices MUST be in canvas space
    draw_vertices(vertices) {
        for (const p of vertices) {
            const radius = 10
            this.ctx.fillRect(p.x - (radius/2), p.y - (radius/2), radius, radius); // for performance reasons we'll avoid drawing circles
        };
    }

    // Takes in a list of edges (eg. edges = [ [p1, p2], [p3, p4], ... ] )
    // eg. p1 = {"x" : int, "y" : int}
    draw_edges(edges) {
        ctx.lineWidth = 5; // config line width
        for (const[p1, p2] of edges) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        };
    }

    render_frame(vertices, indexed_edges) {

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.draw_vertices(vertices);

        // Convert edges from vertex index to coordinates
        const edges = [];
        for (let i = 0; i < indexed_edges.length; i++) {
            edges.push([vertices[indexed_edges[i].p1], vertices[indexed_edges[i].p2]])
        };
        
        this.draw_edges(edges);
    }

    clear_window() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};
const CanvasRenderer = new Renderer(ctx); // Create a new renderer to handle vertex and edge rendering to canvas

class Shape {
    constructor(coords_array, edges_array) {
        this.vertices = [];
        this.edges = [];

        for (let i = 0; i < coords_array.length; i++) { // coords_array ref = [ [x,y,z], [x,y,z], [x,y,z], ... ]
            this.vertices.push({
                "x" : coords_array[i][0],
                "y" : coords_array[i][1],
                "z" : coords_array[i][2]
            });
        };

        for (let i = 0; i < edges_array.length; i++) { // edges_array ref = [ [0,1], [2,3], [1,2], ... ]
            this.edges.push({
                "p1" : edges_array[i][0],
                "p2" : edges_array[i][1]
            });
        };
    };
};
class Projected_Shape {
    constructor(shape_class) {
        this.vertices = [];
        // this.edges = [];
        // for (let i = 0; i < shape_class.edges.length; i++) {
        //     this.edges.push(shape_class.edges[i])
        // };

        // coords_array ref = [ [x,y,z], [x,y,z], [x,y,z], ... ]
        // edges_array ref = [ [0,1], [2,3], [1,2], ... ]
    };
};
// Define main shape classes
const Wireframe = new Shape([],[]);
const ProjectedWireframe = new Projected_Shape(Wireframe);

function generate_shape(shape_type) {
    const shape_mapping = {
        "cube" : geometry.cube,
        "pyramid" : geometry.pyramid,
        "cuboid" : geometry.cuboid,
        "dodecahedron" : geometry.dodecahedron
    };

    if (window_state == false) {
        const shape = shape_mapping[shape_type];

        Wireframe.vertices = shape.vertices;
        Wireframe.edges = shape.edges;
        
        ProjectedWireframe.vertices = project();

        // console.table(Wireframe.vertices);
        // console.table(Wireframe.edges);

        CanvasRenderer.render_frame(ProjectedWireframe.vertices, Wireframe.edges);

        // Prevent regenerating
        window_state = true;

        console.log("Window rendered...");
    }
    else {
        console.log("Shape already rendered");
    };
};

function rotate(vertex_array, angle, axis) { // Note angle is in radians and axis can only be "x" (pitch) or "y" (yaw); we won't rotate about z (roll)

    let rotated_vertices = [];

    for (let i = 0; i < vertex_array.length; i++) {
        const vertex_x = vertex_array[i].x;
        const vertex_y = vertex_array[i].y;
        const vertex_z = vertex_array[i].z;

        let rotated_vertex_x = 0;
        let rotated_vertex_y = 0;
        let rotated_vertex_z = 0;

        if (axis == "x") {
            rotated_vertex_x = vertex_x;
            rotated_vertex_y = Math.cos(angle) * vertex_y - Math.sin(angle) * vertex_z;
            rotated_vertex_z = Math.sin(angle) * vertex_y + Math.cos(angle) * vertex_z;
        }
        else if (axis == "y") {
            rotated_vertex_x = Math.cos(angle) * vertex_x + Math.sin(angle) * vertex_z;
            rotated_vertex_y = vertex_y;
            rotated_vertex_z = -1 * Math.sin(angle) * vertex_x + Math.cos(angle) * vertex_z;
        };

        rotated_vertices.push({"x" : rotated_vertex_x, "y" : rotated_vertex_y, "z" : rotated_vertex_z});
    };
    
    return rotated_vertices;

};

function project() {
    // coords_array ref = [ [x,y,z], [x,y,z], [x,y,z], ... ]
    // camera_coords ref = [ x,y,z ]
    const camera_x = camera_coords[0];
    const camera_y = camera_coords[1];
    const camera_z = camera_coords[2];
    
    let projected_vertices = [];

    for (let i = 0; i < Wireframe.vertices.length; i++) {
        const vertex_x = Wireframe.vertices[i].x;
        const vertex_y = Wireframe.vertices[i].y;
        const vertex_z = Wireframe.vertices[i].z;       

        // convert vertices to camera space
        const camera_space_vertex_x = vertex_x - camera_x;
        const camera_space_vertex_y = vertex_y - camera_y;
        const camera_space_vertex_z = vertex_z - camera_z;
        
        // Project x coordinate
        let x_projected = (focal_length * camera_space_vertex_x) / camera_space_vertex_z;
        let screen_x = ((1 + x_projected)) * (screen_width / 2);

        // Project y coordinate
        let y_projected = (focal_length * camera_space_vertex_y) / camera_space_vertex_z;
        let screen_y = ((1 - y_projected)) * (screen_height / 2);

        projected_vertices.push({"x" : screen_x, "y" : screen_y});
    };

    return projected_vertices;
};

function update_renderer(action, angle, axis) { // axis = "x" or "y"
    if (action == "rotate") {
        Wireframe.vertices = rotate(Wireframe.vertices, angle, axis);
        // console.table(Wireframe.vertices);

        ProjectedWireframe.vertices = project();
        // console.table(ProjectedWireframe.vertices);

        CanvasRenderer.render_frame(ProjectedWireframe.vertices, Wireframe.edges);

        console.log("Window rendered...");
    }
    else if (action == "clear") {
        Wireframe.vertices = [];
        Wireframe.edges = [];
        ProjectedWireframe.vertices = [];

        CanvasRenderer.clear_window();

        window_state = false;
    }
}

// Initialise controls
const controls_up = document.getElementById("controls_up");
controls_up.addEventListener("click", () => {
    update_renderer("rotate", rotation_angle, "x");
    // console.log("Rotated up...");
});
const controls_left = document.getElementById("controls_left");
controls_left.addEventListener("click", () => {
    update_renderer("rotate", rotation_angle, "y");
    // console.log("Rotated left...");
});
const controls_right = document.getElementById("controls_right");
controls_right.addEventListener("click", () => {
    update_renderer("rotate", -1 * rotation_angle, "y");
    // console.log("Rotated right...");
});
const controls_down = document.getElementById("controls_down");
controls_down.addEventListener("click", () => {
    update_renderer("rotate", -1 * rotation_angle, "x");
    // console.log("Rotated down...");
});
const controls_clear = document.getElementById("controls_clear");
controls_clear.addEventListener("click", () => {
    update_renderer("clear");
    console.log("Screen cleared...");
});

// Initialise presets
const preset_cube = document.getElementById("cube_preset");
preset_cube.addEventListener("click", () => {
    generate_shape("cube");
});

const preset_pyramid = document.getElementById("pyramid_preset");
preset_pyramid.addEventListener("click", () => {
    generate_shape("pyramid");
});

const preset_cuboid = document.getElementById("cuboid_preset");
preset_cuboid.addEventListener("click", () => {
    generate_shape("cuboid");
});

const preset_dodecahedron = document.getElementById("dodecahedron_preset");
preset_dodecahedron.addEventListener("click", () => {
    generate_shape("dodecahedron");
});