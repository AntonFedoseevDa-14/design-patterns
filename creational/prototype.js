import THREE from 'three';

function clone() {
  const clonedObj = Object.assign(Object.create(this.constructor.prototype), this);

  return clonedObj;
}

THREE.PerspectiveCamera.prototype.clone = clone;

export const baseCamera = THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);

// in different part of program

const camera = baseCamera.clone();

camera.position.z = 18;
