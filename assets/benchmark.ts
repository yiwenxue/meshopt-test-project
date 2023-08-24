import { _decorator, Component, Mesh, Node, resources, sys} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('meshloader/benchmark')
export class benchmark extends Component {
    private begin: number = 0;
    private end: number = 0;
    start() {
        this.scheduleOnce(() => {
            this.begin = sys.now();
            resources.loadDir('meshloader', Mesh, (err, assets) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.end = sys.now();
                console.log(`loadDir: ${this.end - this.begin}ms`);
                for (const asset of assets) {
                    console.log(`mesh ${asset.nativeUrl} size: ${asset.data.byteLength / 1024}KB`);
                }
            });
        }, 3);
    }

    update(deltaTime: number) {
    }
}