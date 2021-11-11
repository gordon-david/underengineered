import { useState } from "react";
import { Taxonomy } from "../lib/PostService.types"
import Link from "next/link"

export default function Sidebar({show, taxonomy, toggleClose}:{ toggleClose: Function, show:boolean, taxonomy: Taxonomy}): JSX.Element{
  const [accordionData, setAccordionData] = useState({});

  const categoryListing = (categoryData) => {
    if (!(categoryData.name in accordionData)) {
      setAccordionData({ ...accordionData, [categoryData.name]: false });
    }
    return (
      <div className={`dropdown ${accordionData[categoryData.name] ? "active" : ""}`}>
        <div
          className="sidebar-listing head"
          onClick={() => toggleAccordion(categoryData.name)}
        >
          {accordionData[categoryData.name] ? (
            <i className="far fa-folder-open" />
          ) : (
            <i className="far fa-folder" />
          )}
          <span>{categoryData.name}</span>
        </div>
        <div
          className={`dropdown-children ${
            accordionData[categoryData.name] ? "active" : ""
          }`}
        >
          {
            categoryData.children.map(e => {
              if(e.type === "post"){
                return pageListing(e)
              }
              if(e.type === "category"){
                return categoryListing(e)
              }
              return null
            }).filter(e => e !== null)
          }
        </div>
      </div>
    );
  };

  const pageListing = (pageData) => (
    <div className="sidebar-listing">
      <i className="far fa-file-alt" />
      <Link href={`/posts/${pageData.slug}`}>
        <a>{pageData.title}</a>
      </Link>
    </div>
  );

  const buildSidebar = () => {
    return taxonomy.categoryTree.root.children.map(e => {
      if(e.type === "category"){
        return categoryListing(e)
      }
      if(e.type === "post"){
        return pageListing(e)
      }
      return null
    }).filter(e => e !== null)
  }

  const toggleAccordion = (key) => {
    setAccordionData({ ...accordionData, [key]: !accordionData[key] });
  };

  return     <div className={`sidebar ${show?'show':''}`}>
    <button className='sidebar-close sidebar-listing' onClick={() => toggleClose()} >
      Close
    </button>
  {buildSidebar()}
</div>
}