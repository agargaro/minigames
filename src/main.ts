import { Scene, AudioListener } from 'three';
import { Asset, Main, OrthographicCameraAuto } from '@three.ez/main';
import { Table } from './table';
import { Wheel } from './wheel';

let activeGame = 'memory';
export const audioListener = new AudioListener();
await Asset.preloadAllPending();

const main = new Main({ showStats: false, fullscreen: false, rendererParameters: { canvas: document.getElementById('canvas') } });
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

  if (activeGame === 'wheel') {
    document.getElementById('pausa').style.visibility = 'hidden';
    document.getElementById('reset').style.visibility = 'hidden';
    document.getElementById('timer').style.visibility = 'hidden';
    document.getElementById('game-title').innerText = 'WHEEL OF FORTUNE';
  } else {
    document.getElementById('pausa').style.visibility = 'visible';
    document.getElementById('reset').style.visibility = 'visible';
    document.getElementById('timer').style.visibility = 'visible';
    document.getElementById('game-title').innerText = 'RD MEMORY GAME';
  }
});
