import React, { useState } from "react";
import { getOpenIssues, getLastTenWeeksIssues } from "../utilites/utilities.js";

const Home = () => {
  const [searchInput, setSearchInput] = useState();
  const [searchResult, setSearchResult] = useState();
  const [lastTenWeekIssueCount, setLastTenWeekIssueCount] = useState();

    // fetch data for given url
  const getRepoInfo = async () => {
    try {
      if (!searchInput) {
        return alert("Please enter URL!");
      }
      const tempList = searchInput.split("/");
      const userName = tempList[tempList.length - 2];
      const repoName = tempList[tempList.length - 1];

      let url = `https://api.github.com/repos/${userName}/${repoName}/issues`;
      console.log(url);
      let res = await fetch(url);
      if (res.status == "200") {
        let data = await res.json();
        setSearchResult(data);

        setLastTenWeekIssueCount(getLastTenWeeksIssues(data));
      } else {
        alert("Please enter valid url!");

        clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

    // function to clear input filed
  const clear = () => {
    setSearchResult("");
    setSearchInput("");
  };
  return (
    <>
      {/* top bar */}
      <div className="min-h-[100vh] w-full bg-zinc-100 pt-10 px-3">
        <div className=" w-[80%] mx-auto bg-zinc-200 rounded-xl p-5 ">
          <h1 className="text-3xl font-bold text-center">
            Github Issue Analyzer
          </h1>
          <p className="text-base font-normal text-center">
            Get list of all issues raised in any github repository.
          </p>
        </div>

        {/* search input */}
        <div className="my-10 w-full flex justify-center gap-3 items-end">
          <div className="form-control w-full max-w-xl">
            <label className="label">
              <span className="label-text capitalize">
                Enter Github repository URL
              </span>
            </label>
            <input
              type="text"
              placeholder="https://github.com/username/repo-name"
              className="input input-bordered w-full"
              required
              onChange={(event) => setSearchInput(event.target.value)}
              value={searchInput}
            />
          </div>

          <button className="btn btn-primary" onClick={getRepoInfo}>
            Search
          </button>
          <button className="btn btn-neutral" onClick={clear}>
            clear
          </button>
        </div>

              
              {/* statistics */}
        {searchResult ? (
          <>
            {/* stats */}
            <div className="w-full flex justify-center my-5">
              <div className="stats shadow">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Issues</div>
                  <div className="stat-value">
                    {searchResult ? searchResult.length : null}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Open issues</div>
                  <div className="stat-value text-secondary">
                    {getOpenIssues(searchResult)}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Closed Issue</div>
                  <div className="stat-value">
                    {searchResult.length - getOpenIssues(searchResult)}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">New Issues vs Closed Issue</div>
                  <div className="stat-value">
                    {searchResult.length != getOpenIssues(searchResult)
                      ? getOpenIssues(searchResult) /
                        (searchResult.length - getOpenIssues(searchResult))
                      : "0"}
                  </div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title capitalize">
                    Issues raised in last 10 Weeks
                  </div>
                  <div className="stat-value">{lastTenWeekIssueCount}</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Average Weekly Clouser Rate</div>
                  <div className="stat-value">0</div>
                </div>
              </div>
            </div>

            {/* modal button */}
            <div className="w-full flex justify-center mt-10">
              <button
                className="btn btn-primary"
                onClick={() => window.my_modal_4.showModal()}
              >
                open issue list
              </button>
            </div>
            <dialog id="my_modal_4" className="modal">
              <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-3xl capitalize">Issue List</h3>
                <p className="py-1 capitalize">
                  details of all issues raised in repository
                </p>
                {searchResult.length > 0 ? (
                  <>
                    {" "}
                    <div className="overflow-x-auto">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Raised By</th>
                            <th>Creation date</th>
                            <th>status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResult ? (
                            <>
                              {" "}
                              {searchResult.map((currIssue, index) => {
                                {
                                  /* console.log(currIssue); */
                                }
                                return (
                                  <tr>
                                    <th>{index + 1}</th>
                                    <td>{currIssue.title}</td>
                                    <td>{currIssue.user.login}</td>
                                    <td>
                                      {currIssue.created_at
                                        .toLocaleString()
                                        .substr(0, 10)}
                                    </td>
                                    <td>
                                      {currIssue.state == "open" ? (
                                        <span className="px-5 py-1 rounded-full bg-blue-100 text-blue-500">
                                          open
                                        </span>
                                      ) : (
                                        <span className="px-5 py-1 rounded-full bg-green-100 text-green-500">
                                          close
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-center mt-5 font-semibold text-xl text-gray-600">
                      No Issues Raised
                    </p>
                  </>
                )}

                <div className="modal-action">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </div>
              </form>
            </dialog>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Home;
