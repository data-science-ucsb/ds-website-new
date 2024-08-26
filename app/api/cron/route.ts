import alumniData from "@/app/data/alumni";
import boardMembers from "@/app/data/board";
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export const config = {
  runtime: 'edge',
};

async function getRole(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Do something with the scraped data, e.g., store it in a database

  return new Response(`Scraped title:`);
}

export default async function handler(req: Request) {
  alumniData.map(async (alumni) => getRole(alumni.linkedIn));
  boardMembers.map(async (board) => getRole(board.linkedIn));
}