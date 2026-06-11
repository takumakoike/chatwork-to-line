// Version1.1の内容
/**
 * チャットワークから自分に紐づくタスクを取得する
 * 未完了タスクをスプレッドシートに書き出す
 * スプレッドシートの『未完了タスク』シートから、期限越えと明日期限・本日期限のタスクをピックアップする
 * ピックアップしたタスクをLINEでメッセージ投稿する
 * 毎日朝6時に定時実行する
 * */ 

function get_body(){
  var id = "1K_7LlrwBLC2N6lLuvJPyKFaNCav2HdgUUexfuZFFuxM";
  var file = DocumentApp.openById(id);
  var body = file.getBody().getText();
  console.log(body);

  return body;
}

function picktask() { /**チャットワークから自分に紐づいているタスクをピックアップする */
  const API = "4ee3fb6e3b26b56d59e5e8d4af149f93";
  
  // ライブラリの使用準備
  const CLIENT = ChatWorkClient.factory({token: API});
  
  //自分のタスクを取得 
  let result = CLIENT.getMyTasks();
  console.log(result);

  var arr = [];
  for(i=0; i<result.length; i++){
    var room = "\n\n●タスクのあるチャット●\n" + result[i]["room"]["name"];
    var task_body = "\n\n○タスク内容\n" + result[i]["body"];
    var deadline = result[i]["limit_time"];
      if(deadline == 0){
        var deadline = "期日設定なし";
      }else{
        var deadline = "\n\n○期日\n" + Utilities.formatDate(new Date( deadline * 1000 ), "JST", "yyyy/MM/dd") + "\n＝＝＝＝＝＝＝＝＝＝";
      }


    arr.push([room,task_body,deadline]);
  }

  console.log(arr);
  // console.log(result[0]["limit_time"]);

  return arr;
}

function linemessage(){/**LINEからメッセージを送る */
  const PERSONAL_ID = "Uf947e5b8580ba491c8d488c6dde78df4";
  const CHANNEL_ACCESS_TOKEN = "bSa4SCU2n4A6pJ6cA43uuhaQQvNFFhSUy5XHKhEjyWomRIlGk1b0wDGG8nVWIWIsRf70DDkLb8riPTVcw2XtMN4fEGJZRLXVNuXqQpGnoLDx4CO6SD6mDTwUN3d16aDrohtY4mWXRmxJmR6Mzs3MOAdB04t89/1O/w1cDnyilFU=";
  const url = 'https://api.line.me/v2/bot/message/push';

  // メッセージ文章
  var message_body = get_body() + picktask();

  const payload = {
    to: PERSONAL_ID,　//ユーザーID
    messages: [
      { type: 'text', text: message_body }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}









