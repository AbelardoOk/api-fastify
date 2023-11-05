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

  async update(id, video) {
    const { tittle, description, duration } = video;

    await sql`update videos set tittle = ${tittle}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
