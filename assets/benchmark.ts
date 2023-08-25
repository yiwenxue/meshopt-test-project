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

                let downloadSize = 0;
                let meshSize = 0;
                
                for (const asset of assets) {
                    // query the asset file size without downloading it
                    const request = new XMLHttpRequest();
                    request.open('HEAD', asset.nativeUrl, false);
                    request.onreadystatechange = () => {
                        if (request.readyState === 4) {
                            if (request.status === 200 || request.status === 304) {
                                const nativeSize = Number(request.getResponseHeader('Content-Length'));
                                downloadSize += nativeSize;
                                meshSize += asset.data.byteLength;
                                this.label.string = 
                                    `load all meshes in ${this.folder} consumed ${this.end - this.begin}ms` + '\n' +
                                    `download size:           ${formatFileSize(downloadSize)}\n` +
                                    `mesh size:                ${formatFileSize(meshSize)}\n` + 
                                    `saved size:                ${formatFileSize(meshSize - downloadSize)}\n` +
                                    `saved ratio:              ${((meshSize - downloadSize) / meshSize * 100).toFixed(2)}%`;
                                console.log(`mesh ${asset.nativeUrl} size: ${asset.data.byteLength / 1024}KB ori Size: ${nativeSize / 1024}KB`);
                            } else {
                                console.error(`mesh ${asset.nativeUrl} load failed`);
                            }
                        }
                    };
                    request.send();
                }
            });
        }, 0);
    }

    update(deltaTime: number) {
    }
}