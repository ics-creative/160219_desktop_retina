var _this = this;
window.addEventListener("load", function () { return _this.init(); });
/**
 * windowのロードが完了した時に実行される処理
 */
function init() {
    // <canvas>要素の高解像度対応なし
    this.setImage("images/cat.png", "myCanvas");
    // <canvas>要素の高解像度対応あり。2倍の画像を準備する。
    this.setImage("images/cat_retina.png", "myRetinaCanvas", true);
}
/**
 * 画像をcanva要素に表示する処理
 * @param imgSrc 画像のパス
 * @param targetCanvasID 画像を表示するcanvas要素のID
 * @param isRetina 高解像度対応をするかどうか
 */
function setImage(imgSrc, targetCanvasID, isRetina) {
    var _this = this;
    if (isRetina === void 0) { isRetina = false; }
    var catImage = new Image();
    catImage.src = imgSrc;
    catImage.addEventListener("load", function (event) { return _this.catImageLoadedHandler(event, targetCanvasID, isRetina); });
}
/**
 *
 * 画像の読み込みが完了した時に実行される処理
 * @param event 読み込み完了イベント。event.targetで画像にアクセスできる
 * @param targetCanvasID 画像を表示するcanvas要素のID
 * @param isRetina 高解像度対応をするかどうか
 */
function catImageLoadedHandler(event, targetCanvasID, isRetina) {
    var myCanvas = document.getElementById(targetCanvasID);
    var ctx = myCanvas.getContext('2d');
    ctx.drawImage(event.target, 0, 0);
    // 高解像度対応の場合は、あらかじめ2倍の大きさで作ったcanvas要素を、スタイル設定で半分の幅と高さにする。
    if (isRetina) {
        myCanvas.style.width = String(myCanvas.width / 2) + "px";
        myCanvas.style.height = String(myCanvas.height / 2) + "px";
    }
}
//# sourceMappingURL=index.js.map