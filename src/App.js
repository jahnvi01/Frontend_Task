import React, { useState, useEffect } from "react";
import List from "./components/table/List";
import Pagination from "./components/table/Pagination";
import "./App.css";
import { fetchList } from "./actions/api";
import { Filters } from "./components/table/Filters";
import Tabs from "./components/tabs/Tab";
import TabPane from "./components/tabs/TabPane";

const App = () => {
  const [list, setList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const results = await fetchList(`?search=${search}`);
      if (results.data) {
        setList(results.data);
      }
      setLoading(false);
    }
    fetchData();
  }, [search]);

  /* Fetching the data from the API and setting the state of the pageList. */
  useEffect(() => {
    async function fetchPaginationData() {
      const results = await fetchList(
        `?page=${currentPage}&limit=${listPerPage}${
          search && "&search=" + search
        }${sort && `&sortBy=name&order=${sort}`}`
      );
      if (results.data) {
        setPageList(results.data);
      }
    }
    fetchPaginationData();
  }, [currentPage, listPerPage, search, sort]);

  const handleSorting = (data) => {
    setCurrentPage(1);
    setSort(data);
  };

  const handleSearch = (data) => {
    setCurrentPage(1);
    setSearch(data);
  };

  /**
   * It sets the current page to the page number that is passed in.
   * @param pageNumber - The page number that the user clicked on.
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <div className="sub-container">
        <Tabs>
          <TabPane name="Tab 1" key="1">
            <Filters search={search} setSearch={handleSearch} />
            <List
              sort={sort}
              setSort={handleSorting}
              list={pageList}
              loading={loading}
            />
            <Pagination
              loading={loading}
              listPerPage={listPerPage}
              totalList={list.length}
              paginate={paginate}
            />
          </TabPane>
          <TabPane name="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane name="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
