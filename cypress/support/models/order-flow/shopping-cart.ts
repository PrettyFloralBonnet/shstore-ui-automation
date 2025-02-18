class ShoppingCartItem {
    name: string;
    price: string;

    constructor(name: string, price: string) {
        this.name = name;
        this.price = price;
    }
}

export default class ShoppingCart {
    private items: ShoppingCartItem[] = [];

    getProductListElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.basket__productslist');
    }

    getItemRowElements(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.basket__block').filter('[data-product-id]');
    }

    async getItemsInCart(): Promise<ShoppingCartItem[]> {
        this.getItemRowElements().each((row) => {
            let itemName: string, itemPrice: string;

            cy.wrap(row).within(() => {
                cy.get('a.product__link').invoke('text').then((name) => {
                    itemName = name;
                });

                cy.get('span.basket__price').invoke('text').then((price) => {
                    itemPrice = price;
                });
            }).then(() => {
                this.items.push(new ShoppingCartItem(itemName, itemPrice));
            });
        });
        return this.items;
    }

    getOrderTotal(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('div.basketedit_total_summary').find('strong');
    }

    getContinueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('#basket_go_next');
    }
}
