// Camera
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -50000,
    10000
  );
  camera.position.set(0, 0, 990);  // Set the camera position to ensure visibility
  
  // Scene
  const scene = new THREE.Scene();
  
  // Add a simple cube to the scene
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const element = document.getElementById('3d-element');
  renderer.setSize(element.clientWidth, element.clientHeight);
  element.appendChild(renderer.domElement);
  
  // Scene settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  scene.background = new THREE.Color('#000000');
  renderer.setClearAlpha(0);
  
  // Orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.125;
  
  // Handle window resize
  function onWindowResize() {
    // Update camera and renderer based on the new size of the container element
    camera.left = element.clientWidth / -2;
    camera.right = element.clientWidth / 2;
    camera.top = element.clientHeight / 2;
    camera.bottom = element.clientHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(element.clientWidth, element.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize);
  
  // Initial resize to set up the correct size
  onWindowResize();
  
  function animate(time) {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);  // Ensure the animation loop runs continuously
  }
  
  animate(); // Start the animation loop
  