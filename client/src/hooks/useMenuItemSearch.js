import CustomError from "../../../shared/CustomErrorClass";
import { useSearchParams } from "react-router-dom";
import { fetchMenuItemsByQuery } from "../utils/handlers/menuItemHandlers";
import { fetchCollection } from "../utils/handlers/handlers";
import { useState, useEffect } from "react";

function useMenuItemSearch(clickedAdd, updatedMenuItem) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [search, setSearch] = useState(q);
  const [fetchedMenuItems, setFetchedMenuItems] = useState([]);
  const [menuError, setMenuError] = useState(null);

  useEffect(() => {
    function searchParamSetting() {
      if (search !== "") {
        setSearchParams({ q: search });
      } else {
        setSearchParams({});
      }
    }
    async function fetchData() {
      try {
        if (q === "") {
          setFetchedMenuItems(
            await fetchCollection("menu-items", setMenuError)
          );
          return;
        }
        setFetchedMenuItems(await fetchMenuItemsByQuery(q, setMenuError));
      } catch (error) {
        console.error(
          new CustomError(
            error?.status || 500,
            error?.message || "Došlo je do pogreške."
          )
        );
      }
    }

    searchParamSetting();
    fetchData();
  }, [q, clickedAdd, updatedMenuItem]);

  return {
    setSearchParams,
    search,
    setSearch,
    fetchedMenuItems,
    setFetchedMenuItems,
    menuError,
  };
}

export default useMenuItemSearch;
