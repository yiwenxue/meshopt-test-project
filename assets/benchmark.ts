import { _decorator, Component, Label, Mesh, Node, CCString, resources, sys} from 'cc';
const { ccclass, property } = _decorator;

function formatFileSize(byteSize: number) : String {
    if (byteSize < 1024) {
        return `${byteSize}B`;
    } else if (byteSize < 1024 * 1024) {
        return `${(byteSize / 1024).toFixed(2)}KB`;
    } else {
        return `${(byteSize / 1024 / 1024).toFixed(2)}MB`;
    }
}

@ccclass('meshloader/benchmark')
export class benchmark extends Component {
    @property(CCString)
    private folder: string = '';

    @property (Label)
    private label: Label | null = null;

    private begin: number = 0;
    private end: number = 0;
    start() {
        this.scheduleOnce(() => {
            this.begin = sys.now();
            resources.loadDir(this.folder, Mesh, (err, assets) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.end = sys.now();
                console.log(`loadDir: ${this.end - this.begin}ms`);

                if (!this.label) {
                    return;
                }

                let meshSize = 0;                
                for (const asset of assets) {
                    meshSize += asset.data.byteLength;
                    this.label.string = 
                    `load all meshes in ${this.folder} consumed ${this.end - this.begin}ms` + '\n' +
                    `mesh size:                ${formatFileSize(meshSize)}\n`;
                }
            });
        }, 0);
    }

    update(deltaTime: number) {
    }
}