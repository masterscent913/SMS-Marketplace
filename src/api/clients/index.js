import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
import { deepCopy } from "src/utils/deep-copy";
import { client, clients } from "./data";

class ClientsApi {
  getClients(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = deepCopy(clients);
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = data.filter((client) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties = ["name"];

          properties.forEach((property) => {
            if (
              client[property]
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

  getClient(request) {
    return Promise.resolve(deepCopy(client));
  }
}

export const clientsApi = new ClientsApi();
