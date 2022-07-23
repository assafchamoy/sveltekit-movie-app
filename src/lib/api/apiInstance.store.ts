import { readable } from "svelte/store";
import MoviesApi from "./MoviesApi";

export const API = readable(new MoviesApi());