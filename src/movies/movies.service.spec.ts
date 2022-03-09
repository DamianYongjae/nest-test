import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import exp from "constants";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it(`should be 4`, () => {
    expect(2 + 2).toEqual(4);
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie With ID 999 Not Found");
      }
    });
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });

      const beforDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforDelete);
    });
    it("should throw a NotFoundException", () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });

      service.update(1, { title: "updated TEST" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated TEST");
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(9999, { title: "fail" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
