import { PlaneGeometry, Vector3, DoubleSide, MeshBasicMaterial } from 'three';
import { InstancedMesh2, InstancedMeshEntity } from '@three.ez/main';

const zAxis = new Vector3(0, 0, -1);

class Coriander extends InstancedMeshEntity {
  constructor(parent: InstancedMesh2, index: number) {
    super(parent, index, Math.random() * 0xffffff);
    const rotationAxis = new Vector3().randomDirection();
    const direction = new Vector3(1, 0, 0).applyAxisAngle(zAxis, Math.random() * (Math.PI / 2) + Math.PI / 4);

    this.position.set(Math.random() * 4 - 2, Math.random() * 2.5 + 2, 0);
    this.scale.setScalar(Math.random() + 1);
    this.rotateOnWorldAxis(rotationAxis, Math.random() * Math.PI * 2 - Math.PI);

    this.on('animate', (e) => {
      this.position.add(direction.setLength(e.delta * 2.5 || 10 ** -6));
      this.rotateOnWorldAxis(rotationAxis, e.delta * 2.5);
      this.updateMatrix();
    });
  }
}

export class Confetti extends InstancedMesh2 {
  private _time = 0;
  private _duration = 4;

  constructor() {
    super(new PlaneGeometry(0.05, 0.05), new MeshBasicMaterial({ side: DoubleSide }), 500, Coriander, true);
    this.interceptByRaycaster = false;

    this.on('animate', (e) => {
      this.needsRender = true; // fix su pacchetto

      this._time += e.delta;
      if (this._time >= this._duration) {
        this.removeFromParent();
      }
    });
  }
}
