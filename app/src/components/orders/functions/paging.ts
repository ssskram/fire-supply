/*
 * Logic for paging through collection of cards
 */

export function returnCurrentItems(cards: Array<any>, currentPage: number) {
  const indexOfLastItem = currentPage * 30;
  const indexOfFirstItem = indexOfLastItem - 30;
  const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem);
  return currentItems as Array<any>;
}

export function returnPageNumber(cards: Array<any>) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(cards.length / 30); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
