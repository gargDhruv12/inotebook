import { useState } from "react";
import categoryContext from "./categoryContext";

const CategoryState = (props) => {
  const host = "https://inotebook-4v99.onrender.com"
  const initialCategories = []
  const [categories, setCategories] = useState(initialCategories)

  // Get all categories
  const getCategories = async () => {
    const response = await fetch(`${host}/api/categories/fetchallcategories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setCategories(json);
  }

  // Add a category
  const addCategory = async (name, color, icon) => {
    const response = await fetch(`${host}/api/categories/addcategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, color, icon })
    });
    const category = await response.json();
    setCategories(categories.concat(category));
    console.log("Adding a new category")
  }

  // Delete a category
  const deleteCategory = async (id) => {
    const response = await fetch(`${host}/api/categories/deletecategory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()

    const newCategories = categories.filter((category) => { return category._id !== id });
    setCategories(newCategories)
    console.log("deleting the category " + id)
  }

  // Edit a category
  const editCategory = async (id, name, color, icon) => {
    const response = await fetch(`${host}/api/categories/updatecategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ name, color, icon })
    });
    const json = await response.json()

    let newCategories = JSON.parse(JSON.stringify(categories));
    for (let index = 0; index < newCategories.length; index++) {
      const element = newCategories[index];
      if (element._id === id) {
        newCategories[index].name = name;
        newCategories[index].color = color;
        newCategories[index].icon = icon;
        break;
      }
    }
    setCategories(newCategories)
  }

  return (
    <categoryContext.Provider value={{ categories, addCategory, deleteCategory, editCategory, getCategories }}>
      {props.children}
    </categoryContext.Provider>
  )
}

export default CategoryState; 