import EventMgr from "../../Framework/Managers/EventMgr";
import CocosUtils from "../../Framework/Utils/CocosUtils";
import DebugUtils from "../../Framework/Utils/DebugUtils";
import HttpUtils from "../../Framework/Utils/HttpUtils";
import { EventKey } from "../Config/EventCfg";
import { Lngs } from "../Config/LngCfg";
import { HttpResponse } from "../Config/MsgCfg";
import { NetCfg } from "../Config/NetCfg";

const { ccclass, property } = cc._decorator;
// 网络状态code
const NetStatus = {
  Normal: 200, //正常
  CURRENCY_NOT_ENOUGH: -232, //货币不够!
  NO_BOX: -231, //没有宝箱了!
  B0X_NOT_FOUND: -230, //宝箱不存在!
};
/**
 * 所有的短链接处理
 */
@ccclass
export default class NetHttpMgr extends cc.Component {
  public static Instance: NetHttpMgr = null as unknown as NetHttpMgr;
  url: string; //url 地址
  onLoad(): void {
    if (NetHttpMgr.Instance === null) {
      NetHttpMgr.Instance = this;
    } else {
      this.destroy();
      return;
    }
  }

  public Init(): void {
    // DebugUtils.Log("========NetHttpMgr Init==========");
    this.url = NetCfg.url;
    this.url = `${NetCfg.url}demon-slaying-api/`;
  }

  //------------------------------------------------------------通用数据-------------------------------------------------------------
  /**
   *获取玩家信息 ok
   */
  public GetPlayerInfo() {
    let url = NetCfg.url;
    url += "logic-api/logic/getPlayerInfoV2";
    let body = {
      gameType: NetCfg.gameType,
    };
    DebugUtils.Log("==========GetPlayerInfo==========", url);
    HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
      let data: HttpResponse = JSON.parse(udata);
      if (err) {
        CocosUtils.showToast(Lngs.GetPlayerInfoErr, 2);
        EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, null);
      } else {
        let code = data.code;
        let message = data.message;
        let result = data.result;
        if (code && code === NetStatus.Normal && result) {
          EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, result);
        } else {
          CocosUtils.showToast(Lngs.GetPlayerInfoErr, 2);
          EventMgr.Instance.Emit(EventKey.Http_Res_GetPlayerInfo, null);
        }
      }
    });
  }

  /**
   * 获取游戏基础配置 ok
   */
  public GetGames(callback?: Function) {
    let url = NetCfg.url;
    url += "logic-api/logic/getGames";
    let body = {
      gameType: NetCfg.gameType,
    };
    DebugUtils.Log("=============GetGames1============", url);
    return new Promise((resolve, reject) => {
      HttpUtils.PostJson(url, null, JSON.stringify(body), (err, udata) => {
        let data: HttpResponse = JSON.parse(udata);
        if (err) {
          console.error("=============GetGames.error============", data);
          reject(null);
        } else {
          let code = data.code;
          let message = data.message;
          let result = data.result;
          DebugUtils.Log("=============GetGames============", data);
          if (code && code === NetStatus.Normal && result) {
            resolve(result);
          } else {
            console.error("=============GetGames============", message);
            resolve(result);
          }
        }
      });
    });
  }
}
