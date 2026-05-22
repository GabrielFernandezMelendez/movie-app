import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieDetail } from './interfaces/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);

  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDJkODVlOTgyMzMxNDFkNGFmNGEyNWVkNjJjNDMxZiIsIm5iZiI6MTc3OTQzNDc3NS40MzI5OTk4LCJzdWIiOiI2YTEwMDUxNzEyN2QxYmJkMjJhMzA5NTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KKtE1YVh6vVEW8D8gMxKjx9zWbR3PWW1TBngoJdFokc';

  private headers = {
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  };

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(
      `${this.baseUrl}/movie/popular?language=es-ES&page=1`,
      { headers: this.headers }
    );
  }

  getMovieById(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.baseUrl}/movie/${id}?language=es-ES`,
      { headers: this.headers }
    );
  }

  getPosterUrl(path: string): string {
    return path
      ? `${this.imageBaseUrl}${path}`
      : 'https://via.placeholder.com/500x750?text=Sin+Poster';
  }
}