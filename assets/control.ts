import { _decorator, Component, director, game, cclegacy } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('control')
export class control extends Component {
    start() {
        // show profiler
        cclegacy.profiler.showStats();
    }

    update(deltaTime: number) { }

    public onLoadOptimizedClicked () {
        // load scene
        director.loadScene('loader-optimized');
    }

    public onLoadCompressedClicked () {
        // load scene
        director.loadScene('loader-compressed');
    }


    public onLoadOriginalClicked () {
        // load scene
        director.loadScene('loader-original');
    }

    public onRenderOptimizedClicked() {
        // load scene
        director.loadScene('render-optimized');
    }

    public onRenderOriginalClicked() {
        // load scene
        director.loadScene('render-original');
    }

    public onRestartClicked () {
        // restart engine
        game.restart();
    }

    public onReturnClicked () {
        // load scene
        director.loadScene('main');
    }
}