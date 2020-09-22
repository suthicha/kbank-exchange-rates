const request = require("request-promise");
const cheerio = require("cheerio");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendResponse = require("../utils/sendResponse");

const getRates = catchAsync(async (req, res, next) => {
  try {
    const result = await request.get(
      "https://kasikornbank.com/en/rate/Pages/Foreign-Exchange.aspx"
    );
    const $ = cheerio.load(result, { ignoreWhitespace: true });
    let rates = [];
    $("#divLastRate > .itemsRate").each((i, elem) => {
      $(elem).each((n, obj) => {
        const dataSName = $(obj).attr("data-sname").trimEnd();
        const dataLName = $(obj).attr("data-lname").trimEnd();
        const dataBuytrav = $(obj).attr("data-buytrav").trimEnd();
        const dataBuyexp = $(obj).attr("data-buyexp").trimEnd();
        const dataBuytelex = $(obj).attr("data-buytelex").trimEnd();
        const dataBuybn = $(obj).attr("data-buybn").trimEnd();
        const dataSellchq = $(obj).attr("data-sellchq").trimEnd();
        const dataSellbn = $(obj).attr("data-sellbn").trimEnd();
        rates.push({
          dataSName,
          dataLName,
          dataBuytrav,
          dataBuyexp,
          dataBuytelex,
          dataBuybn,
          dataSellchq,
          dataSellbn,
        });
      });
    });
    sendResponse(res, rates);
  } catch (error) {
    return next(new AppError("INTERNAL_ERROR", error.message));
  }
});

module.exports = {
    getRates
};