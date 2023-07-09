import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";

//


//in react hooks : usecallback and useMemo is important in interview.

const Home = () => {
    // we use state to fetch data from backend path/api/foodData
    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://crazy-snaps-ray.cyclic.app/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0], response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);
    //empty dependency means call only first itme on page load
    //we want to render components after data fetching from db completes,
    //but in react components renders first then other block of codes executes
    //method 1: use if else, switch
    //m2: ternerary operator

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                {/* we have to move whole crousel here, in react child to parent can't transfer,  */}
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active carousal"  >
                            <img src="https://source.unsplash.com/random/900x400/?burger" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: 'fill' }} alt="..." />
                        </div>
                        <div className="carousel-item carousal">
                            <img src="https://source.unsplash.com/random/900x400/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: 'fill' }} alt="..." />
                        </div>
                        <div className="carousel-item carousal">
                            <img src="https://source.unsplash.com/random/900x400/?pasta" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "fill" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* we have to move whole crousel here, in react child to parent can't transfer,  */}

            </div>
            {/* we want to call card dynamically, make cards according to data in db */}
            <div className="container">
                {
                    //as react first render, we set data before render
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className="row mb-3">
                                    <div key={data.id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== [] ? (
                                        foodItem
                                            .filter(
                                                (item) => (item.CategoryName === data.CategoryName)
                                                    && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))

                                            )
                                            .map((filterItems) => {
                                                return (
                                                    <div key={filterItems._id} className="col 12 col-md-6 col-lg-3">
                                                        <Card foodItem={filterItems}
                                                            options={filterItems.options[0]}></Card>

                                                    </div>
                                                );
                                            })
                                    ) : (
                                        <div> NO such data found</div>
                                    )}
                                </div>
                            );
                        })
                        : ""
                }
                {/* <Card /> */}
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
