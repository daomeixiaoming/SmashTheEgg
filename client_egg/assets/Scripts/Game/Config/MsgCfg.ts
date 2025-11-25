export interface IAPPInfo {
    appVersion: string;
    deviceId: string;
    deviceName: string;
    deviceType: number;
    systemVersion: string;
    statusBarHeight: number; // 34
    navigationBarHeight: number;
    safeAreaInsetBottom: number; // 44
}

export interface HttpResponse {
    code?: number;
    message?: string;
    result?: HomeResponse;
    [property: string]: any;
}

export interface BoxInfo {
    /**
     * 宝箱数量
     */
    num?: number;
    /**
     * 宝箱类型，1为钻石宝箱，2为黄金宝箱，3为白银宝箱
     */
    type?: number;
    [property: string]: any;
}

export interface AttackInfo {
    /**
     * 攻击消耗破魔卷
     */
    price?: number;
    /**
     * 攻击类型，1为500，2为2500，3为5000
     */
    type?: number;
    [property: string]: any;
}

export interface HomeResponse {
    /**
     * 宝箱信息
     */
    attackList?: AttackInfo[];
    /**
     * 当前血量
     */
    blood?: number;
    /**
     * 宝箱信息
     */
    boxList?: BoxInfo[];
    /**
     * 最大血量
     */
    maxBlood?: number;
    /**
     * 复活时间戳
     */
    respawnAt?: number;
    /**
     * 剩余复活时间
     */
    respawnTimer?: number;
    [property: string]: any;
}