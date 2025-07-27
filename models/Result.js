// ====== models/Result.js ======
class Result {
  constructor(name, surname, score, total, percentage, detailedResults) {
    this.name = name;
    this.surname = surname;
    this.score = score;
    this.total = total;
    this.percentage = percentage;
    this.date = new Date();
    this.detailedResults = detailedResults;
  }

  static results = [];

  static create(resultData) {
    const result = new Result(
      resultData.name,
      resultData.surname,
      resultData.score,
      resultData.total,
      resultData.percentage,
      resultData.detailedResults
    );
    Result.results.push(result);
    return result;
  }

  static getAll() {
    return Result.results;
  }

  static getCount() {
    return Result.results.length;
  }

  static clear() {
    Result.results = [];
  }
}

module.exports = Result;
