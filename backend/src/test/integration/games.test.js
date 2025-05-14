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
          expect(res.body[0]).to.have.property("genre");
          expect(res.body[0]).to.have.property("year");
          expect(res.body[0]).to.have.property("dev");
          expect(res.body[0].name).to.equal("Fortnite");
          expect(res.body[1].name).to.equal(
            "The Legend of Zelda: Breath of the Wild"
          );
          done();
        }));
  });

  describe("GET /games/:game", () => {
    it("should return one game", (done) =>
      chai
        .request(app)
        .get("/games/The Legend of Zelda: Breath of the Wild")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("genre");
          expect(res.body).to.have.property("year");
          expect(res.body).to.have.property("dev");

          done();
        }));
  });

  describe("POST /games", () => {
    it("should register a new game", (done) =>
      chai
        .request(app)
        .post("/games")
        .send({
          name: "Counter-Strike",
          genre: "Shooter",
          year: 1999,
          dev: "Valve Corporation",
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          expect(res.body).to.have.property("status");
          expect(res.body.status).to.equal("created");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("genre");
          expect(res.body).to.have.property("year");
          expect(res.body).to.have.property("dev");
          done();
        }));
  });

  describe("POST /games", () => {
    it("should return 409 game already registered", (done) =>
      chai
        .request(app)
        .post("/games")
        .send({
          name: "Counter-Strike",
          genre: "Shooter",
          year: 1999,
          dev: "Valve Corporation",
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          expect(res.body).to.have.property("status");
          done();
        }));
  });

  describe("POST /games", () => {
    it("should return 404 developer not found", (done) =>
      chai
        .request(app)
        .post("/games")
        .send({
          name: "Counter-Strike 2",
          genre: "Shooter",
          year: 1999,
          dev: "Volvo",
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          expect(res.body).to.have.property("status");
          done();
        }));
  });

  describe("PUT /games/:game", () => {
    it("should update one game", (done) =>
      chai
        .request(app)
        .put("/games/The Legend of Zelda: Breath of the Wild")
        .send({
          name: "The Legend of Zelda: Breath of the Wild",
          genre: "Action-adventure",
          year: 2017,
          dev: "Nintendo",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        }));
  });

  describe("PUT /games/:game", () => {
    it("should return 404 game not found", (done) =>
      chai
        .request(app)
        .put("/games/Meow Meow")
        .send({
          name: "Meow Meow",
          genre: "Action-adventure",
          year: 2023,
          dev: "Unknown",
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        }));
  });

  describe("DELETE /games/:game", () => {
    it("should delete one game", (done) =>
      chai
        .request(app)
        .delete("/games/Counter-Strike")
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a("object");
          done();
        }));
  });

  describe("DELETE /games/:game", () => {
    it("should return 404 game not found", (done) =>
      chai
        .request(app)
        .delete("/games/Counter-Strike")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        }));
  });
});
