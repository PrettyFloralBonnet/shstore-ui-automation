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

    getItemsInCart(): ShoppingCartItem[] {
        this.getProductListElement().within(() => {
            cy.get('div.basket__block').filter('[data-product-id]').each((item) => {
                let itemName: string, itemPrice: string;
                cy.wrap(item).within(() => {
                    cy.get('a.product__link').invoke('text').then((name) => {
                        itemName = name;
                    });

                    cy.get('span.basket__price').invoke('text').then((price) => {
                        itemPrice = price;
                    });
                });
                this.items.push(new ShoppingCartItem(itemName, itemPrice));
            });
        });

        return this.items;
    }
}
