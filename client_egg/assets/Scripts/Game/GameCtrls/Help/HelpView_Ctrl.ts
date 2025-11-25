import EventMgr from "../../../Framework/Managers/EventMgr";
import { ResMgr } from "../../../Framework/Managers/ResMgr";
import UIBase from "../../../Framework/Managers/UIBase";
import { AbNames, UICfg } from "../../Config/ResCfg";
import GameApp from "../../GameApp";
import HelpViewItem_Ctrl from "./HelpViewItem_Ctrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HelpView_Ctrl extends UIBase {
    scrollView: cc.ScrollView;
    onLoad() {
        super.onLoad();
        this.initUI();
    }

    start() {
        this.setData();
        GameApp.Instance.updateBtnStatus();
    }

    private initUI(): void {
        this.AddButtonListener("node/btnClose", this, this.onCloseBtn);
        this.scrollView = this.ViewComponent("node/sp_mid/scrollView", cc.ScrollView) as cc.ScrollView;
    }

    private setData() {
        let list: { name: string, num: number, pre: number }[] = [
            { name: "气球", num: 50, pre: 980 },
            { name: "金钱袋", num: 100, pre: 1590 },
            { name: "香吻", num: 200, pre: 2220 },
            { name: "星空礼花", num: 1000, pre: 3030 },
            { name: "荧光仙马", num: 5000, pre: 1110 },
            { name: "牌中少女", num: 10000, pre: 600 },
            { name: "屠龙刀", num: 15000, pre: 200 },
            { name: "暗夜玫瑰", num: 20000, pre: 100 },
            { name: "滑板狗", num: 200, pre: 70 },
            { name: "求微信", num: 500, pre: 50 },
            { name: "天使", num: 1000, pre: 30 },
            { name: "月光族", num: 5000, pre: 20 },

            { name: "屠龙刀", num: 15000, pre: 200 },
            { name: "暗夜玫瑰", num: 20000, pre: 100 },
            { name: "滑板狗", num: 200, pre: 70 },
            { name: "求微信", num: 500, pre: 50 },
            { name: "天使", num: 1000, pre: 30 },
            { name: "月光族", num: 5000, pre: 20 },
        ];

        for (let i = 0; i < list.length; i++) {
            let d: { name: string, num: number, pre: number } = list[i];
            let pre = ResMgr.Instance.getAsset(AbNames.Prefabs, UICfg.HelpViewItem, cc.Prefab) as cc.Prefab;
            let item = cc.instantiate(pre);
            const com = item.addComponent(HelpViewItem_Ctrl);
            this.scrollView.content.addChild(item); //注意：一定要先addChild,脚本对应的onLoad才能执行
            com.setData(d);
        }
    }
}
