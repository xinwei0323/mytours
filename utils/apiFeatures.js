class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //用來執行mongoose 動作
    this.queryString = queryString; //要做的動作內容
  }

  filter() {
    // /api/v1/tours?difficulty=easy&duration[gte]=5
    // {difficulty:'easy',duration:{gte:'5'}}  <--- req.query
    const queryObj = { ...this.queryString }; // copy queryString to queryObj
    const excludeFields = ["page", "sort", "limit", "fields"]; //需要排除的key,不需要用來查詢的鍵值
    excludeFields.forEach((el) => delete queryObj[el]); // 用delete 來刪除

    let queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //將duration:{gte:5} 變成 duration:{$gte:5}

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // /api/v1/tours?sort=-price,-ratingAverage
      // 轉成 -price -ratingAverage
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // 前面加上 - 表示這項拿掉
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // get page
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit; //跳過多少筆資料
    this.query.skip(skip).limit(limit);
    //page=3,limit=5, 跳過前面10筆資料，從第11開始，表示第三頁
    return this;
  }
}
module.exports = APIFeatures;
