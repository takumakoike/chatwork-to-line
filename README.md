# 概要

チャットワークからLINEにタスクを通知するbot

## 事前準備

| 項目 | 用途 | 取得場所 |
| ----- | ----- | ----- |
| CHATWORK_API_KEY | タスク一覧取得（個人トークン） | Chatwork 設定 → API |
| LINE_PERSONAL_ID | LINE通知相手となる自分のID | LINE messageing API　→ チャンネル基本設定 |
| LINE_CHANNEL_ACCESS_TOKEN | LINE通知のためのトークン | LINE messaging API →　Messaging API設定 |

## 変数の管理について

`config.ts`を作成した上で変数を定義してください。

```text
namespace Config{
    <!-- ここに記載 -->
}
```

## ライブラリの利用について

GAS エディタの「ライブラリ」から `ChatWorkClient` を追加します。

| 項目          | 値                                                          |
| ------------- | ----------------------------------------------------------- |
| スクリプト ID | `1nf253qsOnZ-RBd7fFIBMQFb7MFMxKQMzEjcWIZwkGeTak7qoVCTRoXdL` |
| バージョン    | 最新の安定版                                                |
