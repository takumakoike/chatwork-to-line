declare const ChatWorkClient: {
    factory(options: { token: string }): any;
};

// ファイル内共通の変数
const props = PropertiesService.getScriptProperties();

const scriptAPI_KEY = props.getProperty("CHATWORK_API_KEY")
const scriptPERSONAL_ID = props.getProperty("LINE_PERSONAL_ID");
const scriptLINE_CHANNEL_ACCESS_TOKEN = props.getProperty("LINE_CHANNEL_ACCESS_TOKEN");
const API = scriptAPI_KEY ? scriptAPI_KEY : Config.CHATWORK_API_KEY;
const PERSONAL_ID = scriptPERSONAL_ID ? scriptPERSONAL_ID: Config.LINE_PERSONAL_ID;
const CHANNEL_ACCESS_TOKEN = scriptLINE_CHANNEL_ACCESS_TOKEN ? scriptLINE_CHANNEL_ACCESS_TOKEN : Config.LINE_CHANNEL_ACCESS_TOKEN;


function test() {

}

interface TASKS {
    room: string,
    task_body: string,
    deadline: string,
}

/**
 * チャットワークから自分に紐づいているタスクをピックアップする関数
 * */
function picktask(): TASKS[] {
    // ライブラリの使用準備
    const CLIENT = ChatWorkClient.factory({ token: API });

    //自分のタスクを取得 
    let result = CLIENT.getMyTasks();
    console.log(result);

    const arr: TASKS[] = [];
    for (let i = 0; i < result.length; i++) {
        const room = `\n\n●タスクのあるチャット●\n${result[i]["room"]["name"]}`;
        const task_body = `\n\n○タスク内容\n${result[i]["body"]}`;
        const deadline = result[i]["limit_time"] === 0 ? "期日設定なし" : `\n\n○期日\n${Utilities.formatDate(new Date(result[i]["limit_time"] * 1000), "JST", "yyyy/MM/dd")}\n＝＝＝＝＝＝＝＝＝＝`;

        arr.push({room, task_body, deadline});
    }

    console.log(arr);
    // console.log(result[0]["limit_time"]);

    return arr;
}

/**
 * LINEからpushメッセージを送る関数
 * */ 
function linemessage(): void {
    const url = 'https://api.line.me/v2/bot/message/push';

    // メッセージ文章
    const message_body = `未完了のタスクは以下になります。\n\n${picktask()}`;

    const payload = {
        to: PERSONAL_ID,    //ユーザーID
        messages: [
            { type: 'text', text: message_body }
        ]
    };

    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'post',
        contentType: 'application/json',
        headers: {
            Authorization: 'Bearer ' + CHANNEL_ACCESS_TOKEN
        },
        payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, params);
}