import { IAPPInfo } from "./Config/MsgCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {
    appInfo: IAPPInfo = null;

    roomId: number = 0; //主播房间号
    anchorId: number = 0; //主播id
    userId: number = 0; //用户自己的uid

    public static Instance: GameLogic = null as unknown as GameLogic;
    onLoad(): void {
        if (GameLogic.Instance === null) {
            GameLogic.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    public Init(): void {

    }

    // 重置相关数据
    public resetGameInfo() {
        // this.enterHome(); //场景数据
        // this.getPlayerInfo(); //用户数据
    }
}
