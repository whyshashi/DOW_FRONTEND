import { method } from "lodash";
import API_FETCHER from "../../Utils/Common";
import { API_ENDPOINTS } from "../api_endpoints/endpoints";

//document-management-safetyProtocol-cards
export const get_documentManagement_safetyPrototol_CardData = (id, page) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DOCUMENT_MANAGEMENT_CARDS_SAFETY_PROTOCOL}/${id}?page=${page}`,
  });
};
export const update_document = (docId, data) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.UPDATE_DOCUMENT}/${docId}`,
    method: "PATCH",
    data: data,
  });
};
//safety-training-cards
export const get_safetyTraining_CardData = (id, page) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.SAFETY_TRAINING_CARD_DATA}/${id}?page=${page}`,
  });
};

export const get_manage_categories = () => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.MANAGE_CATEGORIES}`,
  });
};

export const post_manage_categories = (data) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.CREATE_MANAGE_CATEGORIES}`,
    method: "POST",
    data: { names: data }, // Ensure correct format
  });
};
export const delete_manage_category = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DELETE_MANAGE_CATEGORY}/${id}`, // Assuming DELETE uses the category name as a parameter
    method: "DELETE",
    data: { id: id },
  });
};
export const get_safety_categories = () => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.SAFETY_CATEGORIES}`,
  });
};

export const post_safety_categories = (data) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.CREATE_SAFETY_CATEGORIES}`,
    method: "POST",
    data: { names: data }, // Ensure correct format
  });
};
export const delete_safety_category = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DELETE_SAFETY_CATEGORY}/${id}`, // Assuming DELETE uses the category name as a parameter
    method: "DELETE",
    data: { id: id },
  });
};
export const search_data = (data, id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.SEARCH_DATA}?titleSearch=${data}&categoryId=${id}`,
    method: "GET",
  });
};

export const search_training_doc = (data, id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.GET_ALL_TRAINING_DOC}?searchTitle=${data}&categoryId=${id}`,
    method: "GET",
  });
};
export const delete_data = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DELETE_DOCUMENT_MANAGEMENT_DATA}/${id}`,
    method: "DELETE",
  });
};
export const delete_safety_data = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DELETE_SAFETY_DATA}/${id}`,
    method: "DELETE",
  });
};
export const user_management_staff = (page, inputText) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.USER_MANAGEMENT_GET_ALL_STAFF}?page=${page}&limit=20&nameSearch=${inputText}`,
    method: "GET",
  });
};

export const user_management_view = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.USER_MANAGEMENT_VIEW}/${id}`,
    method: "GET",
  });
};

export const user_management_edit = (data, id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.USER_MANAGEMENT_EDIT}/${id}`,
    data: data,
    method: "PATCH",
  });
};

export const user_management_search = (name) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.USER_MANAGEMENT_SEARCH}?nameSearch=${name}`,
    method: "GET",
  });
};

export const post_create_doc = (data) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.CREATE_DOCUMENT}`,
    method: "POST",
    data: data,
  });
};
export const post_create_training = (data) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.CREATE_TRAINING}`,
    method: "POST",
    data: data,
  });
};
export const post_question_answer = (questions, id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.CREATE_QUESTIONS}/${id}`,
    method: "POST",
    data: {
      questions: questions.map((q) => ({
        questionType: q.questionType,
        question: q.question,
        answer: q.answer,
        // Ensure options are an array of strings, not objects
        options:
          q.options && q.options.length > 0
            ? q.options.map((option) => option.optionText || option) // Extract optionText or fallback to option if it's already a string
            : undefined,
        createdBy: q.createdBy,
      })),
    },
  });
};
export const view_all_questions = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.VIEW_ALLQUESTION}/${id}`,
    method: "GET",
  });
};
export const get_training_doc = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.GET_TRAINING_DOC}/${id}`,
    method: "GET",
  });
};
/////////////////////////
export const get_doc_bycategory = (id) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.GET_DOC_Bycategory}?documentId=${id}`,
    method: "GET",
  });
};

export const incident_reporting_stats = (year) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.INCIDENT_REPORTING_STATS}?year=${year}`,
    method: "GET",
  });
};

export const incident_reporting_table_data = (
  searchIncident,
  incidentID,
  riskLevel,
  incidentStatus,
  today,
  page
) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.INCIDENT_REPORTING_TABLE_DATA}?searchDescription=${searchIncident}&_id=${incidentID}&riskLevel=${riskLevel}&incidentStatus=${incidentStatus}&today=${today}&page=${page}`,
    method: "GET",
  });
};

// export const incident_reporting_search = () => {
//   return API_ENDPOINTS({
//     url:`${}`,
//     method:"GET"
//   });
// };

export const dashboard_documents_data = (year) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DASHBOARD_DOCUMENTS_DATA}?year=${year}`,
    method: "GET",
  });
};
export const dashboard_safety_training_data = (year) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DASHBOARD_SAFETY_TRAINING_DATA}?year=${year}`,
    method: "GET",
  });
};
// ye wali
export const document_management_table_data = (id,search) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.DOCUMENT_MANAGEMENT_TABLE_VIEW}/${id}?nameSearch=${search}`,
  });
};
export const login = (formData) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.LOGIN}`,
    data: formData,
    method: "POST",
  });
};

export const update_specific_incident = (id, actionTaken, status) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.UPDATE_INCIDENT_REPORTING_SPECIFIC_PAGE_CHANGES}/${id}?incidentStatus=${status}&actionTaken=${actionTaken}`,
    method: "PATCH",
  });
};

export const get_incident_data = (year) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.LINE_CHART_INCIDENT_API}/${year}`,
    method: "GET",
  });
};

export const get_user_data = (year) => {
  return API_FETCHER({
    url: `${API_ENDPOINTS.LINE_CHART_USER_API}/${year}`,
    method: "GET",
  });
};


