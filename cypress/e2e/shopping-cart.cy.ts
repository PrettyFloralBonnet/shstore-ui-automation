import Catalog from "../support/models/catalog";
import MainPage from "../support/models/main-page";
import Navbar from "../support/models/navbar";
import BoardProductPage from "../support/models/product-pages/board-product-page";
import ProductPage from "../support/models/product-pages/product-page";
import ShoppingCart from "../support/models/order-flow/shopping-cart";

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

    it('should display the correct order total', () => {
        let firstProductPrice: string, secondProductPrice: string;

        navbar.getSection('Deskorolka').click();
        catalog.getProducts().first().click();

        const firstProductPage = new BoardProductPage();

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

        secondProductPage.getProductPrice().should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('second-added-product-price');
        });

        secondProductPage.getAddToCartButton().click();

        cy.url().should('contain', 'basketedit.php');

        cy.get<string>('@first-added-product-price').then((price) => {
            firstProductPrice = price;
        });

        cy.get<string>('@second-added-product-price').then((price) => {
            secondProductPrice = price;
        });

        shoppingCart.getOrderTotal().should('be.visible').invoke('text').then((total) => {
            const sum: number = parseFloat(firstProductPrice) + parseFloat(secondProductPrice);
            expect(sum).to.eq(parseFloat(total));
        });
    });
});
