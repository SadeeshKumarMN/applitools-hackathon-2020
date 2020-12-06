class MainPage {
    /**
     * @param filterBy - Filter By Title (ex:brands, colors, type, price)
     * @param chooseOption - Choose Option (ex:under colors, there are options: Black, White, Blue, Green, Yellow)
     */
    filterByNameAndValue(filterBy, chooseOption) {
        return $(`//a[contains(.,"${filterBy}")]/following::label[contains(.,"${chooseOption}")]/span`)
    }
    get btnFilter() { return $('#filterBtn') }
    get sideBarFilters() { return $('#sidebar_filters') }
    get productGrid() { return $('#product_grid') }
    get filteredItems() { return $$('.grid_item') }
    get appliAirNightShoe() { return $('h3=Appli Air x Night') }
}

module.exports = new MainPage();
