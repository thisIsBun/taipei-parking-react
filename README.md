# 來台北拍洽 1.0

這是一個提供台北市停車場空位熱點圖的 app，希望增加開車使用者的視覺判斷，快速找到理想停車位。<br/>
app demo：https://thisisbun.github.io/taipei-parking-react/


<h2>功能介紹</h2>
- 自動定位裝置位置<br/>
- 地圖畫面標記「目前位置」及「停車場」<br/>
- 可用標記顏色判斷該停車場空位率 (越淺表示空位率越高)<br/>
- 點擊停車場標記後，可看到該停車場詳細資訊(包含費率、空位數等)<br/>
- 選定停車場後，可使用 google map導航<br/>
<img width="1396" alt="image" src="https://user-images.githubusercontent.com/106903594/200975162-c179b356-21fa-449a-941d-5ab0ccff13c9.png">


<h2>開發工具</h2>
後台資料：<br/>
- 政府資料開放平臺 > 台北市停車場資訊(https://data.gov.tw/dataset/128435)<br/>
- google map api<br/>
<br/>
使用套件：<br/>
react、react-redux、react-router-dom、axios、google-map-react、bootstrap、styled-components、twd97-to-latlng


<h2>安裝指南</h2>
1. 請先確認本機環境已經有安裝 Node.js，建議使用 nvm安裝 Node.js，並切換到 v16.16.0
2. 在本機開啟終端機，輸入以下指令將此專案複製到本機：
   ```
   git clone https://github.com/thisIsBun/taipei-parking-react.git
   ```
3. 終端機移動到專案資料夾(檔案名稱：taipei-parking-react)後，先輸入以下指令安裝套件：
   
   ```
   npm install
   ```
      
4. 再繼續輸入以下指令，完成執行就安裝完成了
   ```
   npm start
   ``` 
