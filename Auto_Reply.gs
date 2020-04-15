function for_users() {

//自動返信メールの件名
 var title = "【福島大学絆会　お申し込みありがとうございます】"; 
 
 //自動返信メールの本文　\nは改行。 
 var body
 = "この度は福島大学絆会にお申し込みいただき、誠にありがとうございます。\n"
 + "内容を確認の上、あらためてご連絡いたしますので、今しばらくお待ちください。\n"
 + "このメールは自動返信メールです。\n"
 + "------------------------------------------------------------\n\n"

var body2
 = "\n"
 + "∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽\n"
 + "福島大学絆会 事務局\n"
 + "〒960-1296 福島市金谷川1番地　福島大学研究振興課内\n"
 + "Tel：024-503-3239　　Fax：024-548-5209\n"
 + "Mail：kizuna@adb.fukushima-u.ac.jp\n"
 + "絆会HP：http://gakujyutu.net.fukushima-u.ac.jp/kizuna/index.html\n"
 + "∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽\n\n"
 
 //変数を設定
 var name = 'ご担当者（お名前・所属・役職）'; //フォームの項目名と同じにする
 var mail = 'メールアドレス'; //フォームの項目名と同じにする
 var address = "";
 var options = {name:'福島大学絆会申込',cc:'kizuna@adb.fukushima-u.ac.jp',replyTo:'kizuna@adb.fukushima-u.ac.jp'};
 
 var sheet = SpreadsheetApp.getActiveSheet();
 var row = sheet.getLastRow();
 var column = sheet.getLastColumn();
 var range = sheet.getDataRange();
 var TIMESTAMP_LABEL = 'タイムスタンプ';
 
 for (var i = 1; i <= column; i++ ) {
 
 //スプレッドシートの入力項目名
 var item = range.getCell(1, i).getValue(); 
 
 //スプレッドシートの入力値
 var value = range.getCell(row, i).getValue();
 
 //タイムスタンプ→お問い合わせ日時
 if ( item === TIMESTAMP_LABEL ) {
 item = 'お申し込み日時';
 }

// 日付フォーマットの変換
 if ( item === 'お申し込み日時' ) {
 value = Utilities.formatDate(value, 'Asia/Tokyo', "YYYY'年'MM'月'dd'日'HH'時'mm'分'ss'秒'");
 }

//本文（body）にフォームの入力項目を追加 
 body += "■"+item+"\n";
 
 //本文にフォームの入力内容を追加
 body += value + "\n\n";
 
 //フォームの入力項目が「お名前」の場合は、「様」をつけて、本文の前に追加 
 if ( item === name ) {
 body = value+" 様\n\n"+body;
 }
 
 //フォームの入力項目が「ご連絡先メールアドレス」の場合は、変数addressに入れる
 if ( item === mail ) {
 address = value;
 }
 }
 
 //本文1に本文2を追加
 body += body2;
 
 //宛名＝address、件名＝title、本文=bodyで、メールを送る
 GmailApp.sendEmail(address,title,body,options);
}
