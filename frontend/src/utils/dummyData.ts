import { ICoupon } from "../components/CouponCard/CouponCard"

export const foodItems = [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "description": "Classic pizza with mozzarella cheese, fresh basil, and tomato sauce.",
      "price": 299.0,
      "category": "Pizza",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.5,
      "is_veg": true,
      "options": [
        {
          "name": "Size",
          "type": "select",
          "values": ["Small", "Medium", "Large"]
        },
        {
          "name": "Crust",
          "type": "select",
          "values": ["Thin", "Regular", "Cheese Stuffed"]
        },
        {
          "name": "Extra Toppings",
          "type": "checkbox",
          "values": ["Olives", "Mushrooms", "Onions", "Peppers"]
        }
      ]
    },
    {
      "id": 2,
      "name": "Veg Burger",
      "description": "Delicious veggie patty with lettuce, tomato, and a soft bun.",
      "price": 149.0,
      "category": "Burger",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.2,
      "is_veg": true,
      "options": []
    },
    {
      "id": 3,
      "name": "Chicken Wings",
      "description": "Spicy and crispy chicken wings served with a dipping sauce.",
      "price": 249.0,
      "category": "Starter",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.7,
      "is_veg": false,
      "options": []
    },
    {
      "id": 4,
      "name": "Pepperoni Pizza",
      "description": "A pizza topped with pepperoni slices and mozzarella cheese.",
      "price": 349.0,
      "category": "Pizza",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.6,
      "is_veg": false,
      "options": [
        {
          "name": "Size",
          "type": "select",
          "values": ["Small", "Medium", "Large"]
        },
        {
          "name": "Crust",
          "type": "select",
          "values": ["Thin", "Regular", "Cheese Stuffed"]
        }
      ]
    },
    {
      "id": 5,
      "name": "Pasta Alfredo",
      "description": "Creamy Alfredo sauce with penne pasta, served hot.",
      "price": 199.0,
      "category": "Pasta",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.3,
      "is_veg": true,
      "options": []
    },
    {
      "id": 6,
      "name": "Cheese Burger",
      "description": "Juicy beef patty with melted cheese, lettuce, tomato, and a soft bun.",
      "price": 189.0,
      "category": "Burger",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.4,
      "is_veg": false,
      "options": []
    },
    {
      "id": 7,
      "name": "Garlic Bread",
      "description": "Soft bread topped with garlic butter and herbs.",
      "price": 99.0,
      "category": "Side",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.1,
      "is_veg": true,
      "options": []
    },
    {
      "id": 8,
      "name": "Caesar Salad",
      "description": "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.",
      "price": 159.0,
      "category": "Salad",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.5,
      "is_veg": true,
      "options": []
    },
    {
      "id": 9,
      "name": "BBQ Chicken Pizza",
      "description": "Pizza with BBQ sauce, grilled chicken, red onions, and mozzarella.",
      "price": 399.0,
      "category": "Pizza",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.8,
      "is_veg": false,
      "options": [
        {
          "name": "Size",
          "type": "select",
          "values": ["Small", "Medium", "Large"]
        },
        {
          "name": "Crust",
          "type": "select",
          "values": ["Thin", "Regular", "Cheese Stuffed"]
        }
      ]
    },
    {
      "id": 10,
      "name": "Chocolate Lava Cake",
      "description": "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
      "price": 199.0,
      "category": "Dessert",
      "image_url": "https://via.placeholder.com/150",
      "rating": 4.9,
      "is_veg": true,
      "options": []
    }
  ]

