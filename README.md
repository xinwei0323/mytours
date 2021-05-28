#Mytours

* 這是一個用 Express,mongodb 實做的全端網站[https://mytours-allen.herokuapp.com/]

## 功能
* 使用者登入驗證與註冊(jwt )
* 選擇商品成立訂單，串接stripe用信卡用付款
* 更改使用者名稱，信箱、密碼，大頭貼
* 後台管理員新增修改刪除查詢商品 (準備中,api已完成)
* 查詢訂單資訊(準備中)

## 使用技術與工具
* 前端:
    - HTML5
    - CSS3
    - Pug
* 後端:
    - Node.js(Express)
        - cookie
        - jwt
        - email(Sendgrid)
        - Stripe 
        - mongoose
        - MVC架構
        - passwrod reset with email 
* 資料庫:
    - [Mongodb](https://www.mongodb.com/)
* 部署:
    - [Heroku](https://dashboard.heroku.com/)
