import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../../context/Loading";
import { useFetch } from "../../hooks/use-fetch";
import { getAllCategories } from "../../services/product";

function Categories() {
  const { setLoading } = useContext(LoadingContext);
  const { push } = useHistory();

  const [allCategories] = useFetch(
    () =>
      getAllCategories({
        pageCount: 0,
        pageIndex: 0,
        id: 0,
        categoryId: 0,
        isSubCategoryes: true,
        code: "",
      }),
    {},
    {
      setLoading,
    }
  );

  return (
    <div
      className=" mt-5 mb-5 p-4"
      style={{ border: "1px solid black", borderRadius: "10px" }}
    >
      <div className="row">
        {allCategories?.value?.length > 0 &&
          allCategories?.value.map((category) => (
            <div
              className="col-xl-2 col-lg-2 col-sm-6 col-xs-12 p-3"
              key={category.id}
            >
              <button
                className="text-center d-flex flex-column justify-content-center align-items-center "
                style={{ background: "transparent", border: "none", width: "100%" }}
                onClick={() => push("/product-list")}
              >
                <img
                  width={156}
                  height={87}
                  alt="cat"
                  src={category.categoryImageUrl}
                />
                {category.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Categories;