export const foodItems_category = [
  {
    "category": "Pizza",
    "items": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with mozzarella cheese, fresh basil, and tomato sauce.",
        "price": 299,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.5,
        "is_veg": true,
        "options": [
          {
            "name": "Size",
            "type": "select",
            "values": [
              { "label": "Small", "price": 0 },
              { "label": "Medium", "price": 399 },
              { "label": "Large", "price": 499 }
            ]
          },
          {
            "name": "Crust",
            "type": "select",
            "values": [
              { "label": "Thin", "price": 0 },
              { "label": "Regular", "price": 50 },
              { "label": "Cheese Stuffed", "price": 100 }
            ]
          },
          {
            "name": "Extra Toppings",
            "type": "checkbox",
            "values": [
              { "label": "Olives", "price": 30 },
              { "label": "Mushrooms", "price": 40 },
              { "label": "Onions", "price": 20 },
              { "label": "Peppers", "price": 25 }
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "Pepperoni Pizza",
        "description": "A pizza topped with pepperoni slices and mozzarella cheese.",
        "price": 349,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.6,
        "is_veg": false,
        "options": [
          {
            "name": "Size",
            "type": "select",
            "values": [
              { "label": "Small", "price": 349 },
              { "label": "Medium", "price": 449 },
              { "label": "Large", "price": 549 }
            ]
          },
          {
            "name": "Crust",
            "type": "select",
            "values": [
              { "label": "Thin", "price": 0 },
              { "label": "Regular", "price": 50 },
              { "label": "Cheese Stuffed", "price": 100 }
            ]
          }
        ]
      },
      {
        "id": 9,
        "name": "BBQ Chicken Pizza",
        "description": "Pizza with BBQ sauce, grilled chicken, red onions, and mozzarella.",
        "price": 399,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.8,
        "is_veg": false,
        "options": [
          {
            "name": "Size",
            "type": "select",
            "values": [
              { "label": "Small", "price": 399 },
              { "label": "Medium", "price": 499 },
              { "label": "Large", "price": 599 }
            ]
          },
          {
            "name": "Crust",
            "type": "select",
            "values": [
              { "label": "Thin", "price": 0 },
              { "label": "Regular", "price": 50 },
              { "label": "Cheese Stuffed", "price": 100 }
            ]
          }
        ]
      }
    ]
  },
  {
    "category": "Burger",
    "items": [
      {
        "id": 2,
        "name": "Veg Burger",
        "description": "Delicious veggie patty with lettuce, tomato, and a soft bun.",
        "price": 149,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.2,
        "is_veg": true,
        "options": []
      },
      {
        "id": 6,
        "name": "Cheese Burger",
        "description": "Juicy beef patty with melted cheese, lettuce, tomato, and a soft bun.",
        "price": 189,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.4,
        "is_veg": false,
        "options": []
      }
    ]
  },
  {
    "category": "Starter",
    "items": [
      {
        "id": 3,
        "name": "Chicken Wings",
        "description": "Spicy and crispy chicken wings served with a dipping sauce.",
        "price": 249,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.7,
        "is_veg": false,
        "options": []
      }
    ]
  },
  {
    "category": "Pasta",
    "items": [
      {
        "id": 5,
        "name": "Pasta Alfredo",
        "description": "Creamy Alfredo sauce with penne pasta, served hot.",
        "price": 199,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.3,
        "is_veg": true,
        "options": []
      }
    ]
  },
  {
    "category": "Side",
    "items": [
      {
        "id": 7,
        "name": "Garlic Bread",
        "description": "Soft bread topped with garlic butter and herbs.",
        "price": 99,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.1,
        "is_veg": true,
        "options": []
      }
    ]
  },
  {
    "category": "Salad",
    "items": [
      {
        "id": 8,
        "name": "Caesar Salad",
        "description": "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.",
        "price": 159,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.5,
        "is_veg": true,
        "options": []
      }
    ]
  },
  {
    "category": "Dessert",
    "items": [
      {
        "id": 10,
        "name": "Chocolate Lava Cake",
        "description": "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
        "price": 199,
        "image_url": "https://via.placeholder.com/150",
        "rating": 4.9,
        "is_veg": true,
        "options": []
      }
    ]
  }
]


export const coupons :ICoupon[] = [
    {
      "id": "COUPON1",
      "title": "Flat 20% Off",
      "description": "Get a flat 20% discount on your order above ₹300.",
      "discount_type": "percentage",
      "discount_value": 20,
      "max_discount": 100,
      "min_order_value": 300,
      "validity": {
        "start_date": "2024-12-01",
        "end_date": "2024-12-31"
      },
      "applicable_on": ["food", "drinks"],
      "usage_limit_per_user": 1
    },
    {
      "id": "COUPON2",
      "title": "₹100 Off",
      "description": "Get ₹100 off on your first order above ₹500.",
      "discount_type": "flat",
      "discount_value": 100,
      "max_discount": null,
      "min_order_value": 500,
      "validity": {
        "start_date": "2024-12-01",
        "end_date": "2025-01-15"
      },
      "applicable_on": ["food", "desserts"],
      "usage_limit_per_user": 1,
      "is_new_user_only": true
    },
    {
      "id": "COUPON3",
      "title": "Free Delivery",
      "description": "Enjoy free delivery on orders above ₹200.",
      "discount_type": "delivery",
      "discount_value": null,
      "max_discount": null,
      "min_order_value": 200,
      "validity": {
        "start_date": "2024-12-01",
        "end_date": "2024-12-31"
      },
      "applicable_on": ["all"],
      "usage_limit_per_user": 5
    },
    {
      "id": "COUPON4",
      "title": "Buy 1 Get 1 Free",
      "description": "Buy 1 main course and get 1 free.",
      "discount_type": "bogo",
      "discount_value": null,
      "max_discount": null,
      "min_order_value": null,
      "validity": {
        "start_date": "2024-12-01",
        "end_date": "2025-01-31"
      },
      "applicable_on": ["food"],
      "usage_limit_per_user": 3
    },
    {
      "id": "COUPON5",
      "title": "Weekend Special",
      "description": "Extra ₹50 off on orders above ₹400 during weekends.",
      "discount_type": "flat",
      "discount_value": 50,
      "max_discount": null,
      "min_order_value": 400,
      "validity": {
        "start_date": "2024-12-01",
        "end_date": "2025-01-31"
      },
      "applicable_on": ["all"],
      "usage_limit_per_user": 2,
      "days_of_week": ["Saturday", "Sunday"]
    }
  ]
  
  