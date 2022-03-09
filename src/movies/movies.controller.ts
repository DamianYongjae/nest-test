import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";

@Controller("movies") // 'movies' is entry point of this controller. using like router
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(":id")
  patch(@Param("id") movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
