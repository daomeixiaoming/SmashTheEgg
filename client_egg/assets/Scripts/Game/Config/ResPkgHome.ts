import { AtalsCfg, UICfg } from "./ResCfg";

// 游戏模块加载的资源
export const ResPkg_Home = {
    Atals: [
        {
            assetType: cc.SpriteAtlas,
            urls: [
                AtalsCfg.Home,
            ],
        },
    ],

    Prefabs: [
        {
            assetType: cc.Prefab,
            urls: [
                UICfg.Home,
            ],
        },
    ],
};
