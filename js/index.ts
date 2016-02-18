window.addEventListener("load", () => this.init());

/**
 * windowのロードが完了した時に実行される処理
 */
function init():void {
	// <canvas>要素の高解像度対応なし
	this.setImage("images/cat.png", "myCanvas");

	// canvas要素の高解像度対応。高解像度の画像を表示する（今回は800×800pxの画像）。
	this.setImage("images/cat_retina.png", "myRetinaCanvas", true);

	// デバイスピクセル比表示の為の処理。canvas表示とは無関係。
	document.getElementById("devicePixelRatioInfo").innerText = "devicePixelRatio:" + (window.devicePixelRatio ? String(window.devicePixelRatio) : "1");
}

/**
 * 画像をcanvas要素に表示する処理
 * @param imgSrc 画像のパス
 * @param targetCanvasID 画像を表示するcanvas要素のID
 * @param isRetina 高解像度対応をするかどうか
 */
function setImage(imgSrc:string, targetCanvasID:string, isRetina:boolean = false):void {
	var catImage:HTMLImageElement = new Image();
	catImage.src = imgSrc;
	catImage.addEventListener("load", (event:Event) => this.catImageLoadedHandler(event, targetCanvasID, isRetina));
}

/**
 * 画像の読み込みが完了した時に実行される処理
 * @param event 読み込み完了イベント。event.targetで画像にアクセスできる
 * @param targetCanvasID 画像を表示するcanvas要素のID
 * @param isRetina 高解像度対応をするかどうか
 */
function catImageLoadedHandler(event:Event, targetCanvasID:string, isRetina:boolean):void {
	var myCanvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(targetCanvasID);
	var image:HTMLImageElement = <HTMLImageElement> event.target;

	// 高解像度対応の処理
	if (isRetina) {
		// 1. canvas要素のwidth属性とheight属性をwindow.devicePixelRatio分だけ拡大する。
		myCanvas.width *= window.devicePixelRatio;
		myCanvas.height *= window.devicePixelRatio;

		// 2. canvas要素のstyle属性のwidthとheightをwindow.devicePixelRatio分だけ縮小する。
		myCanvas.style.width = String(myCanvas.width / window.devicePixelRatio) + "px";
		myCanvas.style.height = String(myCanvas.height / window.devicePixelRatio) + "px";
	}

	var ctx = myCanvas.getContext('2d');
	// canvas要素全体に画像を描画する。
	ctx.drawImage(image, 0, 0, myCanvas.width, myCanvas.height);
}