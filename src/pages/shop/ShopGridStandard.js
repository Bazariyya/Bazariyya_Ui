import PropTypes from "prop-types";
import React, { Fragment, useState, useContext, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { LoadingContext } from "../../context/Loading";
import { getAllCategories, getProducts } from "../../services/product";
import { useFetch } from "../../hooks/use-fetch";

const ShopGridStandard = ({ location }) => {
  const [layout, setLayout] = useState("grid three-column");
  const [, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [mergeCat, setMergeCat] = useState([]);
  const [filterData, setFilterData] = useState({
    categoryId: 0,
    minPrice: 0,
    maxPrice: 0,
  });
  const { setLoading } = useContext(LoadingContext);

  const pageLimit = 9;
  const [allProducts] = useFetch(
    () =>
      getProducts({
        pageCount: pageLimit,
        pageIndex: currentPage - 1,
        categoryId: 0,
        ...filterData,
      }),
    {},
    {
      setLoading,
      reloadDeps: [currentPage, filterData],
      deps: [currentPage, filterData],
    }
  );

  const [allSubCategories] = useFetch(
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

  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterSortParams = (value) => {
    setSortType(value);
  };

  useEffect(() => {
    if (allSubCategories?.value) {
      setMergeCat([...allSubCategories?.value]);
    }
  }, [allSubCategories]);

  useEffect(() => {
    if (sortType) {
      if (sortType === "priceHighToLow") {
        const sort = [...allProducts?.value].sort((a, b) => a.price - b.price);
        setSortedData(sort);
      } else {
        const sort = [...allProducts?.value].sort((a, b) => b.price - a.price);
        setSortedData(sort);
      }
    } else {
      setSortedData(allProducts.value);
    }
  }, [sortType, allProducts]);

  const getFilterParams = (data) => {
    setFilterData(data);
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Shop Page</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Anasafya
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tüm Ürünler
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  categories={mergeCat}
                  sideSpaceClass="mr-30"
                  getFilterParams={(value) => getFilterParams(value)}
                  filterData={filterData}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={(e) => getFilterSortParams(e)}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={sortedData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={45}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ShopGridStandard);