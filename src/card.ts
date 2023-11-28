import { Euler, Group, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';
import { Asset } from '@three.ez/main';
import { Table } from './table';

Asset.preload(TextureLoader, 'b0.webp', 'b1.webp', 'b2.webp', 'b3.webp', '0.webp', '1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp');

export class Card extends Group {
  declare parent: Table;
  private static geometry = new PlaneGeometry(0.9, 0.9);

  constructor(public index: number, public backIndex: number) {
    super();
    const front = new Mesh(Card.geometry, new MeshBasicMaterial({ map: Asset.get(`b${backIndex % 4}.webp`) }));
    const back = new Mesh(Card.geometry, new MeshBasicMaterial({ map: Asset.get(`${index}.webp`) }));
    this.add(front, back.rotateY(Math.PI));
    this.bindProperty('enabled', () => this.parent?.firstCard !== this && this.parent?.secondCard !== this);
  }

  public flip(onEnd: () => void): void {
    this.tween()
      .by(500, { rotation: new Euler(0, Math.PI, 0) }, { easing: 'easeOutQuart' })
      .call(onEnd)
      .start();
  }

  public fade(onEnd = () => {}): void {
    this.tween()
      .to(500, { scale: 0 }, { easing: 'easeOutQuart' })
      .call(() => this.removeFromParent())
      .call(onEnd)
      .start();
  }
}
