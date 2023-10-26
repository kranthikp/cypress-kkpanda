const apiBaseUrl = Cypress.env("API_BASE_URL");

describe("API Test Suite 1", () => {
    // hooks
    before(() => {
        cy.log("beforeAll")

        cy.log('token generation')
        cy.log('test data loaded using fixtures')
    });
    after(() => {
        cy.log("afterAll")
    });
    beforeEach(() => {
        cy.api("GET", `${apiBaseUrl}/`).its("status").should("eq", 200);
    });
    afterEach(() => {
        cy.log("afterEach New Test")
    });

    it("Get User Information", () => {
        cy.api("GET", `${apiBaseUrl}/api/users?page=2`)
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).to.not.empty;
            })
    });

    it("Create a User", () => {
        cy.api("POST", `${apiBaseUrl}/api/users`, {
            name: "Kranthi Panda",
            job: "RatnaAutomationLabs",
        }).should((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("Update a user", () => {
        cy.api("PUT", `${apiBaseUrl}/api/users/2`, {
            name: "RatnaAutomationLabs",
            job: "QA Automation Engg",
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('RatnaAutomationLabs');
            expect(response.body.job).to.eq('QA Automation Engg');
        });
    });

    it("Delete a user", () => {
        cy.api("DELETE", `${apiBaseUrl}/api/users/2`).should((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it("Register a user Successfully", () => {
        cy.api("POST", `${apiBaseUrl}/api/register`, {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            expect(response.body.token).to.not.empty;
        });
    });

    it("Negative - Register a user Unsuccessful", () => {
        // set test data 
        const method = "POST";
        const body = {
            "email": "sydney@fife"
        };
        const header = {}
        const url = `${apiBaseUrl}/api/register`;

        cy.api({ method, url, failOnStatusCode: false, header, body })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('error').to.eq('Missing password');
            });
    });

    it("DELETE API testing Using Cypress API Plugin", () => {
        cy.api("DELETE", `${apiBaseUrl}/api/users/2`).should((response) => {
            expect(response.status).to.eq(204);
        });
    });

    describe("API Test Suite 2", () => {
        it("get user Using Custom Commands", () => {
            cy.makeRequest("GET", `${apiBaseUrl}/api/users?page=2`)
                .should((response) => {
                    expect(response.status).to.eq(200);
                });
        });
        it("create user Using Custom Commands", () => {
            cy.makeRequest("POST", `${apiBaseUrl}/api/users`, {
                name: "Kranthi Panda",
                job: "RatnaAutomationLabs",
            }).should((response) => {
                expect(response.status).to.eq(201);
            });
        });
        it("update user Using Custom Commands", () => {
            cy.makeRequest("PUT", `${apiBaseUrl}/api/users/2`, {
                name: "RatnaAutomationLabs",
                job: "QA Automation Engg",
            }).should((response) => {
                expect(response.status).to.eq(200);
            });
        });
        it("login successfully Using Custom Commands", () => {
            cy.makeRequest("POST", `${apiBaseUrl}/api/login`, {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }).should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('token');
                expect(response.body.token).to.not.empty;
            });
        });
        it("Login user negative Using Custom Commands", () => {
            cy.makeRequest("POST", `${apiBaseUrl}/api/login`, {
                "email": "peter@klaven"
            }, false)
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body).to.have.property('error').to.eq('Missing password');
                });

        });

        it("Delay resposne Using Custom Commands", () => {
            cy.makeRequest("GET", `${apiBaseUrl}/api/users?delay=3`)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.duration).to.greaterThan(3000);
                });
        });
    });
});
