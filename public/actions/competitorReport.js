import fetcher from 'util/fetcher';

const COMPETITOR_REPORT_ACTIONS = {
  fetchingCompetitorReport: () => {
    return {
      type: 'FETCHING_COMPETITOR_REPORT'
    };
  },

  fetchedCompetitorReport: (report) => {
    return {
      type: 'FETCHED_COMPETITOR_REPORT',
      payload: report
    };
  },

  reportError: (error) => {
    return {
      type: 'REPORT_ERROR',
      error
    };
  }
};

exports.getReport = (competitorReportId) => {
  return (dispatch) => {
    dispatch(COMPETITOR_REPORT_ACTIONS.fetchingCompetitorReport());

    fetcher.get(`/api/v1/competitor-reports/${competitorReportId}`, (report) => {
      if (report.error)
        return dispatch(COMPETITOR_REPORT_ACTIONS.reportError(report.error));

      return dispatch(COMPETITOR_REPORT_ACTIONS.fetchedCompetitorReport(report));
    });
  };
};