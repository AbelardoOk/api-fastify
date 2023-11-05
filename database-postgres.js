import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`select * from videos where tittle ilike ${"%" + search + "%"}`;
    } else {
      videos = await sql`select * from videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { tittle, description, duration } = video;

    await sql`insert into videos (id, tittle, description, duration) VALUES (${videoId}, ${tittle}, ${description}, ${duration} )`;
  }

  update(id, video) {}

  delete(id) {}
}
