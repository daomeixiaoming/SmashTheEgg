let IP = "192.168.3.225";
// 网络配置
// CC_DEBUG = false;
export const NetCfg = {
  IP: IP, //IP 本地127.0.0.1 本地测试10.0.0.151
  PORT: 6086, //端口
  // 长连接
  wss: CC_DEBUG
    ? "wss://api-test.liveboxs.live/game/ws/ws"
    : "wss://api.liveboxs.live/game/ws/ws",
  url: CC_DEBUG
    ? "https://api-test.liveboxs.cn/game/"
    : "https://api.liveboxs.cn/game/",
  gameType: 118, // 游戏类型
  roomId: 1000013, // 房间id
  anchorId: 153, //主播id
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjozMTcsImxvZ2luX3R5cGUiOjEsInVzZXJfa2V5IjoiMzg0N2I5MDUtODY5OC00MzcwLTkxNTYtZDc3ZDJlNzBhNDdiIiwidG9rZW5fdHlwZSI6ImFwcCIsInVzZXJuYW1lIjoi55So5oi3MzE3NDM5In0.1gGYg0S22RuYvcDDwjW-wxfROLOBcmJzu5RJhXPPqslM-4wk-ac_ub1Dg-qBHe2e9Gqr9b8HZtCzCptFMvQSmA",
};
