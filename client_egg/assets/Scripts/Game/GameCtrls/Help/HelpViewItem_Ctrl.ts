import UIBase from "../../../Framework/Managers/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HelpViewItem_Ctrl extends UIBase {
    labName: cc.Label;
    labNum: cc.Label;
    labPre: cc.Label;

    onLoad() {
        console.log("===========HelpViewItem_Ctrl.onLoad==========");
        super.onLoad();
        this.initUI();
    }

    start() {

    }

    private initUI(): void {
        console.log("===========HelpViewItem_Ctrl.initUI==========");
        this.labName = this.ViewComponent("item1/lab", cc.Label) as cc.Label;
        this.labNum = this.ViewComponent("item2/lab", cc.Label) as cc.Label;
        this.labPre = this.ViewComponent("item3/lab", cc.Label) as cc.Label;
    }

    setData(data: { name: string, num: number, pre: number }): void {
        console.log("===========HelpViewItem_Ctrl.setData==========");
        this.labName.string = data.name || "-";
        this.labNum.string = data.num.toString() || "-";
        this.labName.string = data.pre.toString() || "-";
    }
}
