import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver';

export function getRandomPropmt(prompt: string): string {
  const randomIndex: number = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt: string = surpriseMePrompts[randomIndex];
  if(randomPrompt === prompt) return getRandomPropmt(prompt);
  return randomPrompt;
}

export async function downloadImage(_id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}