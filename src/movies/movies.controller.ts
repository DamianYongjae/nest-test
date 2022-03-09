import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller("movies") // 'movies' is entry point of this controller. using like router
export class MoviesController {
  @Get()
  getAll() {
    return "This will return all movies";
  }

  @Get("/:id")
  getOne(@Param("id") movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create() {
    return "This will create a movie";
  }

  @Delete("/:id")
  remove(@Param("id") movieId: string) {
    return `This will delete movie with the id: ${movieId}`;
  }

  @Patch("/:id")
  patch(@Param("id") movieId: string) {
    return `This will update movie with the id: ${movieId}`;
  }
}
