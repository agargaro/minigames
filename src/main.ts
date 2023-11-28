import { Scene, AudioListener } from 'three';
import { Asset, Main, OrthographicCameraAuto } from '@three.ez/main';
import { Table } from './table';
import { Wheel } from './wheel';

let activeGame = 'memory';
export const audioListener = new AudioListener();
await Asset.preloadAllPending();

const main = new Main({ showStats: true, fullscreen: false, rendererParameters: { canvas: document.getElementById('canvas') } });
main.renderer.outputColorSpace = 'srgb-linear';

const sceneMemory = new Scene().add(new Table()).activeSmartRendering();
const cameraMemory = new OrthographicCameraAuto(5, false).translateZ(10);
main.createView({ scene: sceneMemory, camera: cameraMemory, backgroundColor: 0x59a59c, tags: ['memory'] });

const sceneWheel = new Scene().add(new Wheel()).activeSmartRendering();
const cameraWheel = new OrthographicCameraAuto(5, false).translateZ(10);
main.createView({ scene: sceneWheel, camera: cameraWheel, backgroundColor: 0x59a59c, visible: false, tags: ['wheel'] });

document.getElementById('switch-game').addEventListener('click', () => {
  activeGame = activeGame === 'memory' ? 'wheel' : 'memory';
  main.setActiveViewsByTag(activeGame);
});
