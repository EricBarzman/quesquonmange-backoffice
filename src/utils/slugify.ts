export default function slugify(text: string) {
  return text.toLowerCase().split(' ').join('-');
}