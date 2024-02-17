describe("TODO APP TESTING...", () => {
  it("View Todo App", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "**/activity-groups**").as("viewPage");
  });

  it("Add Activity", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy=form-input-add]").type("Sample Test", { force: true });
    cy.get("[data-cy=add-btn]").click({ force: true });
    cy.intercept("POST", "**/activity-groups").as("addActivity");
  });

  it("Cek Done Activity", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "**/activity-groups**").as("viewPage");
    cy.get("[data-cy=checkbox-btn]").eq(0).check({ force: true });
  });

  it("Edit Activity", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "**/activity-groups**").as("viewPage");
    cy.get("[data-cy=btn-edit]").eq(0).click({ force: true });
    cy.get("[data-cy=form-input-edit]")
      .clear({ force: true })
      .type("Sample Edit", { force: true });
    cy.intercept("PATCH", "**/activity-groups/*").as("editActivity");
  });

  it("Delete Activity", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "**/activity-groups**").as("viewPage");
    cy.get("[data-cy=btn-delete]").eq(0).click({ force: true });
    cy.get("[data-cy=submit-delete]").click({ force: true });
    cy.intercept("DELETE", "**/activity-groups/*").as("deleteActivity");
  });

  it("Search Activity", () => {
    cy.visit("http://localhost:5173/");
    cy.intercept("GET", "**/activity-groups**").as("viewPage");
    cy.get("[data-cy=input-search]").type("Sample", { force: true });
  });
});
