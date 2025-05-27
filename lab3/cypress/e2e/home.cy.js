describe("Home Page & Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows list of books", () => {
    cy.get("article").should("have.length.at.least", 1);
  });

  it("filters books by title", () => {
    cy.get("input[placeholder='Search by title']").type("Eragon");
    cy.get("article").should("contain", "Eragon");
  });

  it("filters books by genre", () => {
    cy.get("select").select("fantasy");
    cy.get("article").each(($el) => {
      cy.wrap($el).should("contain.text", "fantasy");
    });
  });
});
