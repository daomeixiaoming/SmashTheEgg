import EventMgr from "../Framework/Managers/EventMgr";
import { ResMgr } from "../Framework/Managers/ResMgr";
import UIMgr from "../Framework/Managers/UIMgr";
import DebugUtils from "../Framework/Utils/DebugUtils";
import { EventKey } from "./Config/EventCfg";
import { AbNames, UICfg } from "./Config/ResCfg";
import { ResPkg_Home } from "./Config/ResPkgHome";
import NativeMgr from "./Data/NativeMgr";
import NetHttpMgr from "./Data/NetHttpMgr";
import NetWsMgr from "./Data/NetWsMgr";
import GameLogic from "./GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameApp extends cc.Component {
    private nativeList: any[] = []; // 标记原生app的数据获成功
    private loadResove: boolean = false; // 标记资源是否加载完毕
    callback_fh: Function = null;

    public static Instance: GameApp = null as unknown as GameApp;
    onLoad(): void {
        if (GameApp.Instance === null) {
            GameApp.Instance = this;
        } else {
            this.destroy();
            return;
        }
    }

    public Init(): void {
        // 注册事件
        this.registerEvent();
        // 添加模块
        // 添加解释数据的类
        this.node.addComponent(GameLogic).Init();
        this.node.addComponent(NetHttpMgr).Init();
        this.node.addComponent(NativeMgr).Init();
        this.node.addComponent(NetWsMgr).Init();
        // this.node.addComponent(UIView).Init();
        // 获取主播id和房间号
        NativeMgr.Instance.getLiveRoomInfo();
        NativeMgr.Instance.getAppInfo();
        NativeMgr.Instance.getUserInfo();

        this.clearFHCallBack();
        this.callback_fh = function () {
            console.log("===========callback_fh============");
            GameApp.Instance.checkGotoHome();
        };
        this.schedule(this.callback_fh, 1);
    }

    private clearFHCallBack() {
        if (this.callback_fh) {
            this.unschedule(this.callback_fh);
            this.callback_fh = null;
        }
    }

    protected onDestroy(): void {
        DebugUtils.Log("=======GameApp.onDestroy===========");
        this.unRegisterEvent();
    }

    private registerEvent() {
        // 获取原生app数据 starrt
        EventMgr.Instance.AddEventListener(EventKey.Native_GetLiveInfo, this, this.onNativeLiveInfo);
        EventMgr.Instance.AddEventListener(EventKey.Native_AppInfo, this, this.onNativeAppInfo);
        EventMgr.Instance.AddEventListener(EventKey.Native_UserInfo, this, this.onNativeUserInfo);
        // 获取原生app数据 end
        EventMgr.Instance.AddEventListener(EventKey.UI_GotoLogin, this, this.onUIEventGotoLogin);
    }

    private unRegisterEvent() {
        EventMgr.Instance.RemoveListenner(EventKey.Native_GetLiveInfo, this, this.onNativeLiveInfo);
        EventMgr.Instance.RemoveListenner(EventKey.Native_AppInfo, this, this.onNativeAppInfo);
        EventMgr.Instance.RemoveListenner(EventKey.Native_UserInfo, this, this.onNativeUserInfo);
        EventMgr.Instance.RemoveListenner(EventKey.UI_GotoLogin, this, this.onUIEventGotoLogin);
    }

    // 游戏逻辑入口
    public EnterGame(): void {
        DebugUtils.Log("===GameApp Enter Game ....!");
        // 直接加载登录模块
        // this.LoadLoginModel();
        // 加载资源
        this.LoadRes();
        // 链接网路

        // 获取app数据
    }

    private LoadRes() {
        DebugUtils.Log("===========onUIEventEnterHome LoadRes=================");
        // 加在Home必须的资源
        ResMgr.Instance.preloadResPkg(
            ResPkg_Home,
            (now: any, total: any) => {
                let num = now / total;
                // DebugUtils.Log("onUIEventEnterHome num = ", num);
                EventMgr.Instance.Emit(EventKey.UI_Loading, num);
            },
            () => {
                EventMgr.Instance.Emit(EventKey.UI_Loading, 1);
                this.loadResove = true;
            }
        );
    }

    // 检测进入游戏
    private checkGotoHome() {
        if (this.nativeList.length < 3) {
            console.error("===========原生app数据未获取完毕============");
            return;
        }
        if (!this.loadResove) {
            console.error("===========资源未加载完毕============");
            return;
        }
        this.clearFHCallBack();
        // 原生数据和 资源加载完毕
        this.goToHome()
    }

    private goToHome() {
        // 显示大厅界面
        UIMgr.Instance.ShowUIView(UICfg.Home, AbNames.Prefabs);
    }

    // 获取App的相关数据成功
    private udateNativeStatuse() {
        if (this.nativeList.length < 3) {
            return;
        }
        // 连接网络
        DebugUtils.Log(
            "step1: GameApp.udateNativeStatuse 获取App的相关数据成功=========="
        );
    }

    // 获取app数据成功 start
    private onNativeLiveInfo(uanme: string, udata: any): void {
        this.nativeList.push(uanme);
        this.udateNativeStatuse();
    }
    private onNativeAppInfo(uanme: string, udata: any): void {
        this.nativeList.push(uanme);
        this.udateNativeStatuse();
    }
    private onNativeUserInfo(uanme: string, udata: any): void {
        this.nativeList.push(uanme);
        this.udateNativeStatuse();
    }
    // 获取app数据成功 end

    // 主场景home 返回登录
    private onUIEventGotoLogin(uname: string, udata: any): void {
        DebugUtils.Log("=================GameApp.onUIEventGotoLogin==================");
        // 直接关闭游戏
        this.onExitGame();

        // 更新按钮的状态
        EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, true);
    }

    /** 返回直播间App，退出游戏 */
    public onExitGame(): void {
        this.onDestroy();

        //返回 应用层
        NativeMgr.Instance.backToApp();
    }

    public updateBtnStatus() {
        // 更新按钮的状态
        EventMgr.Instance.Emit(EventKey.UI_UpadteBtnStatus, true);
    }
}
