const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chai = require("chai");

const app = require("../../app").app;

chai.use(chaiHttp);
chai.should();

describe("Devs API", () => {
  describe("GET /devs", () => {
    it("should return all devs", (done) =>
      chai
        .request(app)
        .get("/devs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.above(0);
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("country");
          expect(res.body[0]).to.have.property("foundation_year");
          expect(res.body[0]).to.have.property("yearly_income");
          //expect(res.body[0].name).to.equal("Epic Games");
          //expect(res.body[1].name).to.equal("Nintendo");
          done();
        }));
  });

  describe("GET /devs/:dev", () => {
    it("should return one dev", (done) =>
      chai
        .request(app)
        .get("/devs/Rockstar Games")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("country");
          expect(res.body).to.have.property("foundation_year");
          expect(res.body).to.have.property("yearly_income");
          expect(res.body).to.have.property("years_active");

          done();
        }));
  });

  describe("PUT /devs/:dev", () => {
    it("should update one dev", (done) =>
      chai
        .request(app)
        .put("/devs/Ubisoft")
        .send({
          name: "Ubisoft",
          country: "France",
          foundation_year: 1986,
          yearly_income: 100000000,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        }));

    it("should return 404 if dev not found", (done) =>
      chai
        .request(app)
        .put("/devs/NonExistentDev")
        .send({
          name: "NonExistentDev",
          country: "Unknown",
          foundation_year: 2023,
          yearly_income: 0,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        }));
  });

  describe("POST /devs", () => {
    it("should create a new dev", (done) => {
      chai
        .request(app)
        .post("/devs")
        .send({
          name: "Areyes",
          country: "Spain",
          foundation_year: 1999,
          yearly_income: 10,
        })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.body.should.be.an("object");

          done();
        });
    });

    it("should return 409 dev already exists", (done) => {
      chai
        .request(app)
        .post("/devs")
        .send({
          name: "Areyes",
          country: "Spain",
          foundation_year: 1999,
          yearly_income: 10,
        })
        .end((err, res) => {
          if (err) return done(err);

          res.should.have.status(409);
          res.body.should.be.an("object");

          done();
        });
    });
  });

  describe("DELETE /devs/:dev", () => {
    it("should delete one dev", (done) =>
      chai
        .request(app)
        .delete("/devs/Areyes")
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a("object");

          done();
        }));

    it("should return 404 dev not found", (done) =>
      chai
        .request(app)
        .delete("/devs/Aaaaaa")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");

          done();
        }));
  });
});
