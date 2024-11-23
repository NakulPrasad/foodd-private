import { useEffect, useState } from "react";
import Card from "../components/FoodCard/Card";
import URLs from "../configs/URLs";
import useFetchData from "../hooks/useFetchData";
import Burger from "../assets/images/burger.jpg";
import Pizza from "../assets/images/pizza.jpg";
import Pasta from "../assets/images/pasta.jpg";

// Represents a single option in the "options" array
interface FoodOption {
  _id: string;
}

// Represents a single food item
interface FoodItem {
  _id: string;
  CategoryName: string;
  name: string;
  img: string;
  options: FoodOption[];
  description: string;
  __v: number;
}

// Represents the entire API response
interface FoodItemResponse {
  data: FoodItem[];
}

interface FoodCategory {
  _id: string;
  CategoryName: string;
  __v: number;
}
interface FoodCategoryResponse {
  data: FoodCategory[];
}

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  const [foodItem, setFoodItem] = useState<FoodItem[]>([]);
  const [foodItemResponse, isFoodItemLoading] = useFetchData<FoodItemResponse>(
    URLs.getFoodData
  );
  const [foodCategoryResponse, isFoodCategoryLoading] =
    useFetchData<FoodCategoryResponse>(URLs.getAllFoodCategory);
  const loadData = async () => {
    // console.log(isFoodItemLoading);
    if (
      !isFoodItemLoading &&
      !isFoodCategoryLoading &&
      foodItemResponse &&
      foodCategoryResponse
    ) {
      console.log(foodItemResponse);
      console.log(foodCategoryResponse);

      setFoodItem(foodItemResponse.data);
      setFoodCategory(foodCategoryResponse.data);
    }
  };

  useEffect(() => {
    loadData();
    if (!isFoodItemLoading) {
      // console.log(foodItemResponse);
    }
  }, [
    foodItemResponse,
    isFoodItemLoading,
    foodCategoryResponse,
    isFoodCategoryLoading,
  ]);

  return (
    <div className="row-span-4">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="carousel-item active carousal">
            <img
              src={Burger}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit: "fill" }}
              alt="..."
            />
          </div>
          <div className="carousel-item carousal">
            <img
              src={Pizza}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit: "fill" }}
              alt="..."
            />
          </div>
          <div className="carousel-item carousal">
            <img
              src={Pasta}
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit: "fill" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCategory &&
          foodCategory.map((data: FoodCategory, index) => {
            return (
              <div className="row mb-3" key={index}>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem &&
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems: FoodItem) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col 12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
