export function quoteBookTitle(title) {
  return title
    .split(' / ')
    .map((part) => {
      const cleaned = part.trim().replace(/^«|»$/g, '').replace(/«([^»]+)»/g, '„$1“');
      return `«${cleaned}»`;
    })
    .join(' / ');
}
