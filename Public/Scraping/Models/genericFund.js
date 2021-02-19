/**
 * Generic fund object for JSON api
 */
function GenericFundObject(name, oneWeek, oneMonth, threeMonth, oneYear) {
    this.Name = name;
    this.OneWeekReturnRate = oneWeek;
    this.OneMonthReturnRate = oneMonth;
    this.ThreeMonthReturnRate = threeMonth;
    this.OneYearReturnRate = oneYear;
}

module.exports = GenericFundObject;