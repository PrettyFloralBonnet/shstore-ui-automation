import Catalog from "../support/models/catalog";
import MainPage from "../support/models/main-page";
import Navbar from "../support/models/navbar";
import BoardProductPage from "../support/models/product-pages/board-product-page";
import ProductPage from "../support/models/product-pages/product-page";
import ShoppingCart from "../support/models/shopping-cart";

describe('Shopping cart', () => {
    const mainPage = new MainPage();
    const navbar = new Navbar();
    const catalog = new Catalog();
    const shoppingCart = new ShoppingCart();

    beforeEach(() => {
        mainPage.visit();
    });

    it('should display names and prices of added items', () => {
        navbar.getSection('Deskorolka').click();
        catalog.getProducts().first().click();

        const firstProductPage = new BoardProductPage();

        firstProductPage.getProductName().should('be.visible').invoke('text').then((name) => {
            cy.wrap(name).as('first-added-product-name');
        });

        firstProductPage.getProductPrice().should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('first-added-product-price');
        });

        firstProductPage.getAvailableSizes().first().click();

        firstProductPage.getAddToCartButton().click();

        // click is forced because after the cart is visited, for some
        // reason Cypress sees the navbar element as having display: none
        navbar.getSection('Akcesoria').click({force: true});

        catalog.getProducts().first().click();

        const secondProductPage = new ProductPage();

        secondProductPage.getProductName().should('be.visible').invoke('text').then((name) => {
            cy.wrap(name).as('second-added-product-name');
        });

        secondProductPage.getProductPrice().should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('second-added-product-price');
        });

        secondProductPage.getAddToCartButton().click();

        cy.url().should('contain', 'basketedit.php');

        shoppingCart.getProductListElement().should('be.visible');
        shoppingCart.getItemRowElements().should('have.length', 2).each((row) => {
            cy.wrap(row).should('be.visible');
        });

        cy.get('@first-added-product-name').then((firstProductName) => {
            cy.get('@first-added-product-price').then((firstProductPrice) => {
                cy.get('@second-added-product-name').then((secondProductName) => {
                    cy.get('@second-added-product-price').then((secondProductPrice) => {
                        shoppingCart.getItemsInCart().then((items) => {
                            expect(firstProductName).to.eq(items[0].name);
                            expect(firstProductPrice).to.eq(items[0].price);
                            expect(secondProductName).to.eq(items[1].name);
                            expect(secondProductPrice).to.eq(items[1].price);
                        })
                    });
                });
            });
        });
    });

    it('should display order total', () => {
        let firstProductPrice: string, secondProductPrice: string;

        cy.visit('/');

        // navigate to category: Boards
        cy.get('a.nav-link').contains('Deskorolka').click();

        // click on the first product in the category
        cy.get('div.product').first().click();

        // make note of first product price
        cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('first-added-product-price');
        });

        // select first available size
        cy.get('#projector_sizes_cont').find('a.projector_sizes__item').first().click();

        // add the product to cart
        cy.get('#projector_button_basket').click();

        // navigate to category: Accessories
        cy.get('a.nav-link').contains('Akcesoria').click({force: true});

        // click on the first product in the category
        cy.get('div.product').first().click();

        // make note of second product price
        cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('second-added-product-price');
        });

        // add the product to cart
        cy.get('#projector_button_basket').click();

        cy.url().should('contain', 'basketedit.php');

        // verify if the total matches the sum of the two prices
        cy.get<string>('@first-added-product-price').then((price) => {
            firstProductPrice = price;
        });

        cy.get<string>('@second-added-product-price').then((price) => {
            secondProductPrice = price;
        });

        cy.get('div.basketedit_total_summary')
            .should('be.visible')
            .find('strong')
            .invoke('text')
            .then((total) => {
                const sum: number = parseFloat(firstProductPrice) + parseFloat(secondProductPrice);
                expect(sum).to.eq(parseFloat(total));
            });
    });
});
