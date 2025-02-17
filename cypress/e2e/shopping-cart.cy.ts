describe('Shopping cart', () => {
    it('should display names and prices of added items', () => {
        cy.visit('/');

        // navigate to category: Boards
        cy.get('a.nav-link').contains('Deskorolka').click();

        // click on the first product in the category
        cy.get('div.product').first().click();

        // make note of first product name
        cy.get('#projector_productname')
            .find('h1.product_name__name')
            .should('be.visible')
            .invoke('text')
            .then((name) => {
                cy.wrap(name).as('first-added-product-name');
            });

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

        // make note of second product name
        cy.get('#projector_productname')
            .find('h1.product_name__name')
            .should('be.visible')
            .invoke('text')
            .then((name) => {
                cy.wrap(name).as('second-added-product-name');
            });

        // make note of second product price
        cy.get('#projector_price_value').should('be.visible').invoke('text').then((price) => {
            cy.wrap(price).as('second-added-product-price');
        });

        // add the product to cart
        cy.get('#projector_button_basket').click();

        cy.url().should('contain', 'basketedit.php');

        cy.get('div.basket__productslist').should('be.visible').within(() => {
            cy.get('div.basket__block').filter('[data-product-id]').should('have.length', 2).each((product) => {
                cy.wrap(product).should('be.visible');
            });

            cy.get('div.basket__block').filter('[data-product-id]').eq(0).within(() => {
                cy.get('a.product__link').invoke('text').then((name) => {
                    cy.get('@first-added-product-name').should('eq', name);
                });

                cy.get('span.basket__price').invoke('text').then((price) => {
                    cy.get('@first-added-product-price').should('eq', price);
                });
            });

            cy.get('div.basket__block').filter('[data-product-id]').eq(1).within(() => {
                cy.get('a.product__link').invoke('text').then((name) => {
                    cy.get('@second-added-product-name').should('eq', name);
                });

                cy.get('span.basket__price').invoke('text').then((price) => {
                    cy.get('@second-added-product-price').should('eq', price);
                });
            });
        });
    });
});
