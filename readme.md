# WEBPACK practice

### 環境
* nvm 0.39.1
* npm 8.3.1
* node v17.4.0
* webpack 5.68

### 安裝歷程
1. 安裝nvm
``curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash``

2. 安裝nodeJS
``nvm install node``

### npm歷程
1. 初始專案
``npm init``

2. 安裝webpack
``npm install webpack webpack-cli --save-dev``

3. 安裝測試伺服器
``npm install webpack-dev-server --save-dev``

4. 安裝css loader（分離css檔）
``npm install css-loader mini-css-extract-plugin --save-dev``

5. 安裝css fixer（自動處理瀏覽器相容）
``npm install postcss-loader autoprefixer --save-dev``

6. 安裝babel (轉譯ES6語法)
``npm install babel-loader @babel/core @babel/preset-env --save-dev``

7. 檔案搬移（非必要，需判斷副檔名）
``npm install file-loader --save-dev``

8. 圖檔壓縮（非必要）
``npm install image-webpack-loader --save-dev``

9. 檔案搬移（非必要，直接搬移幕錄下所有檔案）
``npm install copy-webpack-plugin --save-dev``

10. html樣板模組
``npm install html-webpack-plugin html-loader pug-html-loader --save-dev``

---
### 打包&測試
package.json scripts
+ ``npm run dev`` 開啟測試瀏覽器
+ ``npm run build`` 開發環境打包
+ ``npm run deploy`` 正式環境打包

---
### 其他
* **url-loader** 在webpack5讀取css的url路徑時，會一直轉出亂碼檔名，所以使用 **copy-webpack-plugin** 直接打包檔案路徑
* pug樣板語法 https://github.com/willyelm/pug-html-loader
* .babelrc 為 **@babel/core** 設定檔
* postcss.config.js 為 **postcss-loader** 設定檔