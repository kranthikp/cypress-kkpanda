
describe("SAMPLE DEMO API TESTING Using Cypress", function () {
    it("GET API testing Using Cypress API Plugin", () => {

        cy.api("GET", "https://reqres.in/api/users?page=2").should((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("POST API testing Using Cypress API Plugin", () => {
        cy.api("POST", "https://reqres.in/api/users", {
            name: "Kranthi Panda",
            job: "RatnaAutomationLabs",
        }).should((response) => {
            expect(response.status).to.eq(201);
        });
    });

    it("PUT API testing Using Flip Plugin", () => {
        cy.api("PUT", "https://reqres.in/api/users/2", {
            name: "RatnaAutomationLabs",
            job: "QA Automation Engg",
        }).should((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("DELETE API testing Using Cypress API Plugin", () => {
        cy.api("DELETE", "https://reqres.in/api/users/2").should((response) => {
            expect(response.status).to.eq(204);
        });
    });
});
