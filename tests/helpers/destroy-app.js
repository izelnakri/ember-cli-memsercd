import { run } from '@ember/runloop';

export default function destroyApp(application) {
  window.MemServer.shutdown();
  run(application, 'destroy');
}
