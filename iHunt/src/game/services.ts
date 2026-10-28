import { photos, type Player } from "./engine";
export interface HuntService {
  upload(uri: string): Promise<string>;
  review(player: Player): Promise<"accepted" | "rejected" | "unavailable">;
  authenticate(email: string, password: string): Promise<void>;
  join(code: string): Promise<void>;
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const demoService: HuntService = {
  async upload(uri) {
    await wait(650);
    if (uri === "fail")
      throw Error("Upload failed. Your photo is still selected. Try again.");
    return uri;
  },
  async review(p) {
    await wait(1200);
    return p.id === "1"
      ? "accepted"
      : p.id === "2"
        ? "rejected"
        : "unavailable";
  },
  async authenticate(email, password) {
    await wait(700);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw Error("Enter a valid email address.");
    if (password.length < 8)
      throw Error("Use at least 8 characters for your password.");
  },
  async join(code) {
    await wait(700);
    if (code === "FULL00")
      throw Error("This room is full. Ask your friend for another room.");
    if (code === "EXPIRE") throw Error("This room is no longer available.");
    if (code !== "JNGLE6")
      throw Error("Room not found. Try the demo code JNGLE6.");
  },
};
export const demoPhoto = photos[0];
