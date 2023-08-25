import { _decorator, Component, Label, director, math, Slider, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('fps_counter')
export class fps_counter extends Component {
    @property(Label)
    private label: Label | null = null;

    @property(CCFloat)
    private smoothFactor: number = 0.1;

    private _fps: number = 0;

    private _frameTime: number = 0;

    start() { }

    update(deltaTime: number) {
        const fps = director.root.fps;
        const frameTime = director.root.frameTime;

        this._fps = math.lerp(this._fps, fps, this.smoothFactor);
        this._frameTime = math.lerp(this._frameTime, frameTime, this.smoothFactor);

        if (this.label) {
            this.label.string = `fps: ${this._fps.toFixed(2)}\nframe time: ${this._frameTime.toFixed(2)}ms`;
        }
    }
}