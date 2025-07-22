describe("geoportal smoke test", () => {
  beforeEach(() => cy.visit("/"));

  it("Map loads with key controls and buttons", () => {
    cy.get("[data-test-id=zoom-in-control]").should("be.visible");
  });
});
