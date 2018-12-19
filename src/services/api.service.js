import listSurveysResponse from "../mocks/ListSurveys";

export const request = action => {
  switch (action) {
    case "LIST_SURVEYS": {
      return Promise.resolve({ response: listSurveysResponse });
    }
    default:
      return Promise.resolve({});
  }
};
