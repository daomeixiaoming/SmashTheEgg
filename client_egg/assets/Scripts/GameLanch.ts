import EventMgr from "./Framework/Managers/EventMgr";
import { NetMgr } from "./Framework/Managers/Net/NetMgr";
import NodePoolMgr from "./Framework/Managers/NodePoolMgr";
import { ResMgr } from "./Framework/Managers/ResMgr";
import { ResMgrAsync } from "./Framework/Managers/ResMgrAsync";
import SoundMgr from "./Framework/Managers/SoundMgr";
import UIMgr from "./Framework/Managers/UIMgr";
import { GameConfig } from "./Game/Config/GameConfig";
import GameApp from "./Game/GameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameLanch extends cc.Component {
    @property({
        tooltip: "是否使用webSocket",
    })
    isWebSocket: boolean = false;

    @property({
        tooltip: "是否开启debug模式",
    })
    isDebug: boolean = false;
    wsCom: NetMgr;

    onLoad() {
        GameConfig.isDebug = this.isDebug;

        // 资源管理模块
        this.node.addComponent(ResMgr);
        this.node.addComponent(ResMgrAsync);
        //声音管理模块
        this.node.addComponent(SoundMgr);
        //自定义事件的订阅与发布
        this.node.addComponent(EventMgr);
        // UI管理模块
        this.node.addComponent(UIMgr);
        // 节点池管理
        this.node.addComponent(NodePoolMgr).Init();
        //websocket 网络部分
        if (this.isWebSocket) {
            this.wsCom = this.node.addComponent(NetMgr);
            // DebugUtils.Log("===============GameLanch onLoad2==================", this.wsCom);
        }
        //游戏逻辑
        this.node.addComponent(GameApp).Init();
    }

    start() {
        // 进入游戏里面去
        GameApp.Instance.EnterGame();
    }
}
