const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chai = require("chai");

const app = require("../../app").app;

chai.use(chaiHttp);
chai.should();

describe("Games API", () => {
  describe("GET /games", () => {
    it("should return all games", (done) =>
      chai
        .request(app)
        .get("/games")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.above(0);
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("genere");
          expect(res.body[0]).to.have.property("year");
          expect(res.body[0]).to.have.property("dev");
          expect(res.body[0].name).to.equal(
            "The Legend Of Zelda: Breath of the Wild"
          );
          expect(res.body[1].name).to.equal("Grand Theft Auto V");
          done();
        }));
  });
});
