

describe("test form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/pizza")
    })
    it('fills out for', function(){
        cy.get('input[name="name"]').type("raneeem").should("have.value", "raneeem"),
        cy.get('#size').select("large").should("have.value", "large"),
        cy.get('#sauce').select("original"),
        cy.get('[type="checkbox"]').first().check(),
        cy.get('input[name="mushrooms"]').check(),
        cy.get('[type="checkbox"]').last().check();   
    })
    it('submit button works!', function(){
        cy.get("button").click;
    })
    
})