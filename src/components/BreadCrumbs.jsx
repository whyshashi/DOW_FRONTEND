import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../maincss/breadcrumbs.css";

const BreadCrumbs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const heading = searchParams.get("heading"); // Extract heading from search params
  const number = searchParams.get("number");

  const pathnames = location.pathname.split("/").filter((x) => x); // Splitting the path

  return (
    <div className="breadcrumbs" style={{ display: "flex", gap: "8px" }}>
      {pathnames.map((name, index) => {
        const breadcrumbPath = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Capitalize each word and remove hyphens
        const formattedName = name
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("  ");

        const capitalizedHeading = heading
          ? heading
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("  ")
          : "";

        return (
          <span key={breadcrumbPath}>
            {!isLast ? (
              <>
                <Link className="linked-word" to={breadcrumbPath}>
                  {formattedName}
                </Link>
                {" > "}
              </>
            ) : heading ? (
              <>
                {capitalizedHeading} {" > "} {formattedName}
              </>
            ) : number ? (
              formattedName + " : " + number
            ) : (
              formattedName
            )}
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
