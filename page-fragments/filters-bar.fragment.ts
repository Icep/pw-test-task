import { expect, Locator, Page } from '@playwright/test'

export class FiltersBarFragment {
    readonly page: Page
    readonly filtersContainer: Locator
    readonly filterMenu: Locator
    readonly filterTitle: Locator
    readonly filterSearchInput: Locator
    readonly filterItem: Locator
    readonly filterMenuCloseBtn: Locator
    readonly selectedFilter: Locator

    constructor(page: Page) {
        this.page = page
        this.filtersContainer = page.locator('.facet-list')
        this.filterMenu = page.locator('.facet__menu')
        this.filterTitle = page.locator('.facet')
        this.filterSearchInput = page.locator('.facet-search input')
        this.filterItem = page.locator('.facet-option')
        this.filterMenuCloseBtn = page.locator('.facet__close-button')
        this.selectedFilter = page.locator('.selected-facets__value')
    }

    public async addFilters(
        highlights: Array<string> | string,
        marke: Array<string> | string,
        produktart: Array<string> | string,
        geschenkfur: Array<string> | string,
        furWen: Array<string> | string
    ) {
        await this.addHighlightsFilter(highlights)
        await this.addBrandFilter(marke)
        await this.addProductTypeFilter(produktart)
        await this.addGiftForFilter(geschenkfur)
        await this.addForWhomFilter(furWen)
    }

    public async addHighlightsFilter(highlights: Array<string> | string) {
        if (highlights === null || highlights === undefined || highlights === '-') {
            return this
        } else {
            await this.filterTitle.filter({ hasText: 'Highlights' }).click()
            if (typeof highlights === 'string') {
                await this.filterItem.filter({ hasText: highlights }).click()
            } else {
                for (const filterName of highlights) {
                    await this.filterItem.filter({ hasText: filterName }).click()
                    await this.selectedFilter.filter({ hasText: filterName }).waitFor({ state: 'visible', timeout: 2000 })
                }
            }
        }
        await this.closeFilterMenu()
    }

    public async addBrandFilter(marke: Array<string> | string) {
        if (marke === null || marke === undefined || marke === '-') {
            return this
        } else {
            await this.filterTitle.filter({ hasText: 'Marke' }).click()
            if (typeof marke === 'string') {
                await this.filterItem.filter({ hasText: marke }).click()
            } else {
                for (const filterName of marke) {
                    await this.filterItem.filter({ hasText: filterName }).click()
                    await this.selectedFilter.filter({ hasText: filterName }).waitFor({ state: 'visible', timeout: 2000 })
                }
            }
        }
        await this.closeFilterMenu()
    }
    
    public async addProductTypeFilter(produktart: Array<string> | string) {
        if (produktart === null || produktart === undefined || produktart === '-') {
            return this
        } else {
            await this.filterTitle.filter({ hasText: 'Produktart' }).click()
            if (typeof produktart === 'string') {
                await this.filterItem.filter({ hasText: produktart }).click()
            } else {
                for (const filterName of produktart) {
                    await this.filterItem.filter({ hasText: filterName }).click()
                    await this.selectedFilter.filter({ hasText: filterName }).waitFor({ state: 'visible', timeout: 2000 })
                }
            }
        }
        await this.closeFilterMenu()
    }

    public async addGiftForFilter(geschenkfur: Array<string> | string) {
        if (geschenkfur === null || geschenkfur === undefined || geschenkfur === '-') {
            return this
        } else {
            await this.filterTitle.filter({ hasText: 'Geschenk für' }).click()
            if (typeof geschenkfur === 'string') {
                await this.filterItem.filter({ hasText: geschenkfur }).click()
            } else {
                for (const filterName of geschenkfur) {
                    await this.filterItem.filter({ hasText: filterName }).click()
                    await this.selectedFilter.filter({ hasText: filterName }).waitFor({ state: 'visible', timeout: 2000 })
                }
            }
        }
        await this.closeFilterMenu()
    }

    public async addForWhomFilter(furWen: Array<string> | string) {
        if (furWen === null || furWen === undefined || furWen === '-') {
            return this
        } else {
            await this.filterTitle.filter({ hasText: 'Für wen' }).click()
            if (typeof furWen === 'string') {
                await this.filterItem.filter({ hasText: furWen }).click()
            } else {
                for (const filterName of furWen) {
                    await this.filterItem.filter({ hasText: filterName }).click()
                    await this.selectedFilter.filter({ hasText: filterName }).waitFor({ state: 'visible', timeout: 2000 })
                }
            }
        }
        await this.closeFilterMenu()
    }

    public async closeFilterMenu() {
        await this.filterMenuCloseBtn.waitFor({ state: 'visible', timeout: 2000 })
        await this.filterMenuCloseBtn.click()
    }
}
