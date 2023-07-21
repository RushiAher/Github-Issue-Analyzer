// function to get count of open issues
const getOpenIssues = (data) => {
  let openIssueCount = 0;
  data.map((currIssue) => {
    if (currIssue.state == "open") {
      openIssueCount++;
    }
    return 0;
  });
  return openIssueCount;
};

// function to get issues raised in last 10 weeks
const getLastTenWeeksIssues = (data) => {
    let issueCount = 0;
    let date = new Date();
    let tenWeeksAgo = date - 1000 * 60 * 60 * 24 * 70;
    tenWeeksAgo = new Date(tenWeeksAgo);
  data.map((currIssue) => {
    let currDate = new Date(currIssue.created_at.toLocaleString());
      if (currDate >= tenWeeksAgo) {
          issueCount++;
    }
    return 0;
  });
    return issueCount;
};

export { getOpenIssues, getLastTenWeeksIssues };
