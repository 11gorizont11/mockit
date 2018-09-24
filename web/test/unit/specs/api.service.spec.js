import ApiService from "../../../src/services/api"



describe('Api service spec', () => {
  const api = new ApiService();
  const testUser = {
    login: "Test User",
    email: "testuser@mailinator.com",
    password: 'testpass'
  }


  it('Should sign-up user', (done) => {
    api.signUp(testUser).then(res => {
      console.log("data", res)
      done()
    })
  });

  // it("Should login user", (done) => {
  //   api.login({
  //     login: testUser.login,
  //     password: testUser.password
  //   }).then(res => {

  //     done();
  //   })
  // })
});