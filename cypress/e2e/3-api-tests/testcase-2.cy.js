describe("GET /v2/user", function () {
  it("TC", function () {
    // Test Cases
    const userName = 'testqauser21'
    const qsParams = {
      param1: 'test1',
      param2: 'test2'
    }
    cy.request('GET', `https://petstore.swagger.io/v2/user/` + userName, {
      query: qsParams
    })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  });
  it("POST /v2/user/{userName}", function () {
    // Test Cases
    const postData = {
      "id": 78799781,
      "username": "testqauser21",
      "firstName": "test",
      "lastName": "qa",
      "email": "testqa@test.com",
      "password": "test123",
      "phone": "54545454545",
      "userStatus": 1
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    }

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      body: postData,
      headers: headers
    })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  });
});