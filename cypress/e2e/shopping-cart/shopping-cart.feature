Feature: Shopping cart

    Scenario: Add products to shopping cart
        Given The user is on the main store page
        When They navigate to product category: 'Deskorolka'
        And They click the first product in the category
        # Then The product page is displayed
        When They make note of the product name
        And They make note of the product price
        And They select the first available size
        And They add the product to the cart
        Then The cart page is displayed
        And The cart contains one product
        And The name of the product matches that of the selected product
        And The price of the product matches that of the selected product
