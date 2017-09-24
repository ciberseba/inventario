import { InventarioPage } from './app.po';

describe('inventario App', () => {
  let page: InventarioPage;

  beforeEach(() => {
    page = new InventarioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
