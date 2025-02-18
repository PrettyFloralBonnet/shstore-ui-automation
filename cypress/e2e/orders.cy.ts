import Catalog from "../support/models/catalog";
import MainPage from "../support/models/main-page";
import Navbar from "../support/models/navbar";
import ShoesProductPage from "../support/models/product-pages/shoes-product-page";
import ShoppingCart from "../support/models/order-flow/shopping-cart";
import CustomerDataPage from "../support/models/order-flow/customer-data-page";
import OrderForm from "../support/models/order-flow/order-form";
import OrderSummary from "../support/models/order-flow/order-summary";
import PickupSitesForm from "../support/models/order-flow/pickup-sites-form";

import { TEST_USER } from "../fixtures/users";

describe('Placing an order', () => {
    const mainPage = new MainPage();
    const navbar = new Navbar();
    const catalog = new Catalog();
    const shoppingCart = new ShoppingCart();
    const customerDataPage = new CustomerDataPage();
    const orderForm = new OrderForm();
    const orderSummary = new OrderSummary();
    const pickupSitesForm = new PickupSitesForm();

    beforeEach(() => {
        mainPage.visit();
    });

    it('should be possible as a guest', () => {
        navbar.getSection('Buty').click();
        catalog.getProducts().first().click();

        const productPage = new ShoesProductPage();

        productPage.getProductName().should('be.visible').invoke('text').then((name) => {
            cy.wrap(name).as('product-name');
        });

        productPage.getProductPrice().should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('product-price');
        });

        productPage.getSizeSelectionDropdownButton().click();
        productPage.getSizeSelectionDropdownMenu().should('be.visible');
        
        // click is forced because element is detected as having display: none (despite being visible)
        productPage.getAvailableSizes().contains('10 US').click({force: true});

        productPage.getAddToCartButton().click();

        cy.url().should('contain', 'basketedit.php');

        shoppingCart.getProductListElement().should('be.visible');
        shoppingCart.getContinueButton().click();

        cy.url().should('contain', 'operation=onceorder');

        customerDataPage.getOrderAsGuestButton().click();

        customerDataPage.getNewCustomerForm().should('be.visible');

        // fill new customer data

        customerDataPage.getFirstNameInput().type(TEST_USER.firstName);
        customerDataPage.getLastNameInput().type(TEST_USER.lastName);
        customerDataPage.getStreetNumberInput().type(TEST_USER.address.flatNumber);
        customerDataPage.getStreetInput().type(TEST_USER.address.street);
        customerDataPage.getZipCodeInput().type(TEST_USER.address.postalCode);
        customerDataPage.getCityInput().type(TEST_USER.address.city);
        customerDataPage.getPhoneNumberInput().type(TEST_USER.phoneNumber);
        customerDataPage.getEmailInput().type(TEST_USER.email);

        customerDataPage.getTOSCheckbox().check();
        customerDataPage.getEmailNewsletterCheckbox().uncheck();
        customerDataPage.getTextMessageNewsletterCheckbox().uncheck();

        customerDataPage.getContinueButton().click();

        orderForm.getPaymentOptionsSection().should('be.visible');
        orderForm.getOrderDeliverySection().should('be.visible');

        orderForm.getPaymentOnPickupOption().click();
        orderForm.getOnSitePickupOption().click();

        orderForm.getContinueButton().click();

        pickupSitesForm.getOnSitePickupSite().should('be.visible').click();
        pickupSitesForm.getContinueButton().click();

        orderSummary.getCustomerDataSummary()
            .should('be.visible')
            .and('contain.text', TEST_USER.firstName)
            .and('contain.text', TEST_USER.lastName)
            .and('contain.text', TEST_USER.address.street)
            .and('contain.text', TEST_USER.address.flatNumber)
            .and('contain.text', TEST_USER.address.postalCode)
            .and('contain.text', TEST_USER.address.city)
            .and('contain.text', TEST_USER.email)
            .and('contain.text', TEST_USER.phoneNumber);

            
        cy.get('@product-name').then((name) => {        
            orderSummary.getOrderedProductsElement()
                .should('be.visible')
                .and('contain.text', name);
        });

        cy.get('@product-price').then((price) => {        
            orderSummary.getOrderTotal()
                .should('be.visible')
                .and('contain.text', price);
        });
    });
})