export const markdownHeaders = { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" };

export function markdown404(path: string) {
  return new Response(
    `# Page not found\n\nThere is no page at \`${path}\` on designwithaditi.in.\n\n- Site overview and every case study: https://designwithaditi.in/llms.txt\n- All pages: https://designwithaditi.in/sitemap.xml\n- Home: https://designwithaditi.in/\n`,
    { status: 404, headers: markdownHeaders },
  );
}
