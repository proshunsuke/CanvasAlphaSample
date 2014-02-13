/*
概要
キャンバスを２つ用意する
１つは描画用, もう１つは描画した内容を上書きする用
実際に見えてるのは描画した内容を上書きする用のキャンバス
描画用のキャンバス自体の透明度を変えて描画し, その内容を上書きする
*/

window.onload = function(){ // 最初に呼び出される

    init();
    mouseEvent();

}

/*変数*/
var mCanvasDrawing; // 実際に描くキャンバス
var mCanvasTarget; // mCanvasDrawingの内容を上書きするキャンバス

var mIsDrawable;

var mOffset;
var mStartX;
var mStartY;

var kAlpha; // 透明度

var mEndX;
var mEndY;

/*初期化処理*/
function init(){// 初期化
    mCanvasDrawing = document.getElementById("canvasDrawing");
    mCanvasTarget = document.getElementById("canvasTarget");

    mIsDrawable = false;

    mOffset = 5;

    kAlpha = 0.1;
}

/*イベント処理*/
function mouseEvent(){ // イベント
    addEventListener("mousedown",mousedown,false);
    addEventListener("mousemove",mousemove,false);
    addEventListener("mouseup",mouseup,false);
    addEventListener("mouseleave",mouseleave,false);
}

mousedown = function(e){ // マウス押した時
    mIsDrawable = true;

    mStartX = e.pageX - mCanvasDrawing.offsetLeft - mOffset;
    mStartY = e.pageY - mCanvasDrawing.offsetTop - mOffset;
    mCanvasDrawing.style.opacity = kAlpha; // mCanvasDrawingのキャンバス自体の透明度を設定
}

mousemove = function(e){ // マウス動いている時
    if(mIsDrawable){
        mEndX = e.pageX - mCanvasDrawing.offsetLeft - mOffset;
        mEndY = e.pageY - mCanvasDrawing.offsetTop - mOffset;
        drawCore(mCanvasDrawing,mEndX,mEndY); // mCanvasDrawingに描画する
        mStartX = mEndX;
        mStartY = mEndY;
    }
}

mouseup = function(e){ // マウス離した時
    mCanvasDrawing.getContext("2d").globalCompositeOperation = "source-over";
    mCanvasDrawing.getContext("2d").globalAlpha = 1.0; // mCanvasDrawingの透明度を1に

    // mCanvasTargetに上書きする
    mCanvasTarget.getContext("2d").globalAlpha = kAlpha; // mCanvasTargetのキャンバス自体の透明度を設定
    mCanvasTarget.getContext("2d").drawImage(mCanvasDrawing,0,0); // mCanvasTargetにmCanvasDrawingを上書き
    mCanvasTarget.getContext("2d").globalAlpha = 1.0; // mCanvasTargetの透明度を1に

    mCanvasDrawing.getContext("2d").clearRect(
        0,0,mCanvasDrawing.width,mCanvasDrawing.height); // mCanvasDrawingの内容を消す

    mIsDrawable = false;
}

mouseleave = function(){ // マウスが離れている時
    mIsDrawable = false;
}

/*描画処理*/
function drawCore(canvas,x,y){ // 描画
    var context = canvas.getContext('2d');
    context.beginPath();
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = "#000000";
    context.lineWidth = 10;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.shadowBlur = 0;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.moveTo(mStartX, mStartY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
}


