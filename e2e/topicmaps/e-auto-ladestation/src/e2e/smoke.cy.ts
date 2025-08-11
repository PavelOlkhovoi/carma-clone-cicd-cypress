describe("e-auto-ladestation smoke test", () => {
  beforeEach(() => {
    // Visit the page and wait for initial load
    cy.visit("/", { timeout: 120000 });
    
    // Wait for the map container to be ready
    cy.get("[data-test-id=zoom-control]", { timeout: 10000 })
      .should("exist")
      .then(() => {
        // Give a small delay for map to fully initialize
        cy.wait(2000);
      });
  });

  it("map loads with key controls", () => {
    // Check map controls are visible and interactive
    cy.get("[data-test-id=zoom-control]")
      .should("be.visible")
      .and("not.be.disabled");

    cy.get("[data-test-id=fuzzy-search]")
      .should("be.visible")
      .and("not.be.disabled");

    cy.get("#cmdShowModalApplicationMenu")
      .should("be.visible")
      .and("not.be.disabled");

    cy.get("[data-test-id=info-box]")
      .should("be.visible");
  });
});
