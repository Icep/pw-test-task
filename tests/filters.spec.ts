import { test, expect } from '@playwright/test'
import { readCsvFile } from '../helpers/csvHelper'
import { CookieModalFragment } from '../page-fragments/cookie-modal.fragment'
import { NavBarFragment } from '../page-fragments/navbar.fragment'
import { FiltersBarFragment } from '../page-fragments/filters-bar.fragment'

test.describe('Douglas product listing', () => {
    let cookieModal: CookieModalFragment
    let navbar: NavBarFragment
    let filtersBar: FiltersBarFragment
    let filtersTestData: any[] = []

    filtersTestData = readCsvFile('filters-data.csv')
    console.log(typeof(filtersTestData))

    for (const filterdata of filtersTestData) {
        test(`List products for criteria: ${filterdata.ID}`, async ({ page }) => {
            cookieModal = new CookieModalFragment(page)
            navbar = new NavBarFragment(page)
            filtersBar = new FiltersBarFragment(page)

            await page.goto('https://www.douglas.de/de')
            await cookieModal.allowAllCookies()

            await navbar.navigateToSection('PARFUM')

            await filtersBar.addFilters(
                filterdata.highlights,
                filterdata.marke,
                filterdata.produktart,
                filterdata.geschenkFur,
                filterdata.furWen
            )

            const products = await page.$$eval('.product-tile__main-link', (items) =>
                items.map((item) => ({
                    name: item.querySelector('.product-info__info-wrapper .name')?.textContent || '',
                    price: item.querySelector('.product-info .price')?.textContent || '',
                }))
            )

            console.log(products)
            expect(products.length).toBeGreaterThan(0)
        })
    }
})
