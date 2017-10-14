import fetcher from 'util/fetcher';

const COMPANY_ACTIONS = {
  fetchingCompany: () => {
    return {
      type: 'FETCHING_COMPANY',
    };
  },

  fetchedCompany: (company) => {
    return {
      type: 'FETCHED_COMPANY',
      payload: company,
    };
  },

  errorFetchingCompany: (error) => {
    return {
      type: 'ERROR_FETCHING_COMPANY',
      error,
    };
  },

  postingCompany: () => {
    return {
      type: 'POSTING_COMPANY',
    };
  },

  postedCompany: (company) => {
    return {
      type: 'POSTED_COMPANY',
      payload: { company },
    };
  },

  errorPostingCompany: (error) => {
    return {
      type: 'ERROR_POSTING_COMPANY',
      error,
    };
  },
};

exports.getCompany = (companyId) => {
  return (dispatch) => {
    dispatch(COMPANY_ACTIONS.fetchingCompany());

    return fetcher.get(`/api/v1/companies/${companyId}`, (company) => {
      if (company.error)
        return dispatch(COMPANY_ACTIONS.errorFetchingCompany(company.error));

      return dispatch(COMPANY_ACTIONS.fetchedCompany(company));
    });
  };
};

exports.postCompany = (options) => {
  return (dispatch) => {
    dispatch(COMPANY_ACTIONS.postingCompany());

    return fetcher.post('/api/v1/companies', options, (company) => {
      if (company.error)
        return dispatch(COMPANY_ACTIONS.errorPostingCompany(company.error));

      return dispatch(COMPANY_ACTIONS.postedCompany(company));
    });
  };
};