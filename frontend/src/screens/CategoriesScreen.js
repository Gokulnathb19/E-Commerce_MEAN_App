import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../actions/productActions';
function CategoriesScreen(props) {
  const categoryRef = useRef(null);
  const isSideNavOpened = props.isSideNavOpened;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories(''));

    return () => {
      //
    };
  }, [dispatch]);

  useEffect( () => {
    window.onclick =  (event) => {
        if(isSideNavOpened && !categoryRef.current.contains(event.target))
          props.closeMenu();
    }
  }, [isSideNavOpened]);
    const categoriesList = useSelector((state) => state.categoryList);
    const { categories } = categoriesList;

  return (
    <aside className={`sidebar ${isSideNavOpened ? " open" : ""}`} ref={categoryRef}>
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={props.closeMenu}>
            x
        </button>
        <ul className="categories">
          {
              categories.map( (category, idx) => {
                return (
                    <li key={idx}>
                        <Link to={category === "All" ? "/" : `/category/${category}`} onClick={props.closeMenu}>{category}</Link>
                    </li>
                )
              })
          }
        </ul>
    </aside>
  )
}

export default CategoriesScreen;