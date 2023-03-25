import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import { deepCopy } from "src/utils/deep-copy";
import { number, numbers, emails, invoices, logs } from "./data";

class NumbersApi {
  getNumbers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(numbers);
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = data.filter((number) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties = ["name"];

          properties.forEach((property) => {
            if (
              number[property]
                .toLowerCase()
                .includes(filters.query.toLowerCase())
            ) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.subscribed !== "undefined") {
          if (number.status !== "subscribed") {
            return false;
          }
        }

        if (typeof filters.unsubscribed !== "undefined") {
          if (number.status !== "unsubscribed") {
            return false;
          }
        }

        if (typeof filters.mobile !== "undefined") {
          if (number.type !== "mobile") {
            return false;
          }
        }

        if (typeof filters.landline !== "undefined") {
          if (number.type !== "landline") {
            return false;
          }
        }

        if (typeof filters.isReturning !== "undefined") {
          if (number.isReturning !== filters.isReturning) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== "undefined" && typeof sortDir !== "undefined") {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  getNumber(request) {
    return Promise.resolve(deepCopy(number));
  }

  getEmails(request) {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request) {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request) {
    return Promise.resolve(deepCopy(logs));
  }
}

export const numbersApi = new NumbersApi();
