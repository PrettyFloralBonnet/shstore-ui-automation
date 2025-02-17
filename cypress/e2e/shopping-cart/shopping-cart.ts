import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('They navigate to product category: {string}', (category: string) => {
    cy.get('a.nav-link').contains(category).click({force: true});
});

When('They click the first product in the category', () => {
    cy.get('div.product').first().click();
});

When('They make note of the product name', () => {
    cy.get('#projector_productname')
        .find('h1.product_name__name')
        .should('be.visible')
        .invoke('text')
        .then((name) => {
            cy.wrap(name).as('first-added-product-name');
        });
});

When('They make note of the product price', () => {
    cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
        cy.wrap(price).as('first-added-product-price');
    });
});

When('They select the first available size', () => {
    cy.get('#projector_sizes_cont').find('a.projector_sizes__item').first().click();
});

When('They add the product to the cart', () => {
    cy.get('#projector_button_basket').click();
});

Then('The cart page is displayed', () => {
    cy.url().should('contain', 'basketedit.php');
});

Then('The cart contains one product', () => {
    cy.get('div.basket__productslist').should('be.visible').within(() => {
        cy.get('div.basket__block').filter('[data-product-id]').should('have.length', 1).each((product) => {
            cy.wrap(product).should('be.visible');
        });
    });
});

Then('The name of the product matches that of the selected product', () => {
    cy.get('div.basket__block').filter('[data-product-id]').eq(0).within(() => {
        cy.get('a.product__link').invoke('text').then((name) => {
            cy.get('@first-added-product-name').should('eq', name);
        });
    });
});

Then('The price of the product matches that of the selected product', () => {
    cy.get('div.basket__block').filter('[data-product-id]').eq(0).within(() => {
        cy.get('span.basket__price').invoke('text').then((price) => {
            cy.get('@first-added-product-price').should('eq', price);
        });
    });
});

// describe('Shopping cart', () => {
//     it('should display names and prices of added items', () => {
//         cy.visit('/');

//         // navigate to category: Boards
//         cy.get('a.nav-link').contains('Deskorolka').click();

//         // click on the first product in the category
//         cy.get('div.product').first().click();

//         // make note of first product name
//         cy.get('#projector_productname')
//             .find('h1.product_name__name')
//             .should('be.visible')
//             .invoke('text')
//             .then((name) => {
//                 cy.wrap(name).as('first-added-product-name');
//             });

//         // make note of first product price
//         cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
//             cy.wrap(price).as('first-added-product-price');
//         });

//         // select first available size
//         cy.get('#projector_sizes_cont').find('a.projector_sizes__item').first().click();

//         // add the product to cart
//         cy.get('#projector_button_basket').click();

//         // navigate to category: Accessories
//         cy.get('a.nav-link').contains('Akcesoria').click({force: true});

//         // click on the first product in the category
//         cy.get('div.product').first().click();

//         // make note of second product name
//         cy.get('#projector_productname')
//             .find('h1.product_name__name')
//             .should('be.visible')
//             .invoke('text')
//             .then((name) => {
//                 cy.wrap(name).as('second-added-product-name');
//             });

//         // make note of second product price
//         cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
//             cy.wrap(price).as('second-added-product-price');
//         });

//         // add the product to cart
//         cy.get('#projector_button_basket').click();

//         cy.url().should('contain', 'basketedit.php');

//         cy.get('div.basket__productslist').should('be.visible').within(() => {
//             cy.get('div.basket__block').filter('[data-product-id]').should('have.length', 2).each((product) => {
//                 cy.wrap(product).should('be.visible');
//             });

//             cy.get('div.basket__block').filter('[data-product-id]').eq(0).within(() => {
//                 cy.get('a.product__link').invoke('text').then((name) => {
//                     cy.get('@first-added-product-name').should('eq', name);
//                 });

//                 cy.get('span.basket__price').invoke('text').then((price) => {
//                     cy.get('@first-added-product-price').should('eq', price);
//                 });
//             });

//             cy.get('div.basket__block').filter('[data-product-id]').eq(1).within(() => {
//                 cy.get('a.product__link').invoke('text').then((name) => {
//                     cy.get('@second-added-product-name').should('eq', name);
//                 });

//                 cy.get('span.basket__price').invoke('text').then((price) => {
//                     cy.get('@second-added-product-price').should('eq', price);
//                 });
//             });
//         });
//     });

//     it('should display order total', () => {
//         let firstProductPrice: string, secondProductPrice: string;

//         cy.visit('/');

//         // navigate to category: Boards
//         cy.get('a.nav-link').contains('Deskorolka').click();

//         // click on the first product in the category
//         cy.get('div.product').first().click();

//         // make note of first product price
//         cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
//             cy.wrap(price).as('first-added-product-price');
//         });

//         // select first available size
//         cy.get('#projector_sizes_cont').find('a.projector_sizes__item').first().click();

//         // add the product to cart
//         cy.get('#projector_button_basket').click();

//         // navigate to category: Accessories
//         cy.get('a.nav-link').contains('Akcesoria').click({force: true});

//         // click on the first product in the category
//         cy.get('div.product').first().click();

//         // make note of second product price
//         cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
//             cy.wrap(price).as('second-added-product-price');
//         });

//         // add the product to cart
//         cy.get('#projector_button_basket').click();

//         cy.url().should('contain', 'basketedit.php');

//         // verify if the total matches the sum of the two prices
//         cy.get<string>('@first-added-product-price').then((price) => {
//             firstProductPrice = price;
//         });

//         cy.get<string>('@second-added-product-price').then((price) => {
//             secondProductPrice = price;
//         });

//         cy.get('div.basketedit_total_summary')
//             .should('be.visible')
//             .find('strong')
//             .invoke('text')
//             .then((total) => {
//                 const sum: number = parseFloat(firstProductPrice) + parseFloat(secondProductPrice);
//                 expect(sum).to.eq(parseFloat(total));
//             });
//     });
// });
