class Scene {
  constructor(container) {
    this.container = container;
    this.status = 'playing';
    this.init();
    this.addLights();
    this.addTorus();
    this.loop();

    window.addEventListener('resize', () => this.handleResize());
  }

  width() {
    return window.innerWidth;
  }

  height() {
    return window.innerHeight;
  }

  // Shaders from https://github.com/mrdoob/three.js/blob/master/examples/webgl_modifier_tessellation.html
  vertexShader() {
    return `
      uniform float amplitude;
      attribute vec3 customColor;
      attribute vec3 displacement;
      varying vec3 vNormal;
      varying vec3 vColor;
      void main() {
        vNormal = normal;
        vColor = customColor;
        vec3 newPosition = position + normal * amplitude * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
      }
    `
  }

  fragmentShader() {
    return `
      varying vec3 vNormal;
      varying vec3 vColor;
      void main() {
        const float ambient = 0.4;
        vec3 light = vec3( 1.0 );
        light = normalize( light );
        float directional = max( dot( vNormal, light ), 0.0 );
        gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );
      }
    `
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, this.width() / this.height(), 1, 500);
    this.camera.position.set(0, 0, 50);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio = window.devicePixelRatio;
    this.renderer.setSize(this.width(), this.height());

    this.container.appendChild(this.renderer.domElement);
  }

  addLights() {
    const light = new THREE.AmbientLight(0xB2EBF2, 0.7);
    this.scene.add(light);
  }

  addTorus() {
    // let geometry = new THREE.TorusGeometry(10, 3, 16, 5000);
    let geometry = new THREE.TorusGeometry(10, 3, 2, 5000);
    geometry.center();

    const tessellateModifier = new THREE.TessellateModifier( 8 );

			for (let i = 0; i < 6; i ++) {
				tessellateModifier.modify(geometry);
			}

		const explodeModifier = new THREE.ExplodeModifier();
		explodeModifier.modify(geometry);
		const numFaces = geometry.faces.length;

    geometry = new THREE.BufferGeometry().fromGeometry(geometry);

    const colors = new Float32Array( numFaces * 3 * 3 );
		const displacement = new Float32Array( numFaces * 3 * 3 );
		const color = new THREE.Color();

    const colourOptions = [
      'rgb(224,64,251)',
      'rgb(255,61,0)',
      'rgb(255,23,68)',
    ]

		for ( var f = 0; f < numFaces; f ++ ) {
			const index = 9 * f;
			// const h = 0.2 * Math.random();
			// const s = 0.5 + 0.5 * Math.random();
			// const l = 0.5 + 0.5 * Math.random();
			// color.setHSL( h, s, l );
      const randomColour = colourOptions[Math.floor(colourOptions.length * Math.random())];
      color.set(randomColour);

			const d = 15 * (0.5 - Math.random());

			for ( let i = 0; i < 3; i ++ ) {
				colors[ index + ( 3 * i )     ] = color.r;
				colors[ index + ( 3 * i ) + 1 ] = color.g;
				colors[ index + ( 3 * i ) + 2 ] = color.b;
				displacement[ index + ( 3 * i )     ] = d;
				displacement[ index + ( 3 * i ) + 1 ] = d;
				displacement[ index + ( 3 * i ) + 2 ] = d;
			}
		}

    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
		geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

    this.uniforms = {
			amplitude: {value: 0.0}
		};

    const shaderMaterial = new THREE.ShaderMaterial({
			uniforms:       this.uniforms,
			vertexShader:   this.vertexShader(),
			fragmentShader: this.fragmentShader()
		});

    this.torus = new THREE.Mesh( geometry, shaderMaterial );
    this.scene.add( this.torus );
  }

  handleResize() {
    this.renderer.setSize(this.width(), this.height());
    this.camera.aspect = this.width() / this.height();
    this.camera.updateProjectionMatrix();
  }

  play() {
    this.status = 'playing';
    this.loop();
  }

  pause() {
    this.status = 'paused';
  }

  loop() {
    if (this.status !== 'playing') return;

    this.render();
    requestAnimationFrame(() => {
      this.loop();
    });
  }

  render() {
    const time = Date.now() * 0.001;
		this.uniforms.amplitude.value = 1.0 + Math.sin( time * 0.5 );
    // this.torus.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }
}
