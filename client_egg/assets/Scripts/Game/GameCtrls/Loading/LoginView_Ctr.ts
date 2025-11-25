import EventMgr from "../../../Framework/Managers/EventMgr";
import UIBase from "../../../Framework/Managers/UIBase";
import { EventKey } from "../../Config/EventCfg";
import GameApp from "../../GameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginView_Ctr extends UIBase {
    sp_bar: cc.Sprite;
    onLoad() {
        super.onLoad();
        this.initUI();
        this.registerEvent();
    }

    start() {
        this.initData();
    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    private initUI(): void {
        this.sp_bar = this.ViewComponent("node/loading/sp_bar", cc.Sprite) as cc.Sprite;
        this.AddButtonListener("node/btnClose", this, this.onBtnBackClick);
    }

    private initData(): void {
        this.sp_bar.fillRange = 0;
    }

    private registerEvent(): void {
        EventMgr.Instance.AddEventListener(EventKey.UI_Loading, this, this.onUIEventLoading);
    }

    private unRegisterEvent(): void {
        EventMgr.Instance.RemoveListenner(EventKey.UI_Loading, this, this.onUIEventLoading);
    }

    // 显示加载进度
    private onUIEventLoading(uname: string, udata: number): void {
        this.sp_bar.fillRange = udata;
    }

    private onBtnBackClick(): void {
        GameApp.Instance.onExitGame();
    }
}
