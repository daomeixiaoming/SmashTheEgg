import EventMgr from "../../../Framework/Managers/EventMgr";
import UIBase from "../../../Framework/Managers/UIBase";
import UIMgr, { UILayer } from "../../../Framework/Managers/UIMgr";
import DebugUtils from "../../../Framework/Utils/DebugUtils";
import { EventKey } from "../../Config/EventCfg";
import { AbNames, UICfg } from "../../Config/ResCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeView_Ctrl extends UIBase {
    btns: cc.Node;
    onLoad() {
        super.onLoad();
        this.initUI();
        this.registerEvent()
    }

    start() {

    }

    protected onDestroy(): void {
        this.unRegisterEvent();
    }

    private initUI(): void {
        this.btns = this.view["node/btns"] as cc.Node;
        this.AddButtonListener("node/btns/btnClose", this, this.onBtnBackClick);
        this.AddButtonListener("node/btns/btnHelp", this, this.onBtnHelpClick);
    }

    private registerEvent(): void {
        EventMgr.Instance.AddEventListener(EventKey.UI_UpadteBtnStatus, this, this.onUIEventBtnStatus);
    }

    private unRegisterEvent(): void {
        EventMgr.Instance.RemoveListenner(EventKey.UI_UpadteBtnStatus, this, this.onUIEventBtnStatus);
    }

    /**
     * 控制按钮的状态，防止同时点击 
     * @param isActive false为禁用  
     */
    private updateBtnStatus(isActive: boolean) {
        DebugUtils.Log("==============updateBtnStatus=============", isActive);
        let childs = this.btns.getComponentsInChildren(cc.Button);
        for (let i = 0; i < childs.length; i++) {
            const item = childs[i];
            item.interactable = isActive;
        }
    }

    // 点击返回
    private onBtnBackClick(): void {
        this.updateBtnStatus(false);
        EventMgr.Instance.Emit(EventKey.UI_GotoLogin, "");
    }

    // 点击帮助
    private onBtnHelpClick(): void {
        DebugUtils.Log("=========onBtnHelpClick=============");
        this.updateBtnStatus(false);
        UIMgr.Instance.ShowUIView(UICfg.HelpView, AbNames.Prefabs, UILayer.UI_Layer2);
        // UIMgr.Instance.ShowUIView(UICfg.HelpView, AbNames.Prefabs, UILayer.UI_Layer2);
    }

    /** 更新按钮状态 */
    private onUIEventBtnStatus(uanme: string, udata: boolean): void {
        DebugUtils.Log("=========onUIEventBtnStatus=============", udata);
        this.updateBtnStatus(udata);
    }

}
