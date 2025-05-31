import CustomError from "../../../shared/CustomErrorClass";
import { useSearchParams } from "react-router-dom";
import { fetchMenuItemsByQuery } from "../utils/handlers/menuItemHandlers";
import { fetchCollection } from "../utils/handlers/handlers";
import { debounce } from "lodash";
import { useState, useEffect, useMemo } from "react";

function useMenuItemSearch(clickedAdd, updatedMenuItem) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [search, setSearch] = useState(q);
  const [fetchedMenuItems, setFetchedMenuItems] = useState([]);
  const [menuError, setMenuError] = useState(null);

  const debouncedSetSearchParams = useMemo(
    () =>
      debounce((newSearch) => {
        if (newSearch !== "") {
          setSearchParams({ q: newSearch });
        } else {
          setSearchParams({});
        }
      }, 300),
    [setSearchParams]
  );

  useEffect(() => {
    debouncedSetSearchParams(search);
  }, [search, debouncedSetSearchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (q === "") {
          setFetchedMenuItems(
            await fetchCollection("menu-items", setMenuError)
          );
        } else {
          setFetchedMenuItems(await fetchMenuItemsByQuery(q, setMenuError));
        }
      } catch (error) {
        console.error(
          new CustomError(
            error?.status || 500,
            error?.message || "Došlo je do pogreške."
          )
        );
      }
    }

    fetchData();
  }, [q, clickedAdd, updatedMenuItem]);

  useEffect(() => {
    return () => {
      debouncedSetSearchParams.cancel();
    };
  }, [debouncedSetSearchParams]);

  return {
    search,
    setSearch,
    fetchedMenuItems,
    setFetchedMenuItems,
    menuError,
  };
}

export default useMenuItemSearch;
