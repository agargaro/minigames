import { Asset } from '@three.ez/main';
import { Group, Sprite, SpriteMaterial, TextureLoader } from 'three';
import { Confetti } from './confetti';

Asset.preload(TextureLoader, 'base.webp', 'external.webp', 'internal.webp');

export class Wheel extends Group {
  public internal = new Sprite(new SpriteMaterial({ map: Asset.get('internal.webp') }));
  public external = new Sprite(new SpriteMaterial({ map: Asset.get('external.webp') }));
  public base = new Sprite(new SpriteMaterial({ map: Asset.get('base.webp') }));
  // this._winAudio = new Audio(audioListener).setBuffer(Asset.get('assets/win.mp3'));
  private _force = 0;

  constructor() {
    super();
    this.position.y += 0.4;

    this.internal.interceptByRaycaster = false;
    const internalImg = this.internal.material.map.image;
    this.internal.scale.y = internalImg.height / internalImg.width;
    this.internal.scale.multiplyScalar(0.9 * 3);
    this.internal.material.rotation = 0;

    const externalImg = this.external.material.map.image;
    this.external.scale.y = externalImg.height / externalImg.width;
    this.external.scale.multiplyScalar(3);

    this.base.interceptByRaycaster = false;
    this.base.translateY(-1.8);
    const baseImg = this.base.material.map.image;
    this.base.scale.y = baseImg.height / baseImg.width;
    this.base.scale.multiplyScalar(0.7 * 3);

    this.add(this.base, this.internal.translateZ(0.01), this.external.translateZ(0.02));

    this.on('click', () => {
      if (this._force > 0) return;
      this._force = Math.random() * 2 + 2;
    });

    this.on('animate', (e) => {
      if (this._force > 0) {
        this.internal.material.rotation -= this._force * 0.03;
        this.needsRender = true;
        this._force = Math.max(this._force - e.delta, 0);
        if (this._force === 0) {
          this.internal.material.rotation %= Math.PI * 2;
          if (this.checkWin()) {
            this.scene.add(new Confetti());
          }
        }
      }
    });
  }

  public checkWin(): boolean {
    const winningAngle = (9.75 * Math.PI) / -180;
    const module = this.internal.material.rotation % Math.PI;
    const angle = module > -Math.PI / 2 ? module : -Math.PI - module;
    return angle > winningAngle;
  }
}
