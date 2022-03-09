import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import ProductGrid from "../../wrappers/product/ProductGrid";
import SectionTitle from "../../components/section-title/SectionTitle";
import Categories from "../../components/categories";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* tab product */}
        {/* <TabProduct spaceBottomClass="pb-60" category="fashion" /> */}
        <div className="container">
          <SectionTitle
            titleText="Kategoriler"
            positionClass="text-center"
            spaceClass="mt-50"
          />
          <Categories />

          <SectionTitle
            titleText="En Son Eklenenler"
            positionClass="text-center"
            spaceClass="mb-50"
          />
          <div className="row">
            <ProductGrid type="new" limit={8} spaceBottomClass="mb-25" />
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
