/** ボタン要素 */
// コピーボタン要素を取得
const button = document.getElementById('copyButton');
// デバイステンプレートボタン要素を取得
const deviceCopyButton = document.getElementById('browserCopyButton');
// テストテンプレボタン要素を取得
const caseCopyButton = document.getElementById('caseCopyButton');
// 結果表示要素を取得
const resultArea = document.getElementById('result');

/** イベント */
/**
 * 表作成・コピーのイベント
 * 入力値を元にヘッダーと表要素を作成してテーブルを作成する
 */
button.addEventListener('click', (e) => {
  // デフォルトイベント（submitボタンで本来発生するフォーム送信）キャンセル
  e.preventDefault();

  /** html要素の取得 */
  // ヘッダの数値取得
  const headerNum = document.getElementById('headerNum').value;
  // 表要素の数取得
  const tableContentNum = document.getElementById('contentNum').value;

  /** 変数の定義 */
  // 表
  let table = '';
  // ヘッダ
  let headerContent = '';
  // 表要素
  let tableContent = '';

  // 値が未入力の時は表の作成・コピーを行わない（値の監視を作成するのが面倒なのでここで判定）
  if (!headerNum || !tableContentNum) {
    resultArea.textContent = '値のいずれかが未入力です'
  }else{
    // ヘッダの作成
  for (i = 0; i < headerNum; i ++) {
    headerContent += '|_.  ';
  }

  // ヘッダの末尾を閉じる
  headerContent += '|\n';
  // 表要素の作成
  for (j = 0; j < tableContentNum; j ++) {
    // ヘッダー分追加
    for (k = 0; k < headerNum; k ++) {
      tableContent += '|  ';
    }
    // 表要素を閉じる
    tableContent += '|\n';
  }

  // 表の作成
  table = headerContent + tableContent;
  // コピー実施
  const copyResult = copyTable(table);
  // コピー結果を表示
  resultArea.textContent = copyResult? 'コピーに成功しました' : 'コピーに失敗しました'
  }

  // 3秒後メッセージを非表示にする
  window.setTimeout(function() {
    resultArea.textContent = ''
  }, 3000)
})

/**
 * デバイスのデフォルト文字列のコピー
 * テンプレ文字列は面倒臭いのでそのまま関数内に入力してます
 */
deviceCopyButton.addEventListener('click', e => {
  // デフォルトイベント（submitボタンで本来発生するフォーム送信）キャンセル
  e.preventDefault();
  // デバイスのテンプレ文字列
  const deviceTemplate = '|_. デバイス |_. バージョン |\n| デバイス名 | xx.xx.xx |\n| デバイス名 | xx.xx.xx |\n| デバイス名 | xx.xx.xx |'
  // デバイステンプレ文字列のコピー実行
  const copyResult = copyTable(deviceTemplate)
  // コピー結果の表示
  resultArea.textContent = copyResult? 'コピーに成功しました' : 'コピーに失敗しました'
})

/**
 * ケースのデフォルト文字列のコピー
 * テンプレ文字列は面倒臭いのでそのまま関数内に入力してます
 */
caseCopyButton.addEventListener('click', e => {
  // デフォルトイベント（submitボタンで本来発生するフォーム送信）キャンセル
  e.preventDefault();
  // デバイスのテンプレ文字列
  const caseTemplate = '|_. No |_. 操作 |_. 期待値 |_. 結果PC |_. 結果SP |\n| 1 | 操作① | 期待値① |  |  |\n| 2 | 操作② | 期待値② |  |  |\n| 3 | 操作③ | 期待値③ |  |  |'
  // デバイステンプレ文字列のコピー実行
  const copyResult = copyTable(caseTemplate)
  // コピー結果の表示
  resultArea.textContent = copyResult? 'コピーに成功しました' : 'コピーに失敗しました'
})

/** 関数 */
/**
 * クリップボードコピー関数
 * 一時的にtextareaを要素として追加、選択、コピーを行ってクリップボードに値を追加
 * 参考：https://webllica.com/copy-text-to-clipboard/
 * @param テキスト（今回はredmineのtable要素）
 * @return テキストコピーが成功すればtrueを返却する
 */
const copyTable = text => {
  // textarea生成（コピー元）
  const copyForm = document.createElement('textarea');
  // textareaに表を追加
  copyForm.textContent = text;
  // body要素の取得
  const bodyElm = document.getElementsByTagName('body')[0];
  // bodyにフォーム要素を追加
  bodyElm.appendChild(copyForm);
  // textareaの文字を選択
  copyForm.select();
  // textareaのコピー実施（クリップボードに保存）、結果を保存
  const result = document.execCommand('copy');
  // bodyからtextareaを削除
  bodyElm.removeChild(copyForm);
  // コピーが成功したか返却
  return result;
};